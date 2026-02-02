import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { AddCategoryDialog } from "./add-category-dialog";

interface BudgetHeaderProps {
  onCategoryAdded?: () => void;
}

export function BudgetHeader({ onCategoryAdded }: BudgetHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-wide">
            Budget Planning
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="may2024">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="may2024">May 2024</SelectItem>
              <SelectItem value="jun2024">June 2024</SelectItem>
              <SelectItem value="jul2024">July 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setOpen(true)}>Add Category</Button>
        </div>
      </div>
      <AddCategoryDialog open={open} onOpenChange={setOpen} onCategoryAdded={onCategoryAdded} />
    </>
  );
}
