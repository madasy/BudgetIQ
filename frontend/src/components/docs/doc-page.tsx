import type { ReactNode } from "react";
import { DocBreadcrumb } from "./doc-breadcrumb";

interface DocPageProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function DocPage({ children, title, description }: DocPageProps) {
  return (
    <div className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocBreadcrumb />
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="pb-12 pt-8">{children}</div>
      </div>
    </div>
  );
}
