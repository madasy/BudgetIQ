import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  MoreHorizontal,
  SquareArrowOutUpRight,
  SquarePercent as SquaresIntersect,
  Vault,
  type LucideIcon,
} from "lucide-react";

interface StatItem {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: LucideIcon;
  iconBg: string;
  iconText: string;
}

const statData: StatItem[] = [
  {
    title: "Total Income",
    value: "7.8k",
    change: "+ 1.78%",
    changeType: "up",
    icon: DollarSign,
    iconBg: "bg-primary/10",
    iconText: "text-primary",
  },
  {
    title: "Total Expense",
    value: "4.3k",
    change: "- 1.78%",
    changeType: "down",
    icon: SquareArrowOutUpRight,
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
  },
  {
    title: "Total Savings",
    value: "5.6k",
    change: "+ 1.24%",
    changeType: "up",
    icon: Vault,
    iconBg: "bg-orange-100",
    iconText: "text-orange-600",
  },
  {
    title: "Total Investment",
    value: "3.75k",
    change: "+ 66.95%",
    changeType: "up",
    icon: SquaresIntersect,
    iconBg: "bg-indigo-200",
    iconText: "text-indigo-500",
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {statData.map((item, i) => (
        <Card key={i} className="p-4">
          <CardContent className="p-0">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="text-2xl font-bold text-accent-foreground mb-1">
                  ${item.value.toLocaleString()}
                </p>
              </div>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${item.iconBg}`}
              >
                <item.icon className={`h-5 w-5  ${item.iconText}`} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  item.changeType === "up"
                    ? "bg-primary text-primary-foreground"
                    : "bg-destructive text-destructive-foreground"
                }`}
              >
                {item.changeType === "up" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {item.change}
              </span>

              <button className="p-1 rounded-md hover:bg-accent v-align-middle">
                <MoreHorizontal className="h-5 w-5 text-accent-foreground" />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
