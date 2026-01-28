import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface Transaction {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
  type: "expense" | "income";
}

export function RecentTransactions() {
  const transactions: Transaction[] = [
    {
      id: "1",
      description: "Grocery Shopping",
      category: "Food & Dining",
      date: "May 20, 2024",
      amount: -85.5,
      type: "expense",
    },
    {
      id: "2",
      description: "Salary Deposit",
      category: "Income",
      date: "May 15, 2024",
      amount: 3200.0,
      type: "income",
    },
    {
      id: "3",
      description: "Electric Bill",
      category: "Utilities",
      date: "May 12, 2024",
      amount: -120.35,
      type: "expense",
    },
    {
      id: "4",
      description: "Freelance Payment",
      category: "Income",
      date: "May 10, 2024",
      amount: 450.0,
      type: "income",
    },
    {
      id: "5",
      description: "Restaurant Dinner",
      category: "Food & Dining",
      date: "May 8, 2024",
      amount: -65.8,
      type: "expense",
    },
    {
      id: "6",
      description: "Car Maintenance",
      category: "Utilities",
      date: "May 8, 2024",
      amount: -65.8,
      type: "expense",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between gap-6">
          <div className="space-y-1.5">
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription></CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground text-xs" />
              <Input
                placeholder="Search transactions..."
                className="pl-8 w-[150px]"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="grid grid-cols-3 items-center p-3 rounded-lg hover:bg-accent transition-colors"
            >
              {/* Left: Icon + Description */}
              <div className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    transaction.type === "income"
                      ? "bg-green-100 dark:bg-green-900"
                      : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Minus className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-sm">
                    {transaction.description}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {transaction.category}
                  </div>
                </div>
              </div>

              {/* Middle: Date column */}
              <div className="text-center items-start text-sm text-muted-foreground self-start">
                {transaction.date}
              </div>

              {/* Right: Amount */}
              <div
                className={`text-right font-medium text-sm self-start ${
                  transaction.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : ""}
                {transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-center">
          <Button variant="outline" asChild>
            <Link to="/expenses">View All Transactions</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
