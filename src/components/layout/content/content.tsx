"use client";

import { type ReactNode } from "react";

import { useSidebar } from "@/hooks/layout/use-sidebar";
import { cn } from "@/utils/class-name";

export function Content({ children }: { children: ReactNode }) {
  const { isCollapse } = useSidebar();

  return (
    <main
      className={cn(
        "w-full p-4 transition-all my-4 bg-background md:p-0",
        isCollapse
          ? "md:ml-[80px] md:max-w-[calc(100vw_-_80px)]"
          : "md:ml-[210px]  md:max-w-[calc(100vw_-_220px)]"
      )}
    >
      {children}
    </main>
  );
}
