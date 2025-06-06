"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types";
import { useState } from "react";
import { TextAlignRightIcon } from "@radix-ui/react-icons";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MobileNav({ navItems }: { readonly navItems: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-[1.75rem] p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <TextAlignRightIcon className="text-primary" />
        </Button>
      </SheetTrigger>
      <SheetContent>
      <SheetHeader>
        <SheetTitle>Navigation</SheetTitle>
      </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="container">
            <ul className="list-none text-right space-y-3">
              {navItems.map((navItem) => {
                // accordion item for services dropdown
                if (navItem.isServicesDropdown && navItem.services) {
                  return (
                    <li key={navItem.label}>
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full border-none"
                      >
                        <AccordionItem value="services" className="border-none">
                          <AccordionTrigger className="flex-row-reverse justify-start font-normal text-lg text-right flex items-center hover:no-underline hover:opacity-50 py-0 gap-2">
                            {navItem.label}
                          </AccordionTrigger>

                          <AccordionContent>
                            <div className="flex flex-col items-end space-y-2 pt-2">
                              {[
                                ...navItem.services.filter(s => s.href === 'services-finance'),
                                ...navItem.services.filter(s => s.href !== 'services-finance').sort((a, b) => a.title.localeCompare(b.title))
                              ].map((service) => (
                                <Link
                                  key={service.href}
                                  href={service.href}
                                  onClick={() => setOpen(false)}
                                  className={`text-sm hover:text-opacity-80 text-right w-full ${pathname === service.href ? 'text-primary font-semibold underline' : ''}`}
                                >
                                  {service.title}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </li>
                  );
                }

                return (
                  <li key={navItem.label}>
                    <Link
                    prefetch={true}
                      onClick={() => setOpen(false)}
                      href={navItem.href}
                      target={navItem.target ? "_blank" : undefined}
                      rel={navItem.target ? "noopener noreferrer" : undefined}
                      className={`hover:text-decoration-none hover:opacity-50 text-lg text-right ${pathname === navItem.href ? 'text-primary font-semibold underline' : ''}`}
                    >
                      {navItem.label}
                    </Link>
                  </li>
                );
              })}            </ul>
            
            
            <div className="flex justify-end pt-6">
              <Button
                asChild
                variant="default"
                className="px-5 py-2 font-semibold text-base bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Contact Us"
                onClick={() => setOpen(false)}
              >
                <Link href="/contact-us" prefetch={true}>
                  Contact Us
                </Link>
              </Button>
            </div>
            {/* Authentication section - only show for screens below 440px */}
            <div className="[@media(min-width:440px)]:hidden pt-6">              <SignedOut>
                <div className="flex flex-row justify-end items-end space-x-3">
                  <SignInButton mode="redirect" fallbackRedirectUrl="/" forceRedirectUrl="/">
                    <button 
                      className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors border border-border rounded-[2rem]"
                      onClick={() => setOpen(false)}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="redirect" fallbackRedirectUrl="/" forceRedirectUrl="/">
                    <button 
                      className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center justify-end">                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "h-8 w-8 border border-border",
                        userButtonPopoverCard: "bg-popover border border-border rounded-2xl shadow-lg",
                        userButtonPopoverActionButton: "text-foreground hover:bg-accent font-sans",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
