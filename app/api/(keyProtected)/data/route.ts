import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const keyLabel = req.headers.get('x-authenticated-key-label');
  const keyCreated = req.headers.get('x-authenticated-key-created');

  // Simulate some sensitive data that requires authentication
  const sensitiveData = {
    analytics: {
      totalUsers: 1542,
      activeUsers: 892,
      revenue: '$45,231.50',
      conversionRate: '3.2%',
    },
    systemInfo: {
      serverLoad: '23%',
      memoryUsage: '1.2GB',
      diskSpace: '45% available',
      uptime: '7 days, 14 hours',
    },
    apiUsage: {
      requestsToday: 2847,
      requestsThisMonth: 89234,
      rateLimitRemaining: 9876,
    }
  };

  return NextResponse.json({
    message: 'Sensitive data accessed successfully',
    data: sensitiveData,
    accessInfo: {
      accessedBy: keyLabel,
      keyCreated,
      accessTime: new Date().toISOString(),
      warning: 'This data is confidential and protected by API key authentication',
    }
  });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const keyLabel = req.headers.get('x-authenticated-key-label');

  return NextResponse.json({
    message: 'Data updated successfully',
    updatedFields: Object.keys(body),
    updatedBy: keyLabel,
    timestamp: new Date().toISOString(),
  });
}
