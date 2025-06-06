import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Get authenticated key info from headers (set by middleware)
  const keyId = req.headers.get('x-authenticated-key-id');
  const keyLabel = req.headers.get('x-authenticated-key-label');
  const keyCreated = req.headers.get('x-authenticated-key-created');

  return NextResponse.json({
    message: 'Welcome to the protected users endpoint!',
    data: {
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
      ]
    },
    requestInfo: {
      authenticatedWith: {
        keyId,
        keyLabel,
        keyCreated,
      },
      timestamp: new Date().toISOString(),
    }
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const keyLabel = req.headers.get('x-authenticated-key-label');

  return NextResponse.json({
    message: 'User created successfully',
    user: {
      id: Math.floor(Math.random() * 1000),
      ...body,
      createdAt: new Date().toISOString(),
      createdBy: keyLabel,
    }
  }, { status: 201 });
}
