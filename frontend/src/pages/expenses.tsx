import ClientTransactionStats from "@/components/expenses/client-transaction-stats"
import { ExpensesHeader } from "@/components/expenses/expenses-header"
import { TransactionFilters } from "@/components/expenses/transaction-filters"
import TransactionsTable from "@/components/expenses/transactions"
import { UpcomingPayments } from "@/components/expenses/upcoming-payments"
import { Layout } from "@/components/layout"

export default function ExpensesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <ExpensesHeader />
        <div className="grid gap-6 grid-cols-12">
          <div className="col-span-12 xl:col-span-8 space-y-6">
            <TransactionFilters />
            <TransactionsTable />
            <UpcomingPayments />
          </div>
          <div className="col-span-12 xl:col-span-4 xl:order-1 sticky top-12">
            <ClientTransactionStats />
          </div>
        </div>
      </div>
    </Layout>
  )
}
