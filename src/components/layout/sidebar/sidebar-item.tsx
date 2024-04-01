"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useSidebar } from "@/hooks/layout/use-sidebar";
import { cn } from "@/utils/class-name";

import { type NavItem } from "../util/sidebar-config";
import { SidebarMenu } from "./sidebar-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export interface DocsSidebarNavProps {
  items: NavItem[];
}

export function SidebarItem({ items }: DocsSidebarNavProps) {
  const { isCollapse, handleToggleCollapse } = useSidebar();

  return items.length ? (
    <aside
      className={cn(
        "group relative h-full w-full bg-accent p-0 px-2 pt-4 transition-all ease-in-out dark:border-r-2 dark:border-accent",
        isCollapse ? "max-w-[80px]" : "max-w-[220px]"
      )}
    >
      <Button
        className="absolute -right-2 top-12 z-50 h-5 w-5 items-center justify-center rounded-full opacity-0 transition-all ease-in-out group-hover:md:opacity-100"
        onClick={handleToggleCollapse}
        size="icon"
        variant="outline"
      >
        {isCollapse ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
      </Button>
      <div className="w-full flex flex-col items-center space-y-4 mt-6">
        <h1 className="font-bold text-indigo-950 dark:text-white text-3xl">
          Stor<span className="font-normal">Age</span>
        </h1>
        <Separator className="w-full dark:bg-white/30" />
      </div>
      <ScrollArea className="h-screen max-h-[20rem] w-full md:max-h-[26rem] 2xl:max-h-screen">
        {items.map((item, index) => (
          <div className="flex flex-col gap-2 px-2 pb-4" key={index}>
            {!isCollapse && (
              <h4 className="mb-1 rounded-md px-3 py-1 text-sm font-bold text-primary dark:text-secondary">
                {item.title}
              </h4>
            )}
            {item?.items?.map((child, index) => (
              <SidebarMenu item={child} key={index} />
            ))}
          </div>
        ))}
      </ScrollArea>
    </aside>
  ) : null;
}
