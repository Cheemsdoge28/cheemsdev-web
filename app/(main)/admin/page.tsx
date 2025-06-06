import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/");
  }

  // You can add additional role-based checks here
  // For example, checking if user has admin role in their metadata
  // const isAdmin = user?.privateMetadata?.role === "admin";
  // if (!isAdmin) {
  //   redirect("/dashboard");
  // }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
              Admin Access
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p className="text-muted-foreground mb-4">
              Manage user accounts, permissions, and access levels.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Users:</span>
                <span className="text-sm font-medium">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Sessions:</span>
                <span className="text-sm font-medium">1</span>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">API Key Management</h2>
            <p className="text-muted-foreground mb-4">
              Monitor and manage API keys across the platform.
            </p>
            <div className="space-y-2">
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors">
                View All API Keys
              </button>
              <button className="w-full border border-input px-4 py-2 rounded-md text-sm hover:bg-accent transition-colors">
                Generate New Key
              </button>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">System Health</h2>
            <p className="text-muted-foreground mb-4">
              Monitor system performance and health metrics.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Database: Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Authentication: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">API Services: Running</span>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Content Management</h2>
            <p className="text-muted-foreground mb-4">
              Manage Sanity CMS content and publishing workflow.
            </p>
            <div className="space-y-2">
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors">
                Open Sanity Studio
              </button>
              <button className="w-full border border-input px-4 py-2 rounded-md text-sm hover:bg-accent transition-colors">
                Content Analytics
              </button>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Security Logs</h2>
            <p className="text-muted-foreground mb-4">
              Review authentication and API access logs.
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Last login:</span>
                <span>Just now</span>
              </div>
              <div className="flex justify-between">
                <span>Failed attempts:</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>API calls today:</span>
                <span>0</span>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <p className="text-muted-foreground mb-4">
              Common administrative tasks and shortcuts.
            </p>
            <div className="space-y-2">
              <button className="w-full border border-input px-4 py-2 rounded-md text-sm hover:bg-accent transition-colors">
                Export User Data
              </button>
              <button className="w-full border border-input px-4 py-2 rounded-md text-sm hover:bg-accent transition-colors">
                System Backup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
