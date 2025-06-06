import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { prisma } from '@/lib/prisma';

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET ?? '';

function hashApiKey(key: string, salt: string): string {
  return createHash('sha256').update(ENCRYPTION_SECRET + salt + key).digest('hex');
}

/**
 * Middleware that automatically protects all routes in the (keyProtected) group
 * This runs before any route handler in this group
 */
export async function middleware(req: NextRequest) {
  try {
    // Check for API key in headers
    const apiKey = req.headers.get('x-api-key') ?? req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'API key required. Provide key in x-api-key header or Authorization header.',
          hint: 'This endpoint requires API key authentication.'
        },
        { status: 401 }
      );
    }

    // Optimized approach: Use lookup hash for fast filtering, then verify with full hash
    const lookupHash = apiKey.substring(0, 16); // First 16 chars for fast lookup
    
    // Find potential matches using the lookup hash (much faster)
    const candidateKeys = await prisma.apiKey.findMany({
      where: { 
        isActive: true,
        lookupHash: lookupHash 
      },
      select: { id: true, keyHash: true, salt: true, label: true, createdAt: true }
    });

    let matchedKey = null;
    
    // Verify the full hash for security (should only be 1-2 candidates max)
    for (const key of candidateKeys) {
      const computedHash = hashApiKey(apiKey, key.salt);
      // Use timing-safe comparison to prevent timing attacks
      const keyHashBuffer = Buffer.from(key.keyHash, 'hex');
      const computedHashBuffer = Buffer.from(computedHash, 'hex');
      
      if (keyHashBuffer.length === computedHashBuffer.length) {
        const crypto = await import('crypto');
        if (crypto.timingSafeEqual(keyHashBuffer, computedHashBuffer)) {
          matchedKey = key;
          break;
        }
      }
    }

    if (!matchedKey) {
      return NextResponse.json(
        { 
          error: 'Invalid API key',
          hint: 'The provided API key is not valid or has been deactivated.'
        },
        { status: 401 }
      );
    }

    // Update last used timestamp (fire and forget)
    prisma.apiKey.update({
      where: { id: matchedKey.id },
      data: { lastUsed: new Date() },
    }).catch(error => console.error('Failed to update lastUsed:', error));

    // Add API key info to headers for route handlers to use
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-authenticated-key-id', matchedKey.id);
    requestHeaders.set('x-authenticated-key-label', matchedKey.label);
    requestHeaders.set('x-authenticated-key-created', matchedKey.createdAt.toISOString());

    // Continue to the route handler
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('API key validation error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        hint: 'An error occurred while validating the API key.'
      },
      { status: 500 }
    );
  }
}

// Configure which routes this middleware applies to
export const config = {
  matcher: '/api/(keyProtected)/:path*',
};
