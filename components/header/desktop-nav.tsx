'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { NavItem } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function DesktopNav({
  navItems,
}: {
  readonly navItems: readonly NavItem[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isServicesActive = pathname.startsWith('/services');

  useEffect(() => {
    navItems.forEach((navItem) => {
      if (navItem.isServicesDropdown && navItem.services) {
        navItem.services.forEach((service) => {
          router.prefetch(service.href);
        });
      }
    });
  }, [navItems, router]);

  return (
    <div className="hidden xl:flex items-center gap-7 text-primary">
      {navItems.map((navItem) =>
        navItem.isServicesDropdown && navItem.services ? (
          <DropdownMenu key={navItem.label} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="vanilla"
                className={`transition-colors p-0 text-base text-primary bg-none hover:text-primary/50 focus-visible:ring-primary ${(isServicesActive || isDropdownOpen) ? 'font-semibold underline text-primary/60' : 'text-primary/90'}`}
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen}
              >
                <span>{navItem.label}</span>
                <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background text-primary p-2 rounded-lg shadow-lg w-max border border-border">
              {[
                ...navItem.services.filter(s => s.href === 'services-finance'),
                ...navItem.services.filter(s => s.href !== 'services-finance').sort((a, b) => a.title.localeCompare(b.title))
              ].map((service) => (
                <DropdownMenuItem
                  key={service.href}
                  onSelect={() => {
                    setIsDropdownOpen(false);
                    router.push(service.href);
                  }}
                  className="flex justify-center items-center px-4 py-2 rounded-md cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-primary/10 hover:text-primary w-full text-center text-sm"
                  role="menuitem"
                  tabIndex={0}
                  aria-label={service.title}
                >
                  {service.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            key={navItem.label}
            href={navItem.href}
            prefetch={true}
            target={navItem.target ? "_blank" : undefined}
            rel={navItem.target ? "noopener noreferrer" : undefined}
            className={`transition-colors hover:text-primary/50 text-base ${pathname === navItem.href ? 'text-primary font-semibold underline' : 'text-primary/90'}`}
          >
            {navItem.label}
          </Link>
        )
      )}
      <Link
        href="/contact-us"
        className="ml-4 px-5 py-2 font-semibold text-base bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:ring-2 focus-visible:ring-primary rounded-md transition-colors focus-visible:outline-none"
        aria-label="Contact Us"
        prefetch={true}
      >
        Contact Us
      </Link>
    </div>
  );
}
