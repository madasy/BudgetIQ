import {
  ArrowDownRightFromCircleIcon,
  ArrowUpRightFromCircleIcon,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "../ui/card";

interface ChartDataPoint {
  value: number;
}

interface Stat {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  chartIndex: number;
  link: string;
}

export default function StatisticsCards() {
  const chartData: ChartDataPoint[][] = [
    [
      { value: 50 },
      { value: 65 },
      { value: 20 },
      { value: 25 },
      { value: 45 },
      { value: 43 },
      { value: 70 },
      { value: 80 },
      { value: 95 },
      { value: 100 },
      { value: 120 },
      { value: 130 },
    ],
    [
      { value: 45 },
      { value: 43 },
      { value: 47 },
      { value: 60 },
      { value: 55 },
      { value: 30 },
      { value: 58 },
      { value: 45 },
      { value: 40 },
      { value: 38 },
      { value: 25 },
      { value: 20 },
    ],
    [
      { value: 58 },
      { value: 30 },
      { value: 45 },
      { value: 40 },
      { value: 38 },
      { value: 20 },
      { value: 55 },
      { value: 25 },
      { value: 45 },
      { value: 43 },
      { value: 47 },
      { value: 60 },
    ],
  ];

  const stats: Stat[] = [
    {
      label: "Income (Monthly)",
      value: "$12,480",
      change: "+12.3%",
      icon: ArrowUpRightFromCircleIcon,
      chartIndex: 0,
      link: "/budget-planning",
    },
    {
      label: "Expenses",
      value: "$6,320",
      change: "-7.1%",
      icon: ArrowDownRightFromCircleIcon,
      chartIndex: 1,
      link: "/expenses",
    },
    {
      label: "Wallet Activity",
      value: "68.30%",
      change: "+5.6%",
      icon: Wallet,
      chartIndex: 2,
      link: "/reports",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const data = chartData[stat.chartIndex];

        return (
          <Card
            key={index}
            className="relative overflow-hidden bg-gradient-to-tr from-background to-primary/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 rounded-xl bg-muted text-muted-foreground">
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-base font-medium ${
                  stat.change.includes("-")
                    ? "text-destructive"
                    : "text-primary"
                }`}
              >
                {stat.change}
              </span>
            </div>

            <div className="h-30 flex justify-between gap-6 py-5">
              <div>
                <p className="text-3xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <h3 className="text-xs font-medium text-muted-foreground mb-1">
                  {stat.label}
                </h3>
              </div>

              <div className="w-full h-20 overflow-visible">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      }}
                      labelFormatter={() => ""}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <Link to={stat.link} className="text-sm text-primary">
              View detail
            </Link>
          </Card>
        );
      })}
    </div>
  );
}
