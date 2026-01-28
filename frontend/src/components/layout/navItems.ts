import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  CreditCard,
  HandCoins,
  LayoutDashboard,
  LineChart,
  UploadCloud,
  ReceiptText,
  Settings,
  Settings2,
  TrendingUp,
  UserPen,
  Users,
} from "lucide-react";

// Define interface for navigation items
interface NavItem {
  name: string;
  icon: LucideIcon; // Type for Lucide React icons
  href: string;
  children?: NavItem[]; // Optional children array for nested items
}

// Centralized navigation items configuration
const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    name: "Budget Planning",
    icon: TrendingUp,
    href: "/budget",
  },
  {
    name: "Expenses",
    icon: CreditCard,
    href: "/expenses",
  },
  {
    name: "Imports",
    icon: ReceiptText,
    href: "/imports",
  },
  {
    name: "Investments",
    icon: TrendingUp,
    href: "/investments",
  },
  {
    name: "Savings Goals",
    icon: HandCoins,
    href: "/savings",
  },
  {
    name: "Accounts & Card",
    icon: Building2,
    href: "/accounts",
  },
  {
    name: "Investments",
    icon: LineChart,
    href: "/investments",
  },
  {
    name: "Import CSV",
    icon: UploadCloud,
    href: "/imports",
  },
  {
    name: "Reports",
    icon: BarChart3,
    href: "/reports",
  },
  {
    name: "Referrals",
    icon: Users,
    href: "/referrals",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    name: "Quick Links",
    href: "/settings",
    icon: Settings2,
    children: [
      { name: "Settings", href: "/settings", icon: UserPen },
      { name: "Documentation", href: "/docs", icon: ReceiptText },
    ],
  },
];

export default navItems;
