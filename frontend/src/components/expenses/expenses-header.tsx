import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { AddTransactionDialog } from "./add-transaction-dialog";

export function ExpensesHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-start md:items-center gap-3">
      <div>
        <h1 className="text-xl font-semibold tracking-wide">Expenses</h1>
        <p className="text-sm text-muted-foreground tracking-wide"></p>
      </div>
      <Button onClick={() => setOpen(true)} size="sm" className="width-fit">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Transaction
      </Button>
      <AddTransactionDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
