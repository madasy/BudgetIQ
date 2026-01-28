import { BudgetCategories } from "@/components/budget/budget-categories";
import { BudgetHeader } from "@/components/budget/budget-header";
import { BudgetSuggestions } from "@/components/budget/budget-suggestions";
import { BudgetSummary } from "@/components/budget/budget-summary";
import { Layout } from "@/components/layout";

export default function BudgetPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <BudgetHeader />
        <div className="grid gap-6 xl:grid-cols-12">
          <div className="xl:order-1 xl:col-span-4">
            <BudgetSummary />
          </div>
          <div className="xl:order-2 xl:col-span-8 space-y-6">
            <BudgetCategories />
            <BudgetSuggestions />
          </div>
        </div>
      </div>
    </Layout>
  );
}
