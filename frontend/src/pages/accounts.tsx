import { AccountSummary } from "@/components/accounts/account-summary";
import { AccountsHeader } from "@/components/accounts/accounts-header";
import { LinkedAccounts } from "@/components/accounts/linked-accounts";
import { Layout } from "@/components/layout";
import { useState } from "react";

export default function AccountsPage() {
  const [refreshToken, setRefreshToken] = useState(0);
  return (
    <Layout>
      <div className="space-y-6">
        <AccountsHeader onAccountAdded={() => setRefreshToken((prev) => prev + 1)} />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LinkedAccounts refreshToken={refreshToken} />
          </div>
          <div>
            <AccountSummary refreshToken={refreshToken} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
