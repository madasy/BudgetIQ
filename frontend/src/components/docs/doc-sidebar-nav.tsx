import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { docNavItems } from "./doc-nav-items";

export function DocSidebarNav() {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col space-y-2">
      {docNavItems.map((item, index) => (
        <div key={index}>
          {item.href ? (
            <Link
              to={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                pathname === item.href
                  ? "bg-muted text-primary"
                  : "text-foreground"
              )}
            >
              {item.title}
            </Link>
          ) : (
            <h3 className="mb-2 mt-4 px-3 text-xs font-semibold text-muted-foreground">
              {item.title}
            </h3>
          )}
          {item.items && (
            <div className="flex flex-col space-y-1 pl-4">
              {item.items.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  to={subItem.href || "#"}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted",
                    pathname === subItem.href
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
