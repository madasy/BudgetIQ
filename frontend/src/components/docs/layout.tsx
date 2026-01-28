import { Outlet } from "react-router-dom";
import { DocFooter } from "./doc-footer";
import { DocHeader } from "./doc-header";
import { DocSidebar } from "./doc-sidebar";

export default function DocLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <DocHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocSidebar />
        <main className="relative py-6 lg:gap-10 lg:py-8">
           <Outlet />
        </main>
      </div>
      <DocFooter />
    </div>
  );
}
