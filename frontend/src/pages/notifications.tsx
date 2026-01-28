import { notifications as allNotifications } from "@/components/data/notifications";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { useState } from "react";

const statusMap = {
  success: {
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
  },
  warning: {
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  },
  error: {
    color: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
    icon: <XCircle className="w-5 h-5 text-red-500" />,
  },
  info: {
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    icon: <Info className="w-5 h-5 text-blue-500" />,
  },
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = allNotifications.filter((n) => filter === "all" || n.unread);

  return (
    <Layout>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <Tabs defaultValue="all" onValueChange={setFilter} className="mt-4">
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-sm">No notifications to show</p>
              <span className="text-4xl mt-2">🎉</span>
            </div>
          ) : (
            filtered.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-4 rounded-lg border p-4 bg-card hover:bg-muted/40 transition"
              >
                <div className="pt-1">
                  {statusMap[n.status as keyof typeof statusMap]?.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {n.description}
                  </p>
                  <span
                    className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                      statusMap[n.status as keyof typeof statusMap]?.color
                    }`}
                  >
                    {n.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}
