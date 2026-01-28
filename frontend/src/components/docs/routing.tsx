import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { DocPage } from "./doc-page";

const moduleCatalog = [
  {
    route: "/",
    name: "Dashboard",
    description: "Executive overview with KPIs, trends, and card stack.",
    components: ["DashboardHeader", "StatCards", "RecentTransactions2"],
  },
  {
    route: "/budget",
    name: "Budget Planning",
    description: "Category allocations, summaries, and AI suggestions.",
    components: ["BudgetHeader", "BudgetSummary", "BudgetCategories"],
  },
  {
    route: "/expenses",
    name: "Expenses",
    description: "Filterable ledger, transaction stats, and upcoming dues.",
    components: ["TransactionFilters", "TransactionsTable", "UpcomingPayments"],
  },
  {
    route: "/savings",
    name: "Savings",
    description: "Goal tracking, contributions, and actionable guidance.",
    components: ["SavingsHeader", "SavingsOverview", "SavingsGoalsList"],
  },
  {
    route: "/accounts",
    name: "Accounts & Cards",
    description: "Card vault, linked institutions, and risk posture.",
    components: ["AccountsHeader", "LinkedAccounts", "AccountSummary"],
  },
  {
    route: "/reports",
    name: "Reports",
    description: "Longitudinal finance trends and comparative charts.",
    components: ["ReportsHeader", "MonthlyTrends", "IncomeVsExpenses"],
  },
  {
    route: "/referrals",
    name: "Referrals",
    description: "Referral sharing, how-it-works, and earnings insights.",
    components: ["ReferralsHeader", "ReferralsLink", "EarningsOverview"],
  },
  {
    route: "/notifications",
    name: "Notifications",
    description: "System alerts filtered via tabs with semantic styling.",
    components: ["Tabs", "Card", "statusMap badges"],
  },
  {
    route: "/settings",
    name: "Settings",
    description: "Profile, app, security, and resource tabs.",
    components: ["SettingsHeader", "SettingsTabs", "Radix tabs"],
  },
  {
    route: "/demo",
    name: "Marketing Demo",
    description: "Public landing showcasing product narratives.",
    components: ["Hero", "Feature grid", "Reviews carousel"],
  },
];

export default function RoutingPage() {
  return (
    <DocPage
      title="Routing"
      description="Explore the application's page structure."
    >
      <div className="space-y-10 pb-16">
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              React Router Setup
            </h2>
            <p className="text-muted-foreground mb-4">
              BudgetIQ React uses <strong>React Router DOM v7</strong> for client-side routing. The router is configured in <code>src/App.tsx</code> using <code>BrowserRouter</code> with nested routes and layout grouping.
            </p>
            <div className="bg-muted p-4 rounded-md mb-6">
              <p className="text-sm font-medium mb-2">Key Features:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                <li>Nested routes for documentation pages</li>
                <li>Layout grouping with <code>RootLayout</code> component</li>
                <li>Programmatic navigation with <code>useNavigate</code> hook</li>
                <li>Active route detection with <code>useLocation</code> hook</li>
                <li>Type-safe routing with TypeScript</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Routing Process
            </h2>
            <p className="text-muted-foreground">
              Understanding how pages are routed in BudgetIQ React:
            </p>
            
            <div className="space-y-3">
              <div className="border-l-4 border-primary pl-4 py-2">
                <h3 className="font-semibold mb-1">1. Route Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  All routes are defined in <code>src/App.tsx</code> using React Router's <code>Routes</code> and <code>Route</code> components. 
                  The <code>BrowserRouter</code> wraps the entire application to enable client-side routing.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4 py-2">
                <h3 className="font-semibold mb-1">2. Layout Wrapping</h3>
                <p className="text-sm text-muted-foreground">
                  The <code>RootLayout</code> component wraps all routes, providing consistent header, sidebar, and footer across pages. 
                  This ensures a unified user experience without repeating layout code.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4 py-2">
                <h3 className="font-semibold mb-1">3. Nested Routes</h3>
                <p className="text-sm text-muted-foreground">
                  Documentation pages use nested routing. The <code>/docs</code> route renders the <code>Docs</code> component, 
                  which contains an <code>Outlet</code> that displays child routes like <code>/docs/introduction</code> or <code>/docs/installation</code>.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4 py-2">
                <h3 className="font-semibold mb-1">4. Navigation</h3>
                <p className="text-sm text-muted-foreground">
                  Navigation happens via <code>Link</code> components or programmatically using <code>useNavigate()</code>. 
                  React Router handles URL changes without full page reloads, providing a smooth SPA experience.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4 py-2">
                <h3 className="font-semibold mb-1">5. Route Matching</h3>
                <p className="text-sm text-muted-foreground">
                  When a URL is accessed, React Router matches it against defined routes and renders the corresponding component. 
                  The <code>useLocation</code> hook provides the current route information for active state management.
                </p>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-md mt-4">
              <p className="text-sm font-medium mb-2">Example Flow:</p>
              <pre className="text-xs overflow-x-auto">
                <code>{`User clicks link → React Router matches URL → 
Component renders → Layout wraps content → 
Page displays with navigation active state`}</code>
              </pre>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-semibold">Page catalog</h2>
              <p className="text-sm text-muted-foreground">
                Each entry lists its route, intent, and the hero components it
                composes.
              </p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              Router aware
            </Badge>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Page</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Key components</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {moduleCatalog.map((module) => (
                  <TableRow key={module.route}>
                    <TableCell>
                      <code>{module.route}</code>
                    </TableCell>
                    <TableCell className="font-medium">{module.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {module.description}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {module.components.join(", ")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        <div className="flex gap-4 pt-6">
          <Button asChild>
            <Link to="/docs/release">Next: Release</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/docs/components">Back to Components</Link>
          </Button>
        </div>
      </div>
    </DocPage>
  );
}
