import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HandCoins } from "lucide-react";

export function SavingsOverview() {
  // Mock data
  const totalSaved = 37000;
  const totalGoals = 111000;
  const percentageSaved = Math.round((totalSaved / totalGoals) * 100);
  const monthlySavingsTarget = 1500;
  const monthlySaved = 1200;
  const monthlyPercentage = Math.round(
    (monthlySaved / monthlySavingsTarget) * 100
  );

  return (
    <Card className="sticky top-12">
      <CardHeader className="pb-3">
        <CardTitle>Savings Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-32 w-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-primary"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% ${percentageSaved}%, 0 ${percentageSaved}%)`,
                }}
              ></div>
              <div className="flex flex-col space-y-1 items-center text-center">
                <HandCoins className="h-6 w-6 mx-auto text-primary" />
                <div className="text-2xl font-bold">{percentageSaved}%</div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </div>
            </div>
          </div>

          <div className="space-y-1 mb-2">
            <div className="flex justify-between text-sm p-2 hover:bg-muted">
              <span>Total Saved</span>
              <span className="font-medium">
                ${totalSaved.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm p-2 hover:bg-muted">
              <span>Total Goals</span>
              <span className="font-medium">
                ${totalGoals.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm p-2 hover:bg-muted">
              <span>Remaining</span>
              <span className="font-medium">
                ${(totalGoals - totalSaved).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-semibold">Monthly Savings</div>
            <div className="flex justify-between text-sm p-2 hover:bg-muted">
              <span>Target</span>
              <span className="font-medium">${monthlySavingsTarget}</span>
            </div>
            <div className="flex justify-between text-sm p-2 hover:bg-muted">
              <span>Saved This Month</span>
              <span className="font-medium">${monthlySaved}</span>
            </div>
            <div className="flex justify-between text-sm p-2 hover:bg-muted">
              <span>Progress</span>
              <span className="font-medium">{monthlyPercentage}%</span>
            </div>
            <div className="px-2">
              <Progress value={monthlyPercentage} className="h-1" />
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4 text-center space-y-3">
            <div className="text-sm font-medium">Savings Rate</div>
            <div className="text-2xl font-bold">18%</div>
            <div className="text-xs ">of monthly income</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
