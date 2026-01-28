import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Budget {
  category: string;
  spent: number;
  limit: number;
  percentage: number;
  status: "on-track" | "warning" | "exceeded";
}

export function BudgetPerformance() {
  const budgets: Budget[] = [
    {
      category: "Food & Dining",
      spent: 350,
      limit: 500,
      percentage: 70,
      status: "on-track",
    },
    {
      category: "Transportation",
      spent: 180,
      limit: 200,
      percentage: 90,
      status: "warning",
    },
    {
      category: "Entertainment",
      spent: 150,
      limit: 120,
      percentage: 125,
      status: "exceeded",
    },
    {
      category: "Shopping",
      spent: 200,
      limit: 300,
      percentage: 67,
      status: "on-track",
    },
    {
      category: "Housing",
      spent: 1500,
      limit: 1350,
      percentage: 125,
      status: "exceeded",
    },
    {
      category: "Utilities",
      spent: 250,
      limit: 320,
      percentage: 67,
      status: "on-track",
    },
    {
      category: "Health",
      spent: 450,
      limit: 500,
      percentage: 90,
      status: "warning",
    },
  ];

  const getStatusColor = (status: Budget["status"]) => {
    switch (status) {
      case "on-track":
        return "text-primary dark:text-primary";
      case "warning":
        return "text-amber-600 dark:text-amber-400";
      case "exceeded":
        return "text-destructive dark:text-destructive";
      default:
        return "";
    }
  };

  const getProgressColor = (status: Budget["status"]) => {
    switch (status) {
      case "on-track":
        return "bg-primary dark:bg-primary";
      case "warning":
        return "bg-amber-600 dark:bg-amber-400";
      case "exceeded":
        return "bg-destructive dark:bg-destructive";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: Budget["status"]) => {
    switch (status) {
      case "on-track":
        return <CheckCircle className="w-4 h-4 text-primary" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "exceeded":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  // Sort by percentage descending so exceeded/warnings show first
  const sortedBudgets = [...budgets].sort(
    (a, b) => b.percentage - a.percentage
  );

  return (
    <Card>
      <CardHeader className="flex p-6 flex-row justify-between items-center">
        <div className="">
          <CardTitle>Budget Performance</CardTitle>
        </div>
        <Link
          to="/budget"
          className="text-sm text-primary font-semibold border-b border-current border-dotted hover:text-primary/60 transition-colors duration-300"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 my-3">
          {sortedBudgets.map((budget) => (
            <div key={budget.category} className="space-y-3">
              <div className="flex justify-between text-sm mb-5 items-center *:">
                <span className="flex items-center gap-1">
                  {getStatusIcon(budget.status)} {budget.category}
                </span>
                <span className={getStatusColor(budget.status)}>
                  ${budget.spent} / ${budget.limit}
                </span>
              </div>
              <Progress
                value={Math.min(budget.percentage, 100)}
                className="h-1.5"
                indicatorClassName={getProgressColor(budget.status)}
              />
              {budget.percentage > 100 && (
                <span className="text-xs text-destructive">
                  +{budget.percentage - 100}% over
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
