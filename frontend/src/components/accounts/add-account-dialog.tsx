import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccountAdded: () => void;
}

export function AddAccountDialog({
  open,
  onOpenChange,
  onAccountAdded,
}: AddAccountDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [accountName, setAccountName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleManualAdd = async () => {
    if (!accountName.trim()) {
      setStatusMessage("Add an account name to continue.");
      return;
    }
    setIsLoading(true);
    setStatusMessage("");
    try {
      await apiFetch("/accounts", {
        method: "POST",
        body: JSON.stringify({
          name: accountName.trim(),
          account_type: accountType || null,
        }),
      });
      onAccountAdded();
      setAccountName("");
      setAccountType("");
      onOpenChange(false);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Failed to add account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Add Bank Account or Card
          </DialogTitle>
          <DialogDescription>
            Add an account manually. Everything is saved to your BudgetIQ database.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type</Label>
            <Select value={accountType} onValueChange={setAccountType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Account</SelectItem>
                <SelectItem value="savings">Savings Account</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="investment">Investment Account</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountName">Account Name</Label>
            <Input
              id="accountName"
              placeholder="e.g., Household Checking"
              value={accountName}
              onChange={(event) => setAccountName(event.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleManualAdd}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Account
          </Button>
        </DialogFooter>
        {statusMessage ? (
          <p className="text-sm text-muted-foreground">{statusMessage}</p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
