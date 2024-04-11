import { cn } from "@/utils/class-name";
import { useSidebar } from "@/hooks/layout/use-sidebar";
import { HeaderContent } from "./header-content";

export function Header() {
  const { isCollapse } = useSidebar();

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-40 w-full mt-5",
        isCollapse
          ? "md:ml-[80px] md:max-w-[calc(100vw_-_80px)]"
          : "md:ml-[210px] md:max-w-[calc(100vw_-_220px)]"
      )}
    >
      <div className="flex mt-2 h-12 w-full items-center justify-between px-10">
        <div className="flex items-center justify-center">
          <div className="space-y-1">
            <p className="text-gray-300 text-sm">Pages / Dashboard</p>
            <h3 className="font-semibold text-2xl text-textPrimary">
              Main Dashboard
            </h3>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <HeaderContent />
        </nav>
      </div>
    </header>
  );
}
