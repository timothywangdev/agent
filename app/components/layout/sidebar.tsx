"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Database,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

const navItems: NavItem[] = [
  {
    title: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Data Providers",
    href: "/data-providers",
    icon: Database,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen border-r border-border bg-background",
        isCollapsed ? "w-16" : "w-64",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <div className="flex flex-col flex-1 p-4 space-y-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-4 h-8 w-8 rounded-full border bg-background"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        <nav className="flex flex-col flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href || "#"}
              className={cn(
                "flex items-center px-2 py-2 rounded-lg hover:bg-accent",
                pathname === item.href && "bg-accent",
                "group"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 text-muted-foreground",
                  pathname === item.href && "text-foreground"
                )}
              />
              {!isCollapsed && (
                <span
                  className={cn(
                    "ml-3 text-sm font-medium text-muted-foreground",
                    pathname === item.href && "text-foreground"
                  )}
                >
                  {item.title}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          className={cn(
            "flex items-center justify-start px-2 py-2",
            !isCollapsed && "w-full"
          )}
          onClick={() => {
            // Handle logout
            console.log("Logout clicked");
          }}
        >
          <LogOut className="h-5 w-5 text-muted-foreground" />
          {!isCollapsed && (
            <span className="ml-3 text-sm font-medium text-muted-foreground">
              Logout
            </span>
          )}
        </Button>
      </div>
    </div>
  );
} 