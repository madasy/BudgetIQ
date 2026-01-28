import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart data
const chartData = [
  { month: "January", income: 2000, savings: 550, target: 750 },
  { month: "February", income: 1800, savings: 200, target: 750 },
  { month: "March", income: 2800, savings: 600, target: 750 },
  { month: "April", income: 1900, savings: 350, target: 750 },
  { month: "May", income: 2900, savings: 1200, target: 750 },
  { month: "June", income: 2100, savings: 200, target: 750 },
  { month: "July", income: 2000, savings: 550, target: 750 },
  { month: "August", income: 1800, savings: 200, target: 750 },
  { month: "September", income: 2800, savings: 600, target: 750 },
  { month: "October", income: 1900, savings: 350, target: 750 },
  { month: "November", income: 2900, savings: 1200, target: 750 },
  { month: "December", income: 2100, savings: 200, target: 750 },
];

// Color configuration
const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-3)",
  },
  savings: {
    label: "Savings",
    color: "var(--chart-5)",
  },
  target: {
    label: "Target",
    color: "var(--chart-1)",
  },
};

export default function MonthlySavings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Savings vs Target</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[250px] sm:h-[300px] md:h-[350px] w-full min-w-0"
          style={{ maxWidth: "100%", overflowX: "auto" }}
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
            width={600}
            height={250}
            style={{ width: "100%", minWidth: "250px" }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={50}
              tickMargin={10}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="income"
              type="monotone"
              stroke={chartConfig.income.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="savings"
              type="monotone"
              stroke={chartConfig.savings.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="target"
              type="monotone"
              stroke={chartConfig.target.color}
              strokeWidth={2}
              dot={{ r: 3 }}
              strokeDasharray="4 4"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
