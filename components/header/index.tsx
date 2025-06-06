import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { fetchServicesPages } from "@/app/(main)/actions";
import { HEADER_NAME } from "@/lib/constants";
import { Separator } from "../ui/seperator";

export default async function Header() {
  const servicesData = await fetchServicesPages();
  const services = servicesData.map((service) => ({
    title: service.title,
    href: service.slug,
  }));

  const navItems = [
    {
      label: "Home",
      href: "/",
      target: false,
    },
    {
      label: "Services",
      href: "/services",
      target: false,
      isServicesDropdown: true,
      services, 
    },
    {
      label: "Blog",
      href: "/blog",
      target: false,
    },
    {
      label: "About",
      href: "/about",
      target: false,
    },
  ];

  return (
    <header className="sticky top-0 w-full border-border/40 bg-background/95 z-50">
  <div className="flex items-center justify-between py-3 px-4 md:px-16 lg:px-24">
    {/* Logo */}
    <Link
      href="/"
      aria-label="Home page"
      className="flex items-center gap-2"
    >
      <Logo />
      <p className="font-bold font-mono tracking-widest md:text-5xl text-primary sm:text-4xl text-2xl hidden [@media(min-width:280px)]:block">
        {HEADER_NAME}
      </p>
    </Link>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-4">
      {/* Desktop Nav: lg and up ONLY */}
      <div className="hidden lg:flex">
        <DesktopNav navItems={navItems} />
      </div>

      {/* Auth Buttons */}
      <div className="hidden [@media(min-width:440px)]:flex items-center gap-2">        <SignedOut>
          {/* Sign In: always shown */}
          <SignInButton mode="redirect" fallbackRedirectUrl="/" forceRedirectUrl="/">
            <button className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 border border-border rounded-full">
              Sign In
            </button>
          </SignInButton>

          {/* Sign Up: md and up */}
          <div className="hidden md:block">
            <SignUpButton mode="redirect" fallbackRedirectUrl="/" forceRedirectUrl="/">
              <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut><SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 border border-border",
                userButtonPopoverCard: "bg-popover border border-border rounded-2xl shadow-lg",
                userButtonPopoverActionButton: "text-foreground hover:bg-accent font-sans",
              },
            }}
          />
        </SignedIn>
      </div>

      {/* Mobile Nav: < lg only */}
      <div className="flex xl:hidden">
        <MobileNav navItems={navItems} />
      </div>
    </div>
  </div>

  <Separator />
</header>

  );
}
