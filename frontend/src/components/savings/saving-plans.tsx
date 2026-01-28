import { User } from "lucide-react";
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

// 🟢 Define types for clarity
type SavingPlan = {
  id: number;
  name: string;
  amount: number;
  goal: number;
  status: string;
};

type BalanceData = {
  month: string;
  value: number;
};

// 🟢 Static mock data
const savingPlans: SavingPlan[] = [
  {
    id: 1,
    name: "Emergency Fund",
    amount: 6000,
    goal: 10000,
    status: "In Progress",
  },
  {
    id: 2,
    name: "Vacation Fund",
    amount: 3000,
    goal: 5000,
    status: "In Progress",
  },
  {
    id: 3,
    name: "Retirement Fund",
    amount: 5600,
    goal: 20000,
    status: "In Progress",
  },
  {
    id: 4,
    name: "Home Down Payment",
    amount: 25000,
    goal: 25000,
    status: "Completed",
  },
  {
    id: 5,
    name: "Education Fund (for children)",
    amount: 6000,
    goal: 15000,
    status: "In Progress",
  },
  {
    id: 6,
    name: "Car Replacement Fund",
    amount: 2000,
    goal: 8000,
    status: "Behind Schedule",
  },
];

const balanceData: BalanceData[] = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 1500 },
  { month: "Mar", value: 2000 },
  { month: "Apr", value: 3500 },
  { month: "May", value: 3000 },
  { month: "Jun", value: 3875 },
  { month: "Jul", value: 3100 },
  { month: "Aug", value: 3600 },
  { month: "Sep", value: 4200 },
  { month: "Oct", value: 4700 },
  { month: "Nov", value: 5200 },
  { month: "Dec", value: 5800 },
];

export default function SavingPlans() {
  const [activePlan, setActivePlan] = useState<SavingPlan>(savingPlans[1]); // Default Vacation Fund

  const percentage = Math.round((activePlan.amount / activePlan.goal) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="col-span-1 bg-white rounded-2xl shadow p-4 space-y-4">
        <h2 className="text-lg font-semibold">Saving Plans</h2>
        {savingPlans.map((plan) => {
          const progress = Math.round((plan.amount / plan.goal) * 100);
          return (
            <div
              key={plan.id}
              className={`p-3 rounded-xl border cursor-pointer transition ${
                activePlan.id === plan.id
                  ? "bg-green-50 border-green-400"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => setActivePlan(plan)}
            >
              <div className="flex justify-between text-sm font-medium">
                <span>{plan.name}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                ${plan.amount.toLocaleString()} / ${plan.goal.toLocaleString()}{" "}
                <span className="ml-2 text-green-600">{plan.status}</span>
              </p>
            </div>
          );
        })}
        <button className="w-full mt-3 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
          + Add Plan
        </button>
      </div>

      {/* Right Column */}
      <div className="col-span-2 space-y-6">
        {/* Selected Plan Details */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <h3 className="text-xl font-semibold">{activePlan.name}</h3>
          <p className="text-2xl font-bold text-green-700">
            ${activePlan.amount.toLocaleString()}{" "}
            <span className="text-gray-500 text-lg">
              / ${activePlan.goal.toLocaleString()}
            </span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">
            {percentage}% - {activePlan.status}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <User className="w-6 h-6 text-green-600" />
            <p className="text-gray-700 text-sm">
              Members: Andrew Forbist, Sarah Connors, Mike Johnson
            </p>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mt-3">
            <p>
              Due Date: <span className="font-medium">31 December, 2028</span>
            </p>
            <p>
              Remaining: <span className="font-medium">95 days</span>
            </p>
          </div>
        </div>

        {/* Saving Tips */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-3">
          <h4 className="font-semibold">Saving Tips</h4>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Mission: Save $21 per day for 95 days to meet goal.</li>
            <li>Cut unnecessary subscriptions, save more.</li>
            <li>Skip eating out twice a week.</li>
            <li>Automate savings from paycheck.</li>
          </ul>
        </div>

        {/* Balance Chart */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">Balance</h4>
            <span className="text-sm text-gray-500">This Year</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={balanceData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={2}
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
