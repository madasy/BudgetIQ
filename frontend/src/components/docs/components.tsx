import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { DocPage } from "./doc-page";

const docComponents = [
  {
    title: "UI Primitives (Shadcn)",
    items: [
      "Accordion", "AlertDialog", "Avatar", "Badge", "Button", "Calendar", "Card", 
      "Carousel", "Chart", "Checkbox", "Command", "Dialog", "Drawer", "DropdownMenu", 
      "Form", "Input", "Label", "Menubar", "NavigationMenu", "Popover", "Progress", 
      "RadioGroup", "ScrollArea", "Select", "Sheet", "Sidebar", "Skeleton", "Slider", 
      "Sonner", "Switch", "Table", "Tabs", "Textarea", "Tooltip"
    ],
  },
  {
    title: "Dashboard Widgets",
    items: [
      "BalanceOverview", "BudgetPerformance", "DashboardHeader", "GoalsOverview", 
      "QuickActions", "RecentActivity", "RecentTransactions", "SavingPlans", 
      "StatCards", "VisaCard"
    ],
  },
  {
    title: "Layout Components",
    items: [
      "Header", "Sidebar", "Footer", "QuickAddButton", "SearchDialog", "SupportChat"
    ],
  },
];

export default function ComponentsPage() {
  return (
    <DocPage
      title="Components"
      description="Reusable building blocks for your application."
    >
      <div className="space-y-10 pb-16">
        <section className="rounded-3xl border bg-card p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-semibold">
                Available Components
              </h2>
              <p className="text-sm text-muted-foreground">
                BudgetIQ React comes with a rich library of pre-built components.
              </p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Rocket className="h-3.5 w-3.5" />
              Ready to reuse
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-1">
            {docComponents.map((group) => (
              <Card key={group.title}>
                <CardHeader>
                  <CardTitle className="text-base">{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="space-y-5">
          <h2 className="text-2xl font-semibold tracking-tight">
            Using Components
          </h2>
          <p>
            All UI elements are structured as individual components located inside
            the <code>src/components</code> folder.
          </p>

          <h3 className="text-xl font-medium pt-2">Importing</h3>
          <p className="text-muted-foreground text-sm">
            You can import components using the <code>@/components</code> alias:
          </p>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>import &#123; Button &#125; from "@/components/ui/button"</code>
          </pre>

          <h3 className="text-xl font-medium pt-4">Customizing</h3>
          <p>
            Since the components are built with Tailwind CSS and Radix UI (via Shadcn), 
            you can easily customize their appearance by modifying the classes in the component file 
            or by passing a <code>className</code> prop.
          </p>

          <div className="flex gap-4 pt-6">
            <Button asChild>
              <Link to="/docs/routing">Next: Routing</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/docs/configuration/theme-config">Back to Customization</Link>
            </Button>
          </div>
        </div>
      </div>
    </DocPage>
  );
}
