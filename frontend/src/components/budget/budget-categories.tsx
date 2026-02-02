import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Car,
  ChevronDown,
  ChevronUp,
  Film,
  Home,
  ShoppingBag,
  Utensils,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
}

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  spent: number;
  limit: number;
  percentage: number;
  transactions: Transaction[];
}

export function BudgetCategories() {
  const [totalBudget, setTotalBudget] = useState(3000);
  const [newBudget, setNewBudget] = useState(totalBudget);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Housing",
      icon: Home,
      color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
      spent: 1200,
      limit: 1500,
      percentage: 80,
      transactions: [
        {
          id: 1,
          description: "Rent Payment",
          amount: 1000,
          date: "May 1, 2024",
        },
        { id: 2, description: "Utilities", amount: 150, date: "May 5, 2024" },
        { id: 3, description: "Internet", amount: 50, date: "May 10, 2024" },
      ],
    },
    {
      id: "2",
      name: "Food & Dining",
      icon: Utensils,
      color:
        "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
      spent: 350,
      limit: 500,
      percentage: 70,
      transactions: [
        {
          id: 1,
          description: "Grocery Store",
          amount: 85,
          date: "May 20, 2024",
        },
        {
          id: 2,
          description: "Restaurant Dinner",
          amount: 65,
          date: "May 18, 2024",
        },
        { id: 3, description: "Coffee Shop", amount: 25, date: "May 15, 2024" },
        { id: 4, description: "Lunch", amount: 35, date: "May 12, 2024" },
        {
          id: 5,
          description: "Grocery Store",
          amount: 140,
          date: "May 8, 2024",
        },
      ],
    },
    {
      id: "3",
      name: "Transportation",
      icon: Car,
      color:
        "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
      spent: 180,
      limit: 200,
      percentage: 90,
      transactions: [
        { id: 1, description: "Gas Station", amount: 45, date: "May 19, 2024" },
        { id: 2, description: "Uber Ride", amount: 25, date: "May 16, 2024" },
        { id: 3, description: "Gas Station", amount: 50, date: "May 10, 2024" },
        { id: 4, description: "Parking Fee", amount: 15, date: "May 8, 2024" },
        { id: 5, description: "Gas Station", amount: 45, date: "May 3, 2024" },
      ],
    },
    {
      id: "4",
      name: "Entertainment",
      icon: Film,
      color:
        "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
      spent: 150,
      limit: 120,
      percentage: 125,
      transactions: [
        {
          id: 1,
          description: "Movie Tickets",
          amount: 32,
          date: "May 17, 2024",
        },
        {
          id: 2,
          description: "Streaming Service",
          amount: 15,
          date: "May 15, 2024",
        },
        {
          id: 3,
          description: "Concert Tickets",
          amount: 75,
          date: "May 12, 2024",
        },
        { id: 4, description: "Gaming", amount: 28, date: "May 5, 2024" },
      ],
    },
    {
      id: "5",
      name: "Shopping",
      icon: ShoppingBag,
      color: "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300",
      spent: 200,
      limit: 300,
      percentage: 67,
      transactions: [
        {
          id: 1,
          description: "Clothing Store",
          amount: 85,
          date: "May 14, 2024",
        },
        { id: 2, description: "Electronics", amount: 65, date: "May 9, 2024" },
        { id: 3, description: "Books", amount: 30, date: "May 6, 2024" },
        { id: 4, description: "Home Decor", amount: 20, date: "May 2, 2024" },
      ],
    },
    {
      id: "6",
      name: "Utilities",
      icon: Wifi,
      color:
        "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300",
      spent: 150,
      limit: 180,
      percentage: 83,
      transactions: [
        {
          id: 1,
          description: "Electric Bill",
          amount: 120,
          date: "May 12, 2024",
        },
        { id: 2, description: "Water Bill", amount: 30, date: "May 8, 2024" },
      ],
    },
  ]);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  const updateBudgetLimit = (id: string, newLimit: number) => {
    if (Number.isNaN(newLimit) || newLimit < 0) return;
    const currentTotal = categories.reduce((sum, cat) => sum + cat.limit, 0);
    const currentCategory = categories.find((c) => c.id === id);

    if (!currentCategory) return;

    const otherTotal = currentTotal - currentCategory.limit;
    const maxAllowed = totalBudget - otherTotal;
    const adjustedLimit = Math.min(newLimit, maxAllowed);

    setCategories(
      categories.map((category) => {
        if (category.id === id) {
          const percentage = (category.spent / adjustedLimit) * 100;
          return { ...category, limit: adjustedLimit, percentage };
        }
        return category;
      })
    );
  };

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const totalAllocated = categories.reduce((sum, c) => sum + c.limit, 0);

  const handleBudgetUpdate = () => {
    if (newBudget >= 0) {
      setTotalBudget(newBudget);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Budget Categories</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Total Budget Control */}
        <div className="flex flex-col text-sm md:flex-row md:items-center md:justify-between gap-3">
          <div>
            Total budget:{" "}
            <span className="text-primary font-semibold">${totalBudget}</span> |
            Allocated:{" "}
            <span
              className={
                totalAllocated > totalBudget
                  ? "text-red-600 dark:text-red-400 font-medium"
                  : "font-medium"
              }
            >
              ${totalAllocated}
            </span>
          </div>
          <div className="flex items-center gap-2">
            Manage Budget:
            <Input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(Number(e.target.value))}
              className="w-28"
            />
            <Button onClick={handleBudgetUpdate}>Update</Button>
          </div>
        </div>

        {/* Category Budget Control */}
        <div className="py-6 space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="py-4 px-3 mb-2 border rounded-lg">
              <Collapsible
                open={openCategories[category.id]}
                onOpenChange={() => toggleCategory(category.id)}
              >
                <div className="group flex items-center justify-between rounded-lg mb-2">
                  <div className="flex items-center gap-2 group-hover:text-primary p-2 rounded-md transition-color">
                    <div
                      className={`h-12 w-12 rounded-xl ${category.color} flex items-center justify-center`}
                    >
                      <category.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="text-sm">
                    <span
                      className={
                        category.percentage > 90
                          ? "text-red-600 dark:text-red-400"
                          : ""
                      }
                    >
                      ${category.spent}
                    </span>{" "}
                    / ${category.limit}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Progress
                    value={
                      category.percentage > 100 ? 100 : category.percentage
                    }
                    className="h-1.5 flex-1"
                    indicatorClassName={
                      category.percentage > 90
                        ? "bg-red-600 dark:bg-red-400"
                        : category.percentage > 75
                        ? "bg-amber-600 dark:bg-amber-400"
                        : "bg-green-600 dark:bg-green-400"
                    }
                  />
                  <span className="text-sm font-medium w-10 text-right">
                    {Math.round(category.percentage)}%
                  </span>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Budget limit</span>
                    <span>${category.limit}</span>
                  </div>
                  <Input
                    type="number"
                    min={category.spent}
                    max={totalBudget}
                    step={10}
                    value={category.limit}
                    onChange={(event) =>
                      updateBudgetLimit(category.id, Number(event.target.value))
                    }
                    className="w-32"
                  />
                </div>
                <CollapsibleTrigger className="mx-auto w-full">
                  <div className="flex justify-self-center items-center mt-3 text-primary font-medium hover:text-primary/70 mx-auto w-max gap-1 cursor-pointer select-none">
                    <span className="me-1 text-sm">View Transactions</span>
                    {openCategories[category.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-2 mt-2">
                  <div className="ml-10 p-3 rounded-lg bg-muted/50 border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-sm">
                        Recent Transactions
                      </h4>
                      <Badge variant="outline">
                        {category.transactions.length} transactions
                      </Badge>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {category.transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                        >
                          <div>
                            <div className="text-sm font-medium">
                              {transaction.description}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {transaction.date}
                            </div>
                          </div>
                          <div className="text-sm font-medium">
                            ${transaction.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-2 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                      >
                        View All {category.name} Transactions
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline">Reset All</Button>
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
