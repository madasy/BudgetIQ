import { Link } from "react-router-dom";

export function DocFooter() {
  return (
    <footer className="mt-12 border-t pt-8 text-sm text-muted-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} BudgetIQ. All rights reserved.</p>
        <nav className="flex gap-4">
          <Link to="/docs/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/docs/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
