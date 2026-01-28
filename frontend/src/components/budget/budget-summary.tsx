import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Home, ShoppingBag, Utensils, type LucideIcon } from "lucide-react"

interface TopSpendingCategory {
  category: string
  icon: LucideIcon
  value: number
}

export function BudgetSummary() {
  const totalBudget = 3000
  const totalSpent = 2230
  const percentageSpent = Math.round((totalSpent / totalBudget) * 100)
  const daysLeft = 10
  const dailyBudget = Math.round((totalBudget - totalSpent) / daysLeft)

  const TSC: TopSpendingCategory[] = [
    {
      category: "Housing",
      icon: Home,
      value: 40,
    },
    {
      category: "Food & Dinning",
      icon: Utensils,
      value: 12,
    },
    {
      category: "Shopping",
      icon: ShoppingBag,
      value: 7,
    },
  ]

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-3">
        <CardTitle>Budget Summary</CardTitle>
        <CardDescription>May 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex justify-between content-center">
            <div className="flex flex-col text-sm">
              <span className="text-muted-foreground">Total Budget</span>
              <span className="text-xl font-medium">${totalBudget.toLocaleString()}</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className="text-muted-foreground">Total Spent</span>
              <span className="text-xl font-medium">${totalSpent.toLocaleString()}</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className="text-muted-foreground">Remaining</span>
              <span className="text-xl font-medium">${(totalBudget - totalSpent).toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Budget Used</span>
              <span className="font-medium">{percentageSpent}%</span>
            </div>
            <Progress
              value={percentageSpent}
              className="h-1.5"
              indicatorClassName={
                percentageSpent > 90
                  ? "bg-red-600 dark:bg-red-400"
                  : percentageSpent > 75
                    ? "bg-amber-600 dark:bg-amber-400"
                    : "bg-primary"
              }
            />
          </div>

          <div className="flex justify-between items-center rounded-xl bg-muted p-4 transition">
            <div>
              <div className="text-sm text-muted-foreground">Daily Budget</div>
              <div className="text-3xl font-extrabold">${dailyBudget}</div>
            </div>
            <div className="text-sm text-muted-foreground">for the next {daysLeft} days</div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Top Spending Categories</div>
            {TSC.map((tsc, index) => (
              <div className="space-y-3 pb-5" key={index}>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-foreground">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/20">
                      <tsc.icon className="text-primary h-4 w-4" />
                    </div>
                    <span>{tsc.category}</span>
                  </div>
                  <span className="font-medium">{tsc.value}%</span>
                </div>
                <Progress value={tsc.value} className="h-1 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
