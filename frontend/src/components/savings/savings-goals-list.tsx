import { AddContributionDialog } from "@/components/savings/add-contribution-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Car,
  Gift,
  GraduationCap,
  Home,
  MoreHorizontal,
  PiggyBank,
  Plane,
} from "lucide-react";
import { useState } from "react";

// Define goal status type
type GoalStatus = "active" | "paused" | "completed";

// Define goal interface
interface Goal {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  target: number;
  current: number;
  percentage: number;
  targetDate: string;
  status: GoalStatus;
}

export function SavingsGoalsList() {
  const [activeTab, setActiveTab] = useState<"all" | GoalStatus>("all");
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [openContribution, setOpenContribution] = useState<boolean>(false);

  const goals: Goal[] = [
    {
      id: "1",
      name: "Emergency Fund",
      icon: PiggyBank,
      color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
      target: 10000,
      current: 6500,
      percentage: 65,
      targetDate: "Dec 2024",
      status: "active",
    },
    {
      id: "2",
      name: "New Car",
      icon: Car,
      color:
        "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
      target: 25000,
      current: 8750,
      percentage: 35,
      targetDate: "Jun 2025",
      status: "active",
    },
    {
      id: "3",
      name: "Vacation",
      icon: Plane,
      color:
        "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
      target: 5000,
      current: 3250,
      percentage: 65,
      targetDate: "Aug 2024",
      status: "active",
    },
    {
      id: "4",
      name: "Home Down Payment",
      icon: Home,
      color:
        "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
      target: 50000,
      current: 12500,
      percentage: 25,
      targetDate: "Dec 2026",
      status: "active",
    },
    {
      id: "5",
      name: "Education Fund",
      icon: GraduationCap,
      color: "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300",
      target: 20000,
      current: 5000,
      percentage: 25,
      targetDate: "Sep 2025",
      status: "paused",
    },
    {
      id: "6",
      name: "Anniversary Gift",
      icon: Gift,
      color:
        "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300",
      target: 1000,
      current: 1000,
      percentage: 100,
      targetDate: "Completed",
      status: "completed",
    },
  ];

  const filteredGoals =
    activeTab === "all"
      ? goals
      : goals.filter((goal) => goal.status === activeTab);

  const handleAddContribution = (goal: Goal) => {
    setSelectedGoal(goal);
    setOpenContribution(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-4">
            <div className="space-y-1.5">
              <CardTitle>Saving Goals</CardTitle>
            </div>
            <div className="overflow-x-auto whitespace-nowrap pb-2">
              <Tabs
                value={activeTab}
                onValueChange={(value: string) =>
                  setActiveTab(value as "all" | GoalStatus)
                }
              >
                <TabsList className="flex bg-transparent border border-border rounded-md p-0 text-foreground w-fit">
                  {["all", "active", "paused", "completed"].map(
                    (tab, index, arr) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className={cn(
                          "px-4 py-2 text-sm font-medium border-r border-border rounded-none bg-transparent data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none transition-colors",
                          index === 0 && "rounded-s-md",
                          index === arr.length - 1 && "rounded-e-md border-r-0"
                        )}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </TabsTrigger>
                    )
                  )}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredGoals.map((goal) => (
              <div key={goal.id} className="p-4 border rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-10 w-10 rounded-lg ${goal.color} flex items-center justify-center`}
                    >
                      <goal.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{goal.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Target: {goal.targetDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {goal.status !== "completed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddContribution(goal)}
                        className="hidden sm:flex"
                      >
                        Add Funds
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {goal.status !== "completed" && (
                          <DropdownMenuItem
                            onClick={() => handleAddContribution(goal)}
                          >
                            Add Funds
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Goal</DropdownMenuItem>
                        {goal.status === "active" ? (
                          <DropdownMenuItem>Pause Goal</DropdownMenuItem>
                        ) : goal.status === "paused" ? (
                          <DropdownMenuItem>Resume Goal</DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem>Delete Goal</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>
                      ${goal.current.toLocaleString()} of $
                      {goal.target.toLocaleString()}
                    </span>
                    <span className="font-medium">{goal.percentage}%</span>
                  </div>
                  <Progress
                    value={goal.percentage}
                    className="h-1.5"
                    indicatorClassName={
                      goal.status === "completed"
                        ? "bg-secondary dark:bg-secondary/80"
                        : goal.status === "paused"
                        ? "bg-amber-600 dark:bg-amber-400"
                        : "bg-primary dark:bg-primary/80"
                    }
                  />
                </div>
                {goal.status !== "completed" && (
                  <div className="mt-4 sm:hidden">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                      onClick={() => handleAddContribution(goal)}
                    >
                      Add Funds
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {selectedGoal && (
        <AddContributionDialog
          open={openContribution}
          onOpenChange={setOpenContribution}
          goals={[selectedGoal]} // Changed from `goal` to `goals` and passed as an array
        />
      )}
    </>
  );
}
