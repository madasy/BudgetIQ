import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { LucideIcon } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

// Define the Goal type
interface Goal {
  id: string | number;
  name: string;
  color: string; // Tailwind color class like 'bg-blue-500'
  icon: LucideIcon; // Lucide icon component
  current: number;
  target: number;
  percentage: number;
}

// Define the component props type
interface AddContributionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalId?: string | number;
  goals?: Goal[];
}

export function AddContributionDialog({
  open,
  onOpenChange,
  goalId,
  goals = [],
}: AddContributionDialogProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedGoal = goals.find((goal) => goal.id === goalId) ?? null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Contribution</DialogTitle>
          <DialogDescription>
            {selectedGoal
              ? `Add a contribution to your ${selectedGoal.name} goal`
              : "Add a contribution to your goal"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {selectedGoal && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <div
                className={`h-10 w-10 rounded-full ${selectedGoal.color} flex items-center justify-center`}
              >
                {/* Properly render icon */}
                <selectedGoal.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">{selectedGoal.name}</div>
                <div className="text-sm text-muted-foreground">
                  ${selectedGoal.current.toLocaleString()} of $
                  {selectedGoal.target.toLocaleString()} (
                  {selectedGoal.percentage}%)
                </div>
              </div>
            </div>
          )}

          {/* Amount input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Contribution Amount</Label>
            <Input id="amount" placeholder="0.00" type="number" />
          </div>

          {/* Date picker */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea id="notes" placeholder="Add any additional details" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add Contribution</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
