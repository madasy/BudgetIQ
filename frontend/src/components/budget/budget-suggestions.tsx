import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";

interface Suggestion {
  category: string;
  message: string;
  type: "reduce" | "increase";
  amount: number;
}

export function BudgetSuggestions() {
  const suggestions: Suggestion[] = [
    {
      category: "Entertainment",
      message: "You're consistently over budget. Consider reducing by $30.",
      type: "reduce",
      amount: 30,
    },
    {
      category: "Shopping",
      message:
        "You've been under budget for 3 months. You could allocate more.",
      type: "increase",
      amount: 50,
    },
    {
      category: "Food & Dining",
      message:
        "Your spending is increasing. Consider setting a stricter limit.",
      type: "reduce",
      amount: 25,
    },
    {
      category: "Housing",
      message: "You're consistently over budget. Consider reducing by $30.",
      type: "reduce",
      amount: 30,
    },
    {
      category: "Food & Dining",
      message:
        "You've been under budget for 3 months. You could allocate more.",
      type: "increase",
      amount: 50,
    },
  ];

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Budget Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border p-4 rounded-xl hover:shadow-sm transition"
            >
              {/* Left content */}
              <div className="flex items-start gap-3">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                    suggestion.type === "reduce"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {suggestion.type === "reduce" ? (
                    <TrendingDown className="h-5 w-5" />
                  ) : (
                    <TrendingUp className="h-5 w-5" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="font-medium">{suggestion.category}</div>
                  <div className="text-sm text-muted-foreground">
                    {suggestion.message}
                  </div>
                </div>
              </div>

              {/* Right content */}
              <div className="flex items-center justify-between sm:justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="group transition bg-transparent"
                >
                  Apply
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
