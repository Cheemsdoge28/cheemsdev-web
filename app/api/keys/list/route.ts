import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all active API keys (without the hash and salt for security)
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        label: true,
        createdAt: true,
        lastUsed: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ apiKeys }, { status: 200 });
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 });
  }
}
