import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

export function EarningsOverview() {
  // Mock data
  const totalEarned = 50;
  const pendingEarnings = 20;
  const availableBalance = 30;
  const referralsCount = 5;
  const maxReferrals = 10;
  const referralsPercentage = (referralsCount / maxReferrals) * 100;

  const recentReferrals = [
    { name: "Sarah Johnson", status: "completed", reward: 10 },
    { name: "Michael Chen", status: "pending", reward: 10 },
    { name: "Emily Davis", status: "completed", reward: 10 },
    { name: "James Wilson", status: "pending", reward: 10 },
    { name: "Olivia Brown", status: "completed", reward: 10 },
  ];

  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-3">
        <CardTitle>Earnings Overview</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-10">
          <div className="space-y-3">
            <div className="flex justify-between font-medium text-sm">
              <span>Total Earned</span>
              <span>${totalEarned}</span>
            </div>
            <div className="flex justify-between font-medium text-sm">
              <span>Pending Earnings</span>
              <span>${pendingEarnings}</span>
            </div>
            <div className="flex justify-between font-medium text-sm">
              <span>Available Balance</span>
              <span>${availableBalance}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-medium text-sm">
              <span>Referrals Used</span>
              <span>
                {referralsCount} of {maxReferrals}
              </span>
            </div>
            <Progress value={referralsPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              You can refer up to {maxReferrals - referralsCount} more friends
              this year
            </p>
          </div>

          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div className="text-sm font-medium">Available Balance</div>
            <div className="text-2xl font-bold">${availableBalance}</div>
            <Button size="sm" className="w-full mt-2">
              Withdraw Funds
            </Button>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Recent Referrals</div>
            <div className="space-y-3">
              {recentReferrals.map((referral, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        referral.status === "completed"
                          ? "bg-primary"
                          : "bg-amber-500"
                      }`}
                    ></div>
                    <span>{referral.name}</span>
                  </div>
                  <span
                    className={
                      referral.status === "completed"
                        ? "text-green-600 dark:text-green-400"
                        : "text-muted-foreground"
                    }
                  >
                    {referral.status === "completed"
                      ? `+$${referral.reward}`
                      : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full">
            View All Referrals <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
