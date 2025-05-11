
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
      <div>
        <button
          onClick={toggleSubmenu}
          className={cn(
            "w-full font-light relative py-2.5 px-4 mb-1 transition duration-200 hover:bg-accent flex justify-between items-center rounded-lg",
            isSidebarOpen ? "" : "justify-center text-center",
            isActive && "bg-accent"
          )}
        >
          <div className="flex flex-row items-center justify-center">
            <Icon className={cn("h-5 w-5", isSidebarOpen ? "mr-2" : "m-0")} />
            {isSidebarOpen && <span>{label}</span>}
          </div>
          {isSidebarOpen && (
            <span
              className={cn(
                "transform transition-transform duration-200",
                isSubmenuOpen ? "rotate-180" : ""
              )}
            >
              <ChevronDown className="h-4 w-4" />
            </span>
          )}
        </button>
        <ul
          className={cn(
            "bg-muted rounded-md transition-all duration-300 ease-in-out overflow-hidden",
            isSubmenuOpen ? "max-h-96" : "max-h-0"
          )}
        >
          {submenu.map((subitem) => (
            <li key={subitem.to}>
              <Link
                to={subitem.to}
                className={cn(
                  "relative py-2.5 px-2 transition duration-200 hover:bg-accent/50 flex items-center",
                  isSidebarOpen ? "" : "justify-center text-center",
                  subitem.isActive ? "bg-accent/70" : ""
                )}
              >
                <subitem.icon className="ml-2 mr-2 h-4 w-4" />
                {isSidebarOpen && <span>{subitem.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={cn(
        "font-light relative py-2.5 px-4 mb-1 transition duration-200 hover:bg-accent flex items-center rounded-lg",
        isSidebarOpen ? "" : "justify-center text-center",
        isActive && "bg-accent"
      )}
    >
      <Icon className={cn("h-5 w-5", isSidebarOpen ? "mr-2" : "m-0")} />
      {isSidebarOpen && <span>{label}</span>}
    </Link>
  );
};

export default SidebarItem;