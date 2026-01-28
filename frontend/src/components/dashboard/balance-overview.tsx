import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AArrowDown as BanknoteArrowDown,
  BanknoteIcon as BanknoteArrowUp,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

export function BalanceOverview() {
  // Mock data for current and last month
  const currentMonthExpenses = 4335
  const lastMonthExpenses = 3890
  const expenseChange = currentMonthExpenses - lastMonthExpenses
  const expenseChangePercentage = ((expenseChange / lastMonthExpenses) * 100).toFixed(1)
  const isExpenseIncrease = expenseChange > 0

  return (
    <Card className="col-span-2 md:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle>Balance Overview</CardTitle>
        <CardDescription>Your current financial status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4 mt-2">
          <div className="relative h-40 w-40 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-8 border-primary/20"></div>
            <div
              className="absolute inset-0 rounded-full border-8 border-primary"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 70%)",
              }}
            ></div>
            <div className="text-center space-y-2">
              <DollarSign className="h-6 w-6 mx-auto text-primary font-semibold" />
              <div className="text-2xl font-bold">8,245</div>
              <div className="text-sm text-muted-foreground">Total Balance</div>
            </div>
          </div>

          <div className="grid grid-cols-1 w-full gap-4">
            <div className="flex flex-col bg-green-100 dark:bg-green-950 p-3 px-2 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-green-200 dark:bg-green-900 flex items-center justify-center">
                <BanknoteArrowUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Income</div>
                <div className="text-sm font-semibold">$10,580</div>
              </div>
            </div>
            <div className="flex gap-4 bg-red-100 dark:bg-red-950 p-3 px-2 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-red-200 dark:bg-red-900 flex items-center justify-center">
                <BanknoteArrowDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Expenses</div>
                <div className="text-sm font-semibold">$4,335</div>
              </div>
            </div>
            <div className="flex gap-4 bg-green-100 dark:bg-green-950 p-3 px-2 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-green-200 dark:bg-green-900 flex items-center justify-center">
                <BanknoteArrowUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Goals</div>
                <div className="text-sm font-semibold">$10,580</div>
              </div>
            </div>
            <div className="flex gap-4 bg-red-100 dark:bg-red-950 p-3 px-2 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-red-200 dark:bg-red-900 flex items-center justify-center">
                <BanknoteArrowDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Investment</div>
                <div className="text-sm font-semibold">$4,335</div>
              </div>
            </div>
          </div>
          <div className="w-full p-3 rounded-lg bg-muted/50 border">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">vs Last Month</div>
              <div
                className={`flex items-center gap-1 ${
                  isExpenseIncrease ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                }`}
              >
                {isExpenseIncrease ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="text-xs font-medium">
                  {isExpenseIncrease ? "+" : ""}${Math.abs(expenseChange)} ({expenseChangePercentage}%)
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {isExpenseIncrease ? "Spending increased" : "Spending decreased"} compared to last month
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
