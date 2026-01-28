import { Card } from "@/components/ui/card";
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
  icon: LucideIcon;
  to: string;
}

export default function QuickActions() {
  const links: QuickLink[] = [
    {
      title: "Transaction",
      icon: CreditCard,
      to: "/expenses",
    },
    {
      title: "Budget",
      icon: TrendingUp,
      to: "/budget",
    },
    {
      title: "Goals",
      icon: HandCoins,
      to: "/savings",
    },
    {
      title: "Reports",
      icon: BarChart3,
      to: "/reports",
    },
  ];

  return (
    <Card className="rounded-2xl shadow-none border overflow-hidden">
      <div className="flex items-center justify-between">
        {links.map((link, idx) => (
          <div
            className="border-r border-secondary/30 last:border-none w-full"
            key={idx}
          >
            <Link
              key={link.title}
              to={link.to}
              className="group flex-1 flex flex-col space-y-2 items-center bg-secondary text-secondary-foreground hover:text-accent-foreground hover:bg-secondary/30  px-2 py-3"
            >
              <link.icon className="w-7 h-7 group-hover:scale-105 transition-transform duration-500" />
              <span className="text-sm font-medium text-center tracking-wide">
                {link.title}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}
