import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";

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
        <div className="hidden xl:flex gap-7 items-center justify-between">
          <DesktopNav navItems={navItems} />
        </div>
        <div className="flex items-center xl:hidden">
          <MobileNav navItems={navItems} />
        </div>
      </div>
      <Separator/>
    </header>
  );
}
