import { NextRequest, NextResponse } from 'next/server';
import { randomBytes, createHash } from 'crypto';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET ?? '';

function hashApiKey(key: string, salt: string): string {
  return createHash('sha256').update(ENCRYPTION_SECRET + salt + key).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { label } = await req.json();
    if (!label || typeof label !== 'string') {
      return NextResponse.json({ error: 'Missing label' }, { status: 400 });
    }

    // Generate API key components
    const key = randomBytes(32).toString('hex');
    const salt = randomBytes(16).toString('hex');
    const keyHash = hashApiKey(key, salt);
    const lookupHash = key.substring(0, 16); // First 16 chars for fast lookup

    // Find or create user in database
    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      // Create user if doesn't exist (fallback)
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: '', // Will be updated by webhook
          name: '', // Will be updated by webhook
        }
      });
    }

    // Create the API key in the database
    const apiKey = await prisma.apiKey.create({
      data: {
        label,
        keyHash,
        salt,
        lookupHash,
        userId: user.id,
      },
    });

    return NextResponse.json({ 
      apiKey: key, 
      id: apiKey.id, 
      label: apiKey.label, 
      createdAt: apiKey.createdAt.toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
  }
}
