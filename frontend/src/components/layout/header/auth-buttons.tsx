import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">
        <Link to="/login">Sign In</Link>
      </Button>
      <Button size="sm">
        <Link to="/register">Sign Up</Link>
      </Button>
    </div>
  );
}
