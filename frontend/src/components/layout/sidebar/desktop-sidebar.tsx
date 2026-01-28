import { Logo } from "@/components/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import navItems from "../navItems";
import { NavigationItems } from "./navigation-items";

interface DesktopSidebarProps {
  isCollapsed: boolean;
  direction?: "ltr" | "rtl";
}

export function DesktopSidebar({
  isCollapsed,
  direction = "ltr",
}: DesktopSidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed top-0 bottom-0 z-40 hidden md:flex h-screen flex-col border-r bg-background",
          isCollapsed ? "w-[70px]" : "w-[260px]",
          direction === "rtl" ? "right-0 border-l" : "left-0 border-r"
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex h-16 shrink-0 items-center py-4",
            !isCollapsed ? "px-6" : "px-4"
          )}
        >
          <Logo showText={!isCollapsed} />
        </div>

        {/* Scrollable Nav Area */}
        <ScrollArea
          className={cn(
            "flex-1 overflow-y-auto h-[calc(100vh-64px)]",
            direction === "rtl" && "rtl-scroll"
          )}
        >
          <div className="py-4">
            {!isCollapsed && (
              <h2 className="rtl:text-right mb-2 px-6 text-xs font-semibold tracking-wide text-muted-foreground">
                MAIN NAVIGATION
              </h2>
            )}

            {/* Collapsed Version */}
            {isCollapsed ? (
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <Tooltip key={item.name} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center justify-center rounded-md p-2 text-sm font-medium tracking-wide hover:bg-accent hover:text-accent-foreground",
                          isActive(item.href)
                            ? "text-sidebar-primary"
                            : "text-sidebar-foreground"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-6 w-6 transition-all opacity-80 hover:opacity-100",
                            isActive(item.href) && "text-sidebar-primary"
                          )}
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side={direction === "rtl" ? "left" : "right"}
                    >
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ) : (
              <NavigationItems
                isCollapsed={isCollapsed}
                mobile={false}
                direction={direction}
                navItems={navItems}
                isActive={isActive}
              />
            )}
          </div>
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
}
