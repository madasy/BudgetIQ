import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import { Progress } from "../ui/progress"

export function DailyLimitCard() {
  const spent = 17500
  const total = 25000
  const percentage = ((spent / total) * 100).toFixed(1)

  return (
    <Card className="">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">
          <div className="flex items-start justify-between mb-4">
            Daily Limit
            <MoreHorizontal className="w-5 h-5 cursor-pointer" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium">
            ${spent.toLocaleString()}
            <span className="text-xs text-accent-foreground ml-1">spent of ${total.toLocaleString()}</span>
          </p>
          <span className="text-xs font-semibold">{percentage}%</span>
        </div>
        <Progress value={Number(percentage)} className="h-1.5" />
      </CardContent>
    </Card>
  )
}
