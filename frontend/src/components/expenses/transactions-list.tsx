import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Banknote,
  Briefcase,
  Car,
  Film,
  Minus,
  MoreHorizontal,
  PiggyBank,
  Plug,
  Plus,
  Receipt,
  Utensils,
} from "lucide-react";

// Define allowed category names
type Category =
  | "Food & Dining"
  | "Income"
  | "Utilities"
  | "Transportation"
  | "Entertainment"
  | "Investment"
  | "Freelance";

// Define transaction data type
interface Transaction {
  id: string;
  description: string;
  category: Category;
  date: string;
  amount: number;
  type: "income" | "expense";
  hasReceipt: boolean;
}

export function TransactionsList() {
  // Explicitly type categoryIcons
  const categoryIcons: Record<Category, React.ReactNode> = {
    "Food & Dining": <Utensils className="w-4 h-4" />,
    Income: <Banknote className="w-4 h-4" />,
    Utilities: <Plug className="w-4 h-4" />,
    Transportation: <Car className="w-4 h-4" />,
    Entertainment: <Film className="w-4 h-4" />,
    Investment: <PiggyBank className="w-4 h-4" />,
    Freelance: <Briefcase className="w-4 h-4" />,
  };

  // Type transactions array
  const transactions: Transaction[] = [
    {
      id: "1",
      description: "Grocery Shopping",
      category: "Food & Dining",
      date: "May 20, 2024",
      amount: -85.5,
      type: "expense",
      hasReceipt: true,
    },
    {
      id: "2",
      description: "Salary Deposit",
      category: "Income",
      date: "May 15, 2024",
      amount: 3200.0,
      type: "income",
      hasReceipt: false,
    },
    {
      id: "3",
      description: "Electric Bill",
      category: "Utilities",
      date: "May 12, 2024",
      amount: -120.35,
      type: "expense",
      hasReceipt: true,
    },
    {
      id: "4",
      description: "Freelance Payment",
      category: "Freelance",
      date: "May 10, 2024",
      amount: 450.0,
      type: "income",
      hasReceipt: false,
    },
    {
      id: "5",
      description: "Restaurant Dinner",
      category: "Food & Dining",
      date: "May 8, 2024",
      amount: -65.8,
      type: "expense",
      hasReceipt: false,
    },
    {
      id: "6",
      description: "Gas Station",
      category: "Transportation",
      date: "May 5, 2024",
      amount: -45.2,
      type: "expense",
      hasReceipt: true,
    },
    {
      id: "7",
      description: "Movie Tickets",
      category: "Entertainment",
      date: "May 3, 2024",
      amount: -32.5,
      type: "expense",
      hasReceipt: false,
    },
    {
      id: "8",
      description: "Investment Dividend",
      category: "Investment",
      date: "May 1, 2024",
      amount: 75.25,
      type: "income",
      hasReceipt: false,
    },
  ];

  return (
    <Card className="rounded-lg border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Transactions</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Your recent financial activities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-xl p-3 hover:bg-muted transition-colors group"
          >
            {/* Left icon & description */}
            <div className="flex items-center flex-grow gap-3 w-1/3 min-w-[200px]">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                  tx.type === "income"
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-900"
                }`}
              >
                {tx.type === "income" ? (
                  <Plus className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Minus className="w-4 h-4 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium flex items-center gap-1">
                  {tx.description}
                  {tx.hasReceipt && (
                    <Receipt className="w-3 h-3 text-muted-foreground" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{tx.date}</div>
              </div>
            </div>

            {/* Center: category with icon */}
            <div className="w-1/3 flex justify-center">
              <div className="w-full max-w-[160px] flex items-center gap-2 text-sm font-medium text-foreground/80 dark:text-foreground/70">
                {categoryIcons[tx.category] || (
                  <Briefcase className="w-4 h-4" />
                )}
                <span className="truncate">{tx.category}</span>
              </div>
            </div>

            {/* Right: amount & menu */}
            <div className="flex items-center justify-end w-1/3 gap-3">
              <div
                className={`text-sm font-semibold text-right ${
                  tx.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}$
                {Math.abs(tx.amount).toFixed(2)}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-70 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Categorize</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}

        <div className="pt-4 flex justify-center">
          <Button variant="outline" size="sm">
            Load More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
