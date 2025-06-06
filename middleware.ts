import { NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define which routes require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/admin(.*)'
]);

// Define which routes require API key protection
const isApiKeyProtectedRoute = createRouteMatcher([
  '/api/users(.*)',
  '/api/data(.*)'
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Handle API key protected routes first
  if (isApiKeyProtectedRoute(req)) {
    return await handleApiKeyProtection(req);
  }

  // Handle Clerk authentication for protected routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

// Your existing API key protection logic
async function handleApiKeyProtection(req: NextRequest) {
  // Check for API key in headers
  const apiKey = req.headers.get('x-api-key') ?? req.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!apiKey) {
    return NextResponse.json(
      { 
        error: 'API key required. Provide key in x-api-key header or Authorization header.',
        hint: 'This endpoint requires API key authentication.',
        endpoint: req.nextUrl.pathname,
      },
      { status: 401 }
    );
  }

  // Validate the API key by calling our validation endpoint
  try {
    const validationResponse = await fetch(`${req.nextUrl.origin}/api/validate-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey }),
    });

    if (!validationResponse.ok) {
      return NextResponse.json(
        { 
          error: 'Invalid API key',
          hint: 'The provided API key is not valid or has been deactivated.',
          endpoint: req.nextUrl.pathname,
        },
        { status: 401 }
      );
    }

    const validationResult = await validationResponse.json();
    
    // Add API key info to headers for route handlers to use
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-authenticated-key-label', validationResult.label);
    requestHeaders.set('x-authenticated-key-created', validationResult.createdAt);

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
        hint: 'An error occurred while validating the API key.',
        endpoint: req.nextUrl.pathname,
      },
      { status: 500 }
    );
  }
}

// Configure which routes this middleware applies to
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
