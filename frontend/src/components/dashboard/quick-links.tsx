import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  CreditCard,
  HandCoins,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

interface QuickLink {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

export function QuickLinks() {
  const links: QuickLink[] = [
    {
      title: "Add Transaction",
      description: "Record a new expense or income",
      icon: CreditCard,
      href: "/expenses",
      color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    },
    {
      title: "Budget Planning",
      description: "Set up or adjust your budgets",
      icon: TrendingUp,
      href: "/budget",
      color:
        "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
    },
    {
      title: "Savings Goals",
      description: "Track your savings progress",
      icon: HandCoins,
      href: "/savings",
      color:
        "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    },
    {
      title: "View Reports",
      description: "Analyze your financial data",
      icon: BarChart3,
      href: "/reports",
      color:
        "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Quick Links</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {links.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className="flex flex-col items-center p-5 px-4 rounded-lg border hover:bg-accent transition-colors"
            >
              <div
                className={`h-12 w-12 rounded-full ${link.color} flex items-center justify-center mb-4`}
              >
                <link.icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-medium text-center">
                {link.title}
              </div>
              <div className="text-xs text-muted-foreground text-center">
                {link.description}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
