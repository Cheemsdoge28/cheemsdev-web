"use client";

import { SignIn } from "@clerk/nextjs";
import { clerkTheme } from "@/lib/clerk-theme";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <SignIn 
          appearance={clerkTheme}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/"
          forceRedirectUrl="/"
        />
      </div>
    </div>
  );
}
