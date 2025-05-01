"use client";

import { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";

interface ClientRevealProps {
  children: ReactNode;
  index: number;
}

export default function ClientReveal({ children, index }: ClientRevealProps) {
  const [isVisible, setIsVisible] = useState(index === 0); // First item visible by default
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up intersection observer for progressive loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once visible, no need to observe anymore
            if (ref.current) observer.unobserve(ref.current);
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    // Start observing
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // Calculate delay based on index, but cap it
  const delay = Math.min(index * 0.1, 0.5); // Cap delay at 0.5s

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{
        transitionDelay: `${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
