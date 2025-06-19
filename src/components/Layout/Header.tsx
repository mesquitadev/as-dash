import React from "react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/Button";
import { ChevronDown, LogOut, User } from "lucide-react";

interface HeaderProps {
  isSidebarOpen: boolean;
  greeting: string;
  userName: string;
  children?: React.ReactNode;
  onSignOut?: () => void;
}

const Header = ({ isSidebarOpen, greeting, userName, children, onSignOut }: HeaderProps) => {
  return (
    <header className="bg-white border-b w-full h-16 flex items-center justify-between fixed top-0 right-0 z-40">
      <div className={cn("px-6 flex-1 transition-all duration-300",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-muted-foreground">
            {greeting}, {userName}
          </span>
          <div className="flex items-center gap-4 pr-6">
            {children}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="gap-2 transition-colors duration-200 hover:bg-slate-100"
                >
                  <User className="h-4 w-4" />
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 animate-in fade-in-0 zoom-in-95 duration-200"
              >
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer transition-colors"
                  onClick={onSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

