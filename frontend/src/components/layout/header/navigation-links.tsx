import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import navItems from "../navItems";

// Define the type for a navigation item
interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  children?: NavItem[];
}

export function NavigationLinks() {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const typedNavItems: NavItem[] = navItems;

  return (
    <nav className="hidden md:flex md:items-center md:gap-5 md:text-sm md:font-medium md:ms-6 overflow-x-auto">
      {typedNavItems.map((item) => {
        if (item.children) {
          return (
            <DropdownMenu key={item.name}>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-1 transition-colors hover:text-primary whitespace-nowrap outline-none",
                  isActive(item.href)
                    ? "text-primary font-semibold"
                    : "text-foreground/60"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
                <ChevronDown className="h-3 w-3 ms-0.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {item.children.map((child) => (
                  <DropdownMenuItem key={child.name} asChild>
                    <Link
                      to={child.href}
                      className={cn(
                        "flex items-center gap-2 w-full cursor-pointer",
                        isActive(child.href) && "text-primary font-medium bg-primary/10"
                      )}
                    >
                      <child.icon className="h-4 w-4 shrink-0" />
                      <span>{child.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-1 transition-colors hover:text-primary whitespace-nowrap",
              isActive(item.href)
                ? "text-primary font-semibold"
                : "text-foreground/60"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
