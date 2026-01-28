import { BudgetPerformance } from "@/components/dashboard/budget-performance";
import { DailyLimitCard } from "@/components/dashboard/daily-limit";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import MasterCard from "@/components/dashboard/master-card";
import QuickActions from "@/components/dashboard/quick-actions";
import RecentActivityCard from "@/components/dashboard/recent-activity";
import RecentTransactions2 from "@/components/dashboard/recent-transactions2";
import SavingPlans from "@/components/dashboard/saving-plans";
import StatCards from "@/components/dashboard/stat-cards";
import StatisticCard from "@/components/dashboard/statistic-card";
import { Layout } from "@/components/layout";
import IncomeVsExpenses from "@/components/reports/income-vs-expenses";
import MonthlyTrends from "@/components/reports/monthly-trends";

export default function Home() {
  return (
    <>
      <Layout>
        <div className="space-y-6 mx-auto">
          <DashboardHeader />

          {/* Top Section: Balance & Income vs Expenses */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <StatCards />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:order-1 lg:col-span-6 2xl:col-span-3 space-y-6">
              <StatisticCard />
              <DailyLimitCard />
              <QuickActions />
            </div>
            <div className="col-span-12 lg:order-3 lg:col-span-12 2xl:order-2 2xl:col-span-6 space-y-6">
              <IncomeVsExpenses />
              <MonthlyTrends />
            </div>
            <div className="col-span-12 lg:order-2 lg:col-span-6 2xl:col-span-3 space-y-6">
              <MasterCard />
              <RecentActivityCard />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6 md:order-1 xl:col-span-3 xl:order-1 space-y-6">
              <BudgetPerformance />
            </div>
            <div className="col-span-12 md:col-span-12 md:order-3 xl:col-span-6 xl:order-2 space-y-6">
              <RecentTransactions2 />
            </div>
            <div className="col-span-12 md:col-span-6 md:order-2 xl:col-span-3 xl:order-2 space-y-6">
              <SavingPlans />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
