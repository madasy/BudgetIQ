import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { useState } from "react";

// Add prop types for TypeScript
interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock search results
  const results = searchQuery
    ? [
        {
          type: "Transaction",
          title: "Grocery Shopping",
          date: "May 15, 2024",
          amount: "$85.50",
        },
        {
          type: "Budget",
          title: "Food & Dining",
          date: "May 2024",
          amount: "$450.00",
        },
        {
          type: "Savings Goal",
          title: "Vacation Fund",
          date: "Target: Dec 2024",
          amount: "$2,500.00",
        },
      ]
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions, budgets, or goals..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <ScrollArea className="h-[300px]">
            {results.length > 0 ? (
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-md hover:bg-accent cursor-pointer"
                    onClick={() => onOpenChange(false)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm font-medium">
                          {result.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {result.type} • {result.date}
                        </div>
                      </div>
                      <div className="text-sm font-medium">{result.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-8 text-muted-foreground">
                {`No results found for "${searchQuery}"`}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Start typing to search...
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
