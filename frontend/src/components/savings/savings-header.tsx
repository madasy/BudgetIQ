import { AddSavingsGoalDialog } from "@/components/savings/add-savings-goal-dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export function SavingsHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-xl font-semibold tracking-wide">Saving Goals</h1>
      </div>
      <Button onClick={() => setOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Goal
      </Button>
      <AddSavingsGoalDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
