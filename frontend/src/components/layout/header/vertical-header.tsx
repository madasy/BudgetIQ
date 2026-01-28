import { NotificationsMenu } from "@/components/notifications/notifications-menu";
import { ThemeConfig } from "@/components/theme/theme-config";
import { Button } from "@/components/ui/button";
import { Menu, PanelLeft } from "lucide-react";
import { useState } from "react";
import { AuthButtons } from "./auth-buttons";
import { ProfileMenu } from "./profile-menu";
import { SearchDialog } from "./search-dialog";
import { ThemeToggle } from "./theme-toggle";

// Mock search results
type SearchResult = {
  id: number;
  title: string;
  type: string;
  href: string;
};

const getSearchResults = (query: string): SearchResult[] => {
  const results: SearchResult[] = [
    { id: 1, title: "Checking Account", type: "Wallet", href: "/wallets/1" },
    { id: 2, title: "Savings Goal: Vacation", type: "Goal", href: "/goals/2" },
    { id: 3, title: "Monthly Budget", type: "Budget", href: "/budget" },
    { id: 4, title: "Electricity Bill", type: "Bill", href: "/bills/pay" },
    { id: 5, title: "Income Report", type: "Report", href: "/reports" },
  ];
  return results.filter(
    (item) => query && item.title.toLowerCase().includes(query.toLowerCase())
  );
};

interface VerticalHeaderProps {
  toggleSidebar: () => void;
  setMobileOpen: (open: boolean) => void;
}

export function VerticalHeader({
  toggleSidebar,
  setMobileOpen,
}: VerticalHeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = getSearchResults(searchQuery);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.href = "/auth/login";
  };

  return (
    <header className="sticky top-0 z-40 h-[65px] w-full border-b bg-card backdrop-blur supports-backdrop-filter:bg-card">
      <div className="container flex h-16 items-center justify-between  sm:px-4 md:px-12 max-w-full">
        <div className="flex items-center gap-2">
          {/* Sidebar Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2 hidden md:flex hover:cursor-pointer -ms-8"
          >
            <PanelLeft className="h-5 w-5" strokeWidth={2} />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Search Dialog */}
          <SearchDialog
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
          />
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
        </div>
      </div>
    </header>
  );
}
