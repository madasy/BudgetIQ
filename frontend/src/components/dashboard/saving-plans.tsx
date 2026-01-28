import {
  AlertTriangle,
  Home,
  MoreVertical,
  Plane,
  TrendingUp,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface SavingPlan {
  id: number;
  name: string;
  icon: ReactNode;
  saved: number;
  target: number;
}

const savingPlans: SavingPlan[] = [
  {
    id: 1,
    name: "New Car",
    icon: <AlertTriangle className="w-5 h-5 text-primary-foreground" />,
    saved: 15000,
    target: 35000,
  },
  {
    id: 2,
    name: "Trip to Europe",
    icon: <Plane className="w-5 h-5 text-primary-foreground" />,
    saved: 3000,
    target: 5000,
  },
  {
    id: 3,
    name: "Emmergency Fund",
    icon: <Home className="w-5 h-5 text-primary-foreground" />,
    saved: 6250,
    target: 10000,
  },
];

export default function SavingPlans() {
  const totalSavings = savingPlans.reduce((acc, plan) => acc + plan.saved, 0);

  return (
    <Card>
      <CardHeader className="flex items-center flex-row justify-between text-lg font-semibold">
        <CardTitle className="text-base font-medium">Saving Plans</CardTitle>
        <Link
          to="/savings"
          className="text-sm text-primary font-semibold border-b border-current border-dotted hover:text-primary/60 transition-colors duration-300"
        >
          Add Plan
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Savings</p>
            <p className="text-2xl font-bold text-accent-foreground">
              ${totalSavings.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm font-bold text-primary dark:text-primary">
              <TrendingUp className="h-4 w-4" />
              <span>+12%</span>
            </div>
            <div className="text-xs text-muted-foreground">This Month</div>
          </div>
        </div>

        <div className="space-y-4 ">
          {savingPlans.map((plan) => {
            const percentage = ((plan.saved / plan.target) * 100).toFixed(2);
            return (
              <div
                key={plan.id}
                className="rounded-xl border bg-card p-4 py-5 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                      {plan.icon}
                    </div>
                    <h3 className="font-medium text-muted-foreground">
                      {plan.name}
                    </h3>
                  </div>
                  <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>

                <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>
                    ${plan.saved.toLocaleString()} ({percentage}%)
                  </span>
                  <span>Target: ${plan.target.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
