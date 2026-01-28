import { Logo } from "@/components/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import navItems from "../navItems";
import { NavigationItems } from "./navigation-items";
import { UserProfile } from "./user-profile";

interface MobileSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  direction?: "ltr" | "rtl";
}

export function MobileSidebar({
  isMobileOpen,
  setIsMobileOpen,
  direction = "ltr",
}: MobileSidebarProps) {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetContent side={direction === "rtl" ? "right" : "left"} className="p-0 w-[280px]">
        <div className="flex h-16 shrink-0 items-center border-b px-4">
          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <Logo />
            </button>
          </div>
        </div>

        <div className="flex flex-col h-[calc(100vh-65px)]">
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="px-3 py-4">
              <h2 className="rtl:text-right mb-2 px-2 text-xs font-semibold text-muted-foreground">
                MAIN NAVIGATION
              </h2>
              <NavigationItems
                onClick={() => setIsMobileOpen(false)}
                isCollapsed={false}
                mobile={true}
                direction={direction}
                navItems={navItems}
                isActive={isActive}
              />
            </div>
          </ScrollArea>

          <div className="mt-auto border-t p-3">
            <UserProfile mobile={true} isCollapsed={false} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
