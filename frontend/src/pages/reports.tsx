import { BudgetAnalysis } from "@/components/budget/budget-analysis";
import { Layout } from "@/components/layout";
import ExpensesByCategory from "@/components/reports/expenses-by-category";
import IncomeVsExpenses from "@/components/reports/income-vs-expenses";
import MonthlySavings from "@/components/reports/monthly-savings";
import MonthlyTrends from "@/components/reports/monthly-trends";
import { ReportsHeader } from "@/components/reports/reports-header";

export default function ReportsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <ReportsHeader />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <ExpensesByCategory />
            <BudgetAnalysis />
          </div>
          <div className="lg:col-span-7 space-y-6">
            <MonthlyTrends />
            <IncomeVsExpenses />
            <MonthlySavings />
          </div>
        </div>
      </div>
    </Layout>
  );
}
