import Link from "next/link";
import Logo from "@/components/logo";
import { STORE_NAME } from "@/lib/constants";
import { fetchServicesPages } from "@/app/(main)/actions";
import { Separator } from "./ui/seperator";
const navItems = [
  {
    label: "Home",
    href: "/",
    target: false,
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

// // TODO: Replace with dynamic services data from server or props
// const services: { title: string; href: string }[] = [
//   { title: 'Financial Services', href: '/services/financial-services' },
//   { title: 'Banking Solutions', href: '/services/banking-solutions' },
//   { title: 'Investment Planning', href: '/services/investment-planning' },
//   { title: 'Wealth Management', href: '/services/wealth-management' },
// ];

export default async function Footer() {
  const servicesData = await fetchServicesPages();
    const services = servicesData.map((service) => ({
      title: service.title,
      href: service.slug,
    }));
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="border-t border-border/10">
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center">
          <Link className="font-semibold text-primary" href="/" aria-label="Home page">
            {STORE_NAME} Private Limited
          </Link>
          
          <div className="mt-6 mb-8">
            {/* Main navigation - stacks on mobile, horizontal on larger screens */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6">
              {navItems.map((navItem) => (
                <Link
                  key={navItem.label}
                  href={navItem.href}
                  target={navItem.target ? "_blank" : undefined}
                  rel={navItem.target ? "noopener noreferrer" : undefined}
                  className="transition-colors hover:text-primary text-foreground/80 text-sm"
                >
                  {navItem.label}
                </Link>
              ))}
              
              {/* Contact us link with slightly different styling */}
              <Link
                href="/contact-us"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Contact Us
              </Link>
            </div>
            
            {/* Services section - separate section with heading */}
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-foreground/80 mb-3">Services</span>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-8">
                {services.map((service: { title: string; href: string }) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="transition-colors hover:text-primary text-foreground/70 text-sm"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-xs text-foreground/50 text-center">
            <p>&copy; {getCurrentYear()} {STORE_NAME} Private Limited. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
