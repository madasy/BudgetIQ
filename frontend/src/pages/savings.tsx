import { Layout } from "@/components/layout";
import { SavingsGoalsList } from "@/components/savings/savings-goals-list";
import { SavingsHeader } from "@/components/savings/savings-header";
import { SavingsOverview } from "@/components/savings/savings-overview";
import { SavingsTips } from "@/components/savings/savings-tips";

export default function SavingsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <SavingsHeader />
        <div className="grid gap-6 grid-cols-1 md:grid-cols-12 xl:grid-cols-12">
          <div className="md:col-span-12 lg:col-span-4 space-y-6">
            <SavingsOverview />
          </div>
          <div className="md:col-span-12 lg:col-span-8 space-y-6">
            <SavingsGoalsList />
            <SavingsTips />
          </div>
        </div>
      </div>
    </Layout>
  );
}
