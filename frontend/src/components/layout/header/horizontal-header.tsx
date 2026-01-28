import { Logo } from "@/components/logo";
import { NotificationsMenu } from "@/components/notifications/notifications-menu";
import { ThemeConfig } from "@/components/theme/theme-config";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { AuthButtons } from "./auth-buttons";
import { NavigationLinks } from "./navigation-links";
import { ProfileMenu } from "./profile-menu";
import { ThemeToggle } from "./theme-toggle";

// Only need mobile menu for horizontal header
interface HorizontalHeaderProps {
  setMobileOpen: (open: boolean) => void;
}

export function HorizontalHeader({ setMobileOpen }: HorizontalHeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.href = "/auth/login";
  };

  return (
    <header className="sticky top-0 z-40 h-[65px] w-full border-b bg-card backdrop-blur supports-backdrop-filter:bg-card">
      <div className="container flex h-16 items-center justify-between px-3 sm:px-4 md:px-6 max-w-full">
        <div className="flex items-center gap-2">
          <Logo showText={false} className="sm:hidden" />
          <Logo className="hidden sm:flex" />
          <NavigationLinks />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ThemeConfig />

          {isLoggedIn ? (
            <>
              <NotificationsMenu />
              <ProfileMenu handleLogout={handleLogout} />
            </>
          ) : (
            <AuthButtons />
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
