import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/seperator";
import { prisma } from "@/lib/prisma";
import { ApiKeyGenerator } from "@/components/inputs/ApiKeyGenerator";

async function getUserApiKeys(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        apiKeys: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
    return user?.apiKeys || [];
  } catch (error) {
    console.error("Failed to fetch API keys:", error);
    return [];
  }
}

async function UserStats({ clerkId }: Readonly<{ clerkId: string }>) {
  const apiKeys = await getUserApiKeys(clerkId);
  const activeKeys = apiKeys.filter(key => key.isActive);
  const totalRequests = apiKeys.reduce((acc, key) => acc + (key.lastUsed ? 1 : 0), 0);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{apiKeys.length}</div>
          <p className="text-xs text-muted-foreground">
            {activeKeys.length} active
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">API Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRequests}</div>
          <p className="text-xs text-muted-foreground">
            Total requests made
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Active</div>
          <p className="text-xs text-muted-foreground">
            All systems operational
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

async function ApiKeysList({ clerkId }: Readonly<{ clerkId: string }>) {
  const apiKeys = await getUserApiKeys(clerkId);

  if (apiKeys.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage your API keys for accessing our services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              You don't have any API keys yet. Create your first API key to get started.
            </p>
            <ApiKeyGenerator />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage your API keys for accessing our services
          </CardDescription>
        </div>
        <ApiKeyGenerator />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {apiKeys.map((key) => (
            <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{key.label}</h4>
                  <Badge variant={key.isActive ? "default" : "secondary"}>
                    {key.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Created {new Date(key.createdAt).toLocaleDateString()}
                </p>
                {key.lastUsed && (
                  <p className="text-xs text-muted-foreground">
                    Last used {new Date(key.lastUsed).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="destructive" size="sm">
                  Revoke
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <Card key={`stat-skeleton-${index}`}>
            <CardHeader>
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={`api-key-skeleton-${index}`} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.firstName ?? user.emailAddresses[0]?.emailAddress}
        </p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <div className="space-y-6">
          <UserStats clerkId={userId} />
          <Separator />
          <ApiKeysList clerkId={userId} />
        </div>
      </Suspense>
    </div>
  );
}