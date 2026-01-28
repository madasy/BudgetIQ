import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Gift, UserPlus } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "Invite Friends",
      description: "Share your unique referral link with friends and family",
      icon: UserPlus,
      color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    },
    {
      title: "They Sign Up",
      description:
        "When they create an account using your link, you both qualify for rewards",
      icon: CreditCard,
      color:
        "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
    },
    {
      title: "Earn Rewards",
      description:
        "You'll receive $10 credit for each friend who signs up and uses the app",
      icon: Gift,
      color:
        "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>How It Works</CardTitle>
        <CardDescription>
          Simple steps to earn rewards through referrals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3 py-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-4">
                <div
                  className={`h-16 w-16 rounded-full ${step.color} flex items-center justify-center`}
                >
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="absolute top-0 right-0 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-lg bg-muted">
          <h3 className="font-medium mb-2">Referral Program Terms</h3>
          <ul className="text-sm text-gray-600 space-y-2 list-decimal pl-5">
            <li>
              Referral rewards are credited after your friend has been active
              for 30 days
            </li>
            <li>Maximum of 10 successful referrals per calendar year</li>
            <li>Both you and your friend must have active accounts</li>
            <li>
              Credits can be used towards premium features or withdrawn to your
              bank account
            </li>
            <li>
              FinTrack reserves the right to modify or terminate the referral
              program at any time
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
