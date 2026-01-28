import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface ChartData {
  name: string;
  value: number;
  percent: number;
  color: string;
}

const expenseData: ChartData[] = [
  {
    name: "Housing & Utilities",
    value: 1800,
    percent: 40,
    color: "var(--chart-1)",
  },
  {
    name: "Food & Groceries",
    value: 900,
    percent: 20,
    color: "var(--chart-2)",
  },
  { name: "Education", value: 270, percent: 6, color: "var(--chart-3)" },
  { name: "Healthcare", value: 360, percent: 8, color: "var(--chart-4)" },
  { name: "Transportation", value: 450, percent: 10, color: "var(--chart-5)" },
  { name: "Entertainment", value: 270, percent: 6, color: "#9E9E9E" },
];

const incomeData: ChartData[] = [
  { name: "Salary", value: 4000, percent: 65, color: "#2A9D8F" },
  { name: "Revenue", value: 900, percent: 20, color: "#6FCF97" },
  { name: "Savings & Insurance", value: 450, percent: 10, color: "#FFB703" },
  { name: "Freelance/Side Hustle", value: 1200, percent: 20, color: "#E9C46A" },
  { name: "Investments", value: 700, percent: 11, color: "#F4A261" },
  { name: "Rental Income", value: 250, percent: 4, color: "#E76F51" },
];

export default function StatisticCard() {
  return (
    <Card className="">
      <Tabs defaultValue="expense" className="w-full">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Statistic</CardTitle>

            <TabsList className="h-8 w-fit rounded-full p-1">
              <TabsTrigger
                value="income"
                className="px-3 text-xs rounded-full data-[state=active]:bg-primary data-[state=active]:shadow"
              >
                Income
              </TabsTrigger>
              <TabsTrigger
                value="expense"
                className="px-3 text-xs rounded-full data-[state=active]:bg-primary data-[state=active]:shadow"
              >
                Expense
              </TabsTrigger>
            </TabsList>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded hover:bg-accent">
                  <MoreHorizontal className="h-5 w-5 text-accent-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Download Report</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <TabsContent value="income">
            <StatisticChart title="Total Income" data={incomeData} />
          </TabsContent>

          <TabsContent value="expense">
            <StatisticChart title="Total Expense" data={expenseData} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}

interface StatisticChartProps {
  title: string;
  data: ChartData[];
}

function StatisticChart({ title, data }: StatisticChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-52 mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-gray-500">{title}</p>
          <p className="text-xl font-bold">${total.toLocaleString()}</p>
        </div>
      </div>

      <div className="w-full space-y-5">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="w-10 px-2 py-0.5 rounded text-white text-xs font-medium text-center"
                style={{ backgroundColor: item.color }}
              >
                {item.percent}%
              </span>
              <span className="text-gray-500 truncate">{item.name}</span>
            </div>
            <span className="font-medium">${item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
