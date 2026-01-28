import { AddTransactionDialog } from "@/components/expenses/add-transaction-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function QuickAddButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="rounded-full h-14 w-14 fixed z-50 bottom-32 right-6 transition-all duration-300 shadow-lg"
              onClick={() => setOpen(true)}
            >
              <Plus className="h-6 w-6" />
              {/* <span className="sr-only">Add Transaction</span> */}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Transaction</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AddTransactionDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
