import { BudgetHeader } from "@/components/budget/budget-header";
import { BudgetPlanningBoard } from "@/components/budget/budget-planning-board";
import { Layout } from "@/components/layout";
import { useState } from "react";

export default function BudgetPage() {
  const [refreshToken, setRefreshToken] = useState(0);

  return (
    <Layout>
      <div className="space-y-6">
        <BudgetHeader onCategoryAdded={() => setRefreshToken((value) => value + 1)} />
        <BudgetPlanningBoard refreshToken={refreshToken} />
      </div>
    </Layout>
  );
}
