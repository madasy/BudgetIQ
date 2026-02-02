import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "@/lib/api";

interface UserProfileProps {
  mobile?: boolean;
  isCollapsed?: boolean;
}

export function UserProfile({
  mobile = false,
  isCollapsed = false,
}: UserProfileProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-accent transition-colors">
      {/* Avatar */}
      <Avatar className="h-10 w-10">
        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      {/* User Info */}
      {(!isCollapsed || mobile) && (
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">John Doe</p>
          <p className="text-xs text-muted-foreground truncate">
            john.doe@example.com
          </p>
        </div>
      )}

      {/* Logout Button */}
      {(!isCollapsed || mobile) && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span className="sr-only">Log out</span>
        </Button>
      )}
    </div>
  );
}
