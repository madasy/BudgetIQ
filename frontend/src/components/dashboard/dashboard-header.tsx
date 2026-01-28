import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function DashboardHeader() {
  // Get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
      <div>
        <h1 className="text-xl font-semibold tracking-wide">Dashboard</h1>
        <p className="text-sm text-muted-foreground flex items-center tracking-wide">
          {formattedDate}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">Export Data</Button>
        <Button>
          <Link to="/reports">View Reports</Link>
        </Button>
      </div>
    </div>
  );
}
