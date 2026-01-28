import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Jan", income: 2300, expenses: 1700 },
  { month: "Feb", income: 1900, expenses: 1850 },
  { month: "Mar", income: 2400, expenses: 1900 },
  { month: "Apr", income: 2900, expenses: 2200 },
  { month: "May", income: 2550, expenses: 2400 },
  { month: "Jun", income: 2800, expenses: 2300 },
  { month: "July", income: 3200, expenses: 2100 },
  { month: "Aug", income: 3200, expenses: 2300 },
  { month: "Sep", income: 3400, expenses: 2200 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-2)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-5)",
  },
};

export default function IncomeVsExpenses() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Income vs. Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[250px] sm:h-[300px] md:h-[330px] w-full overflow-x-auto xl:overflow-x-hidden"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            barCategoryGap={16}
            barGap={2}
            height={250}
            style={{ width: "100%" }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill={chartConfig.income.color} radius={10} />
            <Bar
              dataKey="expenses"
              fill={chartConfig.expenses.color}
              radius={10}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
