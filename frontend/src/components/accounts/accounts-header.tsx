import { AddAccountDialog } from "@/components/accounts/add-account-dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface AccountsHeaderProps {
  onAccountAdded: () => void;
}

export function AccountsHeader({ onAccountAdded }: AccountsHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-wide">
            Bank Accounts & Cards
          </h1>
          <p className="text-sm text-muted-foreground flex items-center tracking-wide">
            Track your accounts and balances in one place
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Account or Card
        </Button>
      </div>
      <AddAccountDialog open={open} onOpenChange={setOpen} onAccountAdded={onAccountAdded} />
    </>
  );
}
