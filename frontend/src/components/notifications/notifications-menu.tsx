import { notifications as defaultNotifications } from "@/components/data/notifications";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  CheckCircle2,
  ClipboardList,
  Mail,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Define and export the type for a notification
export interface Notification {
  id: string | number;
  title: string;
  description: string;
  category: "message" | "task" | "log" | "security";
  status: "success" | "warning" | "error" | "info";
  time: string;
  unread: boolean;
}

// Define the props interface
interface NotificationsMenuProps {
  notifications?: Notification[];
}

// Define the status colors mapping
const statusColors: Record<Notification["status"], string> = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

// Define the category icons mapping
const categoryIcons: Record<Notification["category"], LucideIcon> = {
  message: Mail,
  task: CheckCircle2,
  log: ClipboardList,
  security: ShieldAlert,
};

export function NotificationsMenu({
  notifications = defaultNotifications as Notification[],
}: NotificationsMenuProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [data, setData] = useState<Notification[]>(notifications);

  const filtered: Notification[] =
    activeTab === "all" ? data : data.filter((n) => n.category === activeTab);
  const unreadCount = data.filter((n) => n.unread).length;

  const handleClick = (id: Notification["id"]) => {
    const notif = data.find((n) => n.id === id);
    if (notif) {
      toast(`${notif.title}`, {
        description: notif.description,
        action: {
          label: "Mark as unread",
          onClick: () =>
            setData((prev) =>
              prev.map((n) => (n.id === id ? { ...n, unread: true } : n))
            ),
        },
      });
      setData((prev) =>
        prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
      );
    }
  };

  const handleDelete = (id: Notification["id"]) => {
    setData((prev) => prev.filter((n) => n.id !== id));
    toast("Notification deleted");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:text-primary relative"
        >
          <BellRing className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 p-0 rounded-xl shadow-xl"
      >
        <div className="border-b px-2 py-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex bg-transparent border border-border rounded-md p-0 overflow-hidden text-foreground">
              {["all", "message", "task", "log", "security"].map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="px-4 py-2 text-sm font-medium border-r border-border rounded-none bg-transparent data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none transition-colors capitalize"
                >
                  {cat === "all" ? `All (${data.length})` : cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="h-[350px] overflow-hidden">
          <ScrollArea className="h-full pr-2">
            {filtered.map((n) => {
              const Icon: LucideIcon = categoryIcons[n.category];

              return (
                <div
                  key={n.id}
                  className="group flex justify-between items-start gap-3 px-4 py-3 hover:bg-muted/50 transition relative rounded-lg"
                >
                  <div
                    className={`h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-md ${
                      statusColors[n.status]
                    }`}
                  >
                    {Icon && <Icon className="text-white w-4 h-4" />}
                  </div>

                  <div
                    className="flex-1 space-y-0.5 cursor-pointer"
                    onClick={() => handleClick(n.id)}
                  >
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {n.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between gap-1 text-right">
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {n.time}
                    </p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(n.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </div>
        <div className="border-t p-2 text-center text-sm text-muted-foreground cursor-pointer hover:text-foreground">
          Archive all notifications
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
