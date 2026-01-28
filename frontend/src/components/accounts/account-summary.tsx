import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Account {
  id: number;
  account_type?: string | null;
}

interface Transaction {
  id: number;
  account_id: number;
  type: string;
  amount: number;
}

interface AccountSummaryProps {
  refreshToken: number;
}

export function AccountSummary({ refreshToken }: AccountSummaryProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const load = async () => {
      const [accountData, transactionData] = await Promise.all([
        apiFetch<Account[]>("/accounts"),
        apiFetch<Transaction[]>("/transactions"),
      ]);
      setAccounts(accountData);
      setTransactions(transactionData);
    };
    load();
  }, [refreshToken]);

  const summary = useMemo(() => {
    const totals = new Map<number, number>();
    accounts.forEach((account) => totals.set(account.id, 0));
    transactions.forEach((tx) => {
      const delta = tx.type === "income" ? Number(tx.amount) : -Number(tx.amount);
      totals.set(tx.account_id, (totals.get(tx.account_id) || 0) + delta);
    });

    let totalAssets = 0;
    let totalLiabilities = 0;
    accounts.forEach((account) => {
      const balance = totals.get(account.id) || 0;
      if (account.account_type?.toLowerCase().includes("credit")) {
        totalLiabilities += Math.abs(balance);
      } else if (balance >= 0) {
        totalAssets += balance;
      } else {
        totalLiabilities += Math.abs(balance);
      }
    });
    const netWorth = totalAssets - totalLiabilities;
    const changePercentage = totalAssets ? (netWorth / totalAssets) * 100 : 0;
    return { totalAssets, totalLiabilities, netWorth, changePercentage };
  }, [accounts, transactions]);

  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-3">
        <CardTitle>Account Summary</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-10">
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-sm font-medium">
              <span>Total Assets</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                CHF {summary.totalAssets.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Total Liabilities</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                CHF {summary.totalLiabilities.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-semibold tracking-wide pt-2 border-t">
              <span>Net Worth</span>
              <span className="text-green-600 dark:text-green-400">
                CHF {summary.netWorth.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-wide">
                Monthly Change
              </span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {summary.changePercentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              CHF {summary.netWorth.toFixed(2)}
            </div>
            <Progress value={Math.min(summary.changePercentage * 10, 100)} className="h-1" />
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold tracking-wide">
              Account Distribution
            </div>
            <div className="space-y-5">
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Checking</span>
                  <span>52%</span>
                </div>
                <Progress value={52} className="h-1" />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Savings</span>
                  <span>47%</span>
                </div>
                <Progress value={47} className="h-1" />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Credit</span>
                  <span>1%</span>
                </div>
                <Progress value={1} className="h-1" />
              </div>
            </div>
          </div>

          <div className="rounded-lg text-center bg-muted p-4 space-y-3">
            <div className="text-base font-medium">Credit Utilization</div>
            <div className="text-2xl font-bold">12.5%</div>
            <div className="text-xs">Excellent! Keep it under 30%</div>
            <Progress value={12.5} className="h-1 bg-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
