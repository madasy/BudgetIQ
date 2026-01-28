import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Folder } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ replace next/link

interface CollapsableMenuProps {
  isCollapsed?: boolean;
}

export function CollapsableMenu({ isCollapsed = false }: CollapsableMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-2">
      {/* Parent Item */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-foreground transition-colors",
          open && "bg-accent"
        )}
      >
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-muted-foreground" />
          {!isCollapsed && <span>Projects</span>}
        </div>
        {!isCollapsed && (
          <ChevronDown
            className={cn(
              "w-4 h-4 transform transition-transform",
              open ? "rotate-180" : "rotate-0"
            )}
          />
        )}
      </button>

      {/* Submenu */}
      <div
        className={cn(
          "ml-7 mt-1 space-y-1 overflow-hidden transition-all text-sm text-muted-foreground",
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Link
          to="/projects/overview"
          className="block py-1.5 px-2 rounded-md hover:bg-muted hover:text-foreground transition-colors"
        >
          Overview
        </Link>
        <Link
          to="/projects/settings"
          className="block py-1.5 px-2 rounded-md hover:bg-muted hover:text-foreground transition-colors"
        >
          Settings
        </Link>
      </div>
    </div>
  );
}
