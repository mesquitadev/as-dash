import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
  isSidebarOpen: boolean;
  submenu?: SidebarSubmenuItemProps[];
  isSubmenuOpen: boolean;
  toggleSubmenu: () => void;
}

export interface SidebarSubmenuItemProps {
  to: string;
  label: string;
  icon: React.ElementType;
  roles: string[];
  isActive?: boolean;
}

const SidebarItem = ({
  icon: Icon,
  label,
  to,
  isActive,
  isSidebarOpen,
  submenu,
  isSubmenuOpen,
  toggleSubmenu,
}: SidebarItemProps) => {
  if (submenu) {
    return (
      <div className="relative">
        <button
          onClick={toggleSubmenu}
          className={cn(
            "w-full relative py-3 px-4 transition-all duration-300",
            "flex justify-between items-center rounded-xl group",
            isSidebarOpen ? "" : "justify-center text-center",
            isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
          )}
        >
          <div className="flex items-center">
            <div className={cn(
              "rounded-lg transition-all duration-300 relative",
              isActive ? "text-white" : "text-white/70 group-hover:text-white"
            )}>
              <Icon className="h-5 w-5" />
              {isActive && (
                <div className="absolute inset-0 bg-white/10 rounded-lg blur-sm" />
              )}
            </div>
            {isSidebarOpen && (
              <span className={cn(
                "ml-3 text-sm font-medium transition-colors duration-300",
                isActive ? "text-white" : "text-white/70 group-hover:text-white"
              )}>
                {label}
              </span>
            )}
          </div>
          {isSidebarOpen && (
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-300",
              isSubmenuOpen ? "rotate-180" : "",
              isActive ? "text-white" : "text-white/70 group-hover:text-white"
            )} />
          )}
        </button>

        <div className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out pl-3",
          isSubmenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <ul className={cn(
            "space-y-1 mt-1",
            isSidebarOpen ? "pl-4" : "pl-0"
          )}>
            {submenu.map((subitem) => (
              <li key={subitem.to}>
                <Link
                  to={subitem.to}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-lg transition-all duration-200 group/item",
                    isSidebarOpen ? "" : "justify-center",
                    subitem.isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className={cn(
                    "rounded-lg transition-colors duration-200",
                    subitem.isActive ? "text-white" : "text-white/60 group-hover/item:text-white"
                  )}>
                    <subitem.icon className="h-4 w-4" />
                  </div>
                  {isSidebarOpen && (
                    <span className={cn(
                      "ml-3 text-sm transition-colors duration-200",
                      subitem.isActive ? "text-white" : "text-white/60 group-hover/item:text-white"
                    )}>
                      {subitem.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center py-3 px-4 rounded-xl transition-all duration-300 group",
        isSidebarOpen ? "" : "justify-center",
        isActive
          ? "bg-white/10 text-white"
          : "text-white/70 hover:text-white hover:bg-white/5"
      )}
    >
      <div className={cn(
        "rounded-lg transition-colors duration-300 relative",
        isActive ? "text-white" : "text-white/70 group-hover:text-white"
      )}>
        <Icon className="h-5 w-5" />
        {isActive && (
          <div className="absolute inset-0 bg-white/10 rounded-lg blur-sm" />
        )}
      </div>
      {isSidebarOpen && (
        <span className={cn(
          "ml-3 text-sm font-medium transition-colors duration-300",
          isActive ? "text-white" : "text-white/70 group-hover:text-white"
        )}>
          {label}
        </span>
      )}
    </Link>
  );
};

export default SidebarItem;

