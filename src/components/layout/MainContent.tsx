import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MainContentProps {
  children: ReactNode;
  showSidebar: boolean;
  isSidebarCollapsed: boolean;
}

const MainContent = ({
  children,
  showSidebar,
  isSidebarCollapsed,
}: MainContentProps) => {
  return (
    <main
      className={cn(
        "flex-1  transition-all duration-300 ease-in-out",
        showSidebar && (isSidebarCollapsed ? "pl-2" : "pl-0")
      )}
    >
      {children}
    </main>
  );
};

export default MainContent;
