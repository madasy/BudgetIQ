import { ScrollArea } from "@/components/ui/scroll-area";
import { DocSidebarNav } from "./doc-sidebar-nav";

export function DocSidebar() {
  return (
    <aside className="fixed top-16 z-30 hidden h-[calc(100vh-65px)] w-64 shrink-0 md:sticky md:block">
      <ScrollArea className="h-full py-6 pr-6 lg:py-8">
        <DocSidebarNav />
      </ScrollArea>
    </aside>
  );
}
