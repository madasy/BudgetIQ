import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2,
  CreditCard,
  Eye,
  EyeOff,
  MoreHorizontal,
  RefreshCw,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Account {
  id: number;
  name: string;
  account_type?: string | null;
}

interface Transaction {
  id: number;
  account_id: number;
  type: string;
  amount: number;
}

interface LinkedAccountsProps {
  refreshToken: number;
}

export function LinkedAccounts({ refreshToken }: LinkedAccountsProps) {
  const [showBalances, setShowBalances] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [accountData, transactionData] = await Promise.all([
          apiFetch<Account[]>("/accounts"),
          apiFetch<Transaction[]>("/transactions"),
        ]);
        setAccounts(accountData);
        setTransactions(transactionData);
      } catch (error) {
        setStatusMessage(error instanceof Error ? error.message : "Failed to load accounts");
      }
    };
    load();
  }, [refreshToken]);

  const balances = useMemo(() => {
    const totals = new Map<number, number>();
    accounts.forEach((account) => totals.set(account.id, 0));
    transactions.forEach((tx) => {
      const delta = tx.type === "income" ? Number(tx.amount) : -Number(tx.amount);
      totals.set(tx.account_id, (totals.get(tx.account_id) || 0) + delta);
    });
    return totals;
  }, [accounts, transactions]);

  const getAccountTypeColor = (type?: string | null) => {
    const normalized = type?.toLowerCase() || "bank";
    if (normalized.includes("credit")) {
      return "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300";
    }
    if (normalized.includes("savings")) {
      return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300";
    }
    return "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300";
  };

  const getAccountIcon = (type?: string | null): LucideIcon => {
    const normalized = type?.toLowerCase() || "";
    if (normalized.includes("credit")) {
      return CreditCard;
    }
    if (normalized.includes("wallet")) {
      return Wallet;
    }
    return Building2;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="space-y-1.5">
            <CardTitle>Linked Accounts</CardTitle>
            <CardDescription>
              Manage your connected bank accounts and credit cards
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
          >
            {showBalances ? (
              <EyeOff className="h-5 w-5 mr-2" />
            ) : (
              <Eye className="h-5 w-5 mr-2" />
            )}
            {showBalances ? "Hide" : "Show"} Balances
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accounts.map((account) => {
            const Icon = getAccountIcon(account.account_type);
            const balance = balances.get(account.id) || 0;
            return (
            <div
              key={account.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-5">
                <div
                  className={`h-14 w-14 rounded-full ${getAccountTypeColor(
                    account.account_type
                  )} flex items-center justify-center`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{account.name}</span>
                    <Badge variant="secondary">Synced</Badge>
                  </div>
                  <div className="">
                    <div className="text-xs text-muted-foreground">
                      Type: {account.account_type || "bank"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    {showBalances ? (
                      account.account_type?.toLowerCase().includes("credit") ? (
                        <span className="text-red-600 dark:text-red-400">
                          CHF {Math.abs(balance).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-green-600 dark:text-green-400">
                          CHF {balance.toFixed(2)}
                        </span>
                      )
                    ) : (
                      "••••••"
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {account.account_type || "account"}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setStatusMessage("Refresh is not available yet.")}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Account</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )})}
        </div>
        {statusMessage ? (
          <p className="text-xs text-muted-foreground mt-4">{statusMessage}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
