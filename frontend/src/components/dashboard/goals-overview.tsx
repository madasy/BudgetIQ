import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Crosshair, TrendingUp } from "lucide-react"

interface Goal {
  name: string
  current: number
  target: number
  percentage: number
  color: string
}

export function GoalsOverview() {
  const goals: Goal[] = [
    {
      name: "Emergency Fund",
      current: 6500,
      target: 10000,
      percentage: 65,
      color: "bg-blue-600 dark:bg-blue-400",
    },
    {
      name: "Vacation",
      current: 3250,
      target: 5000,
      percentage: 65,
      color: "bg-purple-600 dark:bg-purple-400",
    },
    {
      name: "New Car",
      current: 8750,
      target: 25000,
      percentage: 35,
      color: "bg-green-600 dark:bg-green-400",
    },
  ]

  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0)
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0)
  const overallProgress = Math.round((totalSaved / totalTarget) * 100)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">Goals Overview</CardTitle>
        <CardDescription>Progress towards your savings goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overall Progress */}
          <div className="text-center p-4 rounded-lg bg-muted ">
            <div className="flex flex-col items-center justify-center gap-2 mb-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Crosshair className="h-4 w-4 text-primary" />
              </div>
              <span className="text-2xl font-semibold">{overallProgress}%</span>
            </div>
            <div className="text-xs text-muted-foreground">Overall Progress</div>
            <div className="text-xs text-muted-foreground mt-1">
              ${totalSaved.toLocaleString()} of ${totalTarget.toLocaleString()}
            </div>
          </div>

          {/* Individual Goals */}
          <div className="space-y-3">
            {goals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-muted-foreground">{goal.percentage}%</span>
                </div>
                <Progress value={goal.percentage} className="h-1.5" indicatorClassName={goal.color} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${goal.current.toLocaleString()}</span>
                  <span>${goal.target.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                ${(totalSaved / goals.length).toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Avg per Goal</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-blue-600 dark:text-blue-400">
                <TrendingUp className="h-4 w-4" />
                <span>+12%</span>
              </div>
              <div className="text-xs text-muted-foreground">This Month</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
