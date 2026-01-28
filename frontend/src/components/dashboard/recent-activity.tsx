import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import User1 from "/images/user1.png";
import User2 from "/images/user2.png";
import User3 from "/images/user3.png";
// import { FC } from "react";

interface Activity {
  id: number;
  name: string;
  action: string;
  time: string;
  avatar: string; // string instead of StaticImageData (works with Vite imports)
}

interface Activities {
  today: Activity[];
  yesterday: Activity[];
}

const activities: Activities = {
  today: [
    {
      id: 1,
      name: "Sarah Parker",
      action: "added a new expense in Food & Drink",
      time: "15:30",
      avatar: User1,
    },
    {
      id: 2,
      name: "David Miller",
      action: "created a monthly savings goal of $500",
      time: "11:20",
      avatar: User2,
    },
    {
      id: 3,
      name: "Emma Wilson",
      action: "transferred $200 to Investment account",
      time: "09:10",
      avatar: User3,
    },
  ],
  yesterday: [
    {
      id: 4,
      name: "John Carter",
      action: "reviewed Budget Performance report",
      time: "21:45",
      avatar: User1,
    },
    {
      id: 5,
      name: "Olivia Brown",
      action: "paid utility bills of $120",
      time: "08:55",
      avatar: User2,
    },
  ],
};

export default function RecentActivityCard() {
  return (
    <Card>
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded hover:bg-accent">
              <MoreVertical className="h-5 w-5 text-accent-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => alert("View all activities")}>
              View All Activities
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert("Mark all as read")}>
              Mark All as Read
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => alert("Clear history")}
            >
              Clear History
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {/* Content */}
      <CardContent>
        {/* Today */}
        <div className="mb-12">
          <h3 className="text-base font-semibold text-muted-foreground mb-2">
            Today
          </h3>
          <div className="space-y-6">
            {activities.today.map((item) => (
              <div key={item.id} className="flex gap-3 items-start">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover bg-primary shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm leading-snug">
                    <span className="font-semibold">{item.name}</span>{" "}
                    {item.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yesterday */}
        <div className="mb-1">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Yesterday
          </h3>
          <div className="space-y-4">
            {activities.yesterday.map((item) => (
              <div key={item.id} className="flex gap-3 items-start">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-8 h-8 rounded-full object-cover bg-primary shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm leading-snug">
                    <span className="font-semibold">{item.name}</span>{" "}
                    {item.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
