import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function ExpensesByCategory() {
  const data = [
    { name: "Housing", value: 1200, color: "#264653" },
    { name: "Food & Dining", value: 350, color: "#6FCF97" },
    { name: "Entertainment", value: 150, color: "#E9C46A" },
    { name: "Utilities", value: 120, color: "#F4A261" },
    { name: "Transportation", value: 180, color: "#FFB703" },
    { name: "Shopping", value: 200, color: "#E76F51" },
  ];

  const totalExpenses = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Expenses by Category</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      <CardContent>
        <div className="relative h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `$${value}`}
                contentStyle={{ borderRadius: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-2xl font-bold">${totalExpenses}</div>
            <div className="text-sm text-muted-foreground">Total Expenses</div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm">{entry.name}</span>
              </div>
              <div className="text-xs font-medium">
                ${entry.value} (
                {Math.round((entry.value / totalExpenses) * 100)}%)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
