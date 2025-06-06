import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'crypto';
import { prisma } from '@/lib/prisma';

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET ?? '';

// Helper to hash the API key (must match generation logic)
function hashApiKey(key: string, salt: string): string {
  return createHash('sha256').update(ENCRYPTION_SECRET + salt + key).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey } = body;
    
    if (!apiKey || typeof apiKey !== 'string') {
      return NextResponse.json({ 
        error: 'Missing or invalid apiKey',
        hint: 'Provide a valid API key string in the request body' 
      }, { status: 400 });
    }

    if (apiKey.length < 16) {
      return NextResponse.json({ 
        error: 'Invalid API key format',
        hint: 'API key must be at least 16 characters long' 
      }, { status: 400 });
    }

    // Use lookupHash optimization - extract first 16 characters for O(1) lookup
    const lookupHash = apiKey.substring(0, 16);
    
    // Find the API key using lookupHash for fast lookup
    const storedKey = await prisma.apiKey.findFirst({
      where: {
        lookupHash: lookupHash,
        isActive: true,
      },
    });

    if (!storedKey) {
      return NextResponse.json({ 
        valid: false,
        error: 'Invalid API key' 
      }, { status: 401 });
    }

    // Verify the full key hash using timing-safe comparison
    const computedHash = hashApiKey(apiKey, storedKey.salt);
    const storedHashBuffer = Buffer.from(storedKey.keyHash, 'hex');
    const computedHashBuffer = Buffer.from(computedHash, 'hex');

    // Use timing-safe comparison to prevent timing attacks
    if (storedHashBuffer.length !== computedHashBuffer.length || 
        !timingSafeEqual(storedHashBuffer, computedHashBuffer)) {
      return NextResponse.json({ 
        valid: false,
        error: 'Invalid API key' 
      }, { status: 401 });
    }

    // Update the last used timestamp asynchronously
    prisma.apiKey.update({
      where: { id: storedKey.id },
      data: { lastUsed: new Date() },
    }).catch(error => console.error('Failed to update lastUsed:', error));

    return NextResponse.json({ 
      valid: true, 
      label: storedKey.label, 
      createdAt: storedKey.createdAt.toISOString(),
      lastUsed: storedKey.lastUsed?.toISOString() ?? null 
    });

  } catch (error) {
    console.error('Error validating API key:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      hint: 'Check server logs for details. Endpoint: /api/keys/validate-api-key' 
    }, { status: 500 });
  }
}
