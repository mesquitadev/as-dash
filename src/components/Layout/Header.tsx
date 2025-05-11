import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isSidebarOpen: boolean;
  greeting: string;
  userName: string;
  children?: React.ReactNode;
}

const Header = ({ isSidebarOpen, greeting, userName, children }: HeaderProps) => {
  return (
    <div className="bg-gray-100 text-black p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className={cn("ml-4", isSidebarOpen ? "ml-64" : "ml-20")}>
        {/* This space can be used for page title or breadcrumbs */}
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-black">
          {greeting}, {userName}
        </span>
        {children}
      </div>
    </div>
  );
};

export default Header;