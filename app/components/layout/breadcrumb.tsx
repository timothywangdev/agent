"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => ({
      title: segment.split("-").map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(" "),
      href: `/${segment}`,
    }));

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      <Link
        href="/"
        className="hover:text-foreground transition-colors"
      >
        Home
      </Link>
      {segments.map((segment, index) => (
        <div key={segment.href} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            href={segment.href}
            className={`hover:text-foreground transition-colors ${
              index === segments.length - 1 ? "text-foreground font-medium" : ""
            }`}
          >
            {segment.title}
          </Link>
        </div>
      ))}
    </nav>
  );
} 