import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lightbulb } from "lucide-react";

export function SavingsTips() {
  const tips = [
    {
      title: "50/30/20 Rule",
      description:
        "Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.",
    },
    {
      title: "Automate Your Savings",
      description:
        "Set up automatic transfers to your savings account on payday to ensure consistent saving.",
    },
    {
      title: "Cut Unnecessary Subscriptions",
      description:
        "Review your monthly subscriptions and cancel those you rarely use to save money.",
    },
    {
      title: "Set Specific Goals",
      description:
        "Define clear savings goals like a vacation, emergency fund, or new car to stay motivated.",
    },
    {
      title: "Track Your Expenses",
      description:
        "Regularly monitor your spending habits to identify areas where you can cut costs and save more.",
    },
  ];

  return (
    <Card className="sticky top-12">
      <CardHeader className="pb-3">
        <CardTitle>Saving Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div
              className="flex items-start gap-5 p-3 rounded-lg border"
              key={index}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="font-medium">{tip.title}</div>
                <div className="text-sm text-muted-foreground">
                  {tip.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline">
            View More Tips <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
