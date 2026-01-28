import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Repeat } from "lucide-react";

type Payment = {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  daysLeft: number;
  category: string;
  status: string;
  recurring: boolean;
};

export function UpcomingPayments() {
  const upcomingPayments: Payment[] = [
    {
      id: 1,
      name: "Electric Bill",
      amount: 120.35,
      dueDate: "2024-05-25",
      daysLeft: 3,
      category: "Utilities",
      status: "due-soon",
      recurring: true,
    },
    {
      id: 2,
      name: "Internet Service",
      amount: 79.99,
      dueDate: "2024-05-28",
      daysLeft: 6,
      category: "Utilities",
      status: "upcoming",
      recurring: true,
    },
    {
      id: 3,
      name: "Tuition Fee",
      amount: 2500.0,
      dueDate: "2024-05-30",
      daysLeft: 8,
      category: "Education",
      status: "upcoming",
      recurring: false,
    },
    {
      id: 4,
      name: "Car Insurance",
      amount: 156.75,
      dueDate: "2024-06-01",
      daysLeft: 10,
      category: "Transportation",
      status: "upcoming",
      recurring: true,
    },
    {
      id: 5,
      name: "Gym Membership",
      amount: 45.0,
      dueDate: "2024-06-03",
      daysLeft: 12,
      category: "Health",
      status: "upcoming",
      recurring: true,
    },
  ];

  // Generate a badge based on days left
  const getStatusBadge = (daysLeft: number) => {
    if (daysLeft <= 3)
      return (
        <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white">
          Due Soon
        </Badge>
      );
    if (daysLeft <= 7)
      return (
        <Badge className="bg-yellow-400/10 text-yellow-600 hover:bg-yellow-500 hover:text-white">
          This Week
        </Badge>
      );
    return <Badge variant="outline">Upcoming</Badge>;
  };

  const getStatusColor = (daysLeft: number): string => {
    if (daysLeft <= 3) return "text-red-600 dark:text-red-400";
    if (daysLeft <= 7) return "text-amber-600 dark:text-amber-400";
    return "text-muted-foreground";
  };

  return (
    <Card className="rounded-lg bg-background/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Calendar className="h-5 w-5" />
          Upcoming Payments
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Bills due in the next 2 weeks
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {upcomingPayments.map((payment) => (
          <div
            key={payment.id}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-muted/30 transition-all"
          >
            {/* Left side */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center text-xs font-medium text-muted-foreground">
                <div
                  className={`flex items-center gap-1 ${getStatusColor(
                    payment.daysLeft
                  )}`}
                >
                  <Clock className="h-4 w-4" />
                  <span>{payment.daysLeft}d</span>
                </div>
                {/* Status badge */}
                <div className="mt-1">{getStatusBadge(payment.daysLeft)}</div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                  {payment.name}
                  {payment.recurring && (
                    <Badge
                      variant="secondary"
                      className="px-1.5 py-0.5 text-xs"
                    >
                      <Repeat className="h-3 w-3 mr-1" />
                      Recurring
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {payment.category} &bull; Due{" "}
                  {new Date(payment.dueDate).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* Right side (amount + Pay button) */}
            <div className="flex items-center gap-6">
              <div
                className={`text-lg font-bold transition-opacity group-hover:animate-pulse ${getStatusColor(
                  payment.daysLeft
                )}`}
              >
                ${payment.amount.toFixed(2)}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap text-xs"
              >
                Pay Now
              </Button>
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="pt-4 mt-2 flex flex-col sm:flex-row sm:items-center justify-between border-t border-border">
          <div className="text-sm text-muted-foreground pt-2">
            Total upcoming:{" "}
            <span className="font-medium text-foreground">
              $
              {upcomingPayments
                .reduce((sum, p) => sum + p.amount, 0)
                .toFixed(2)}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="mt-2 sm:mt-0">
            View All Bills
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
