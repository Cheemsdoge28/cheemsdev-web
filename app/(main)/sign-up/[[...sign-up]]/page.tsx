"use client";

import { SignUp } from "@clerk/nextjs";
import { clerkTheme } from "@/lib/clerk-theme";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <SignUp 
          appearance={clerkTheme}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/"
          forceRedirectUrl="/"
        />
      </div>
    </div>
  );
}
