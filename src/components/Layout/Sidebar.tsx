import React from 'react';
import { useLocation } from 'react-router-dom';
import SidebarItem, { SidebarSubmenuItemProps } from './SidebarItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface SidebarLinkProps {
  icon: React.ElementType;
  label: string;
  startsWith: string;
  roles: string[];
  to: string;
  submenu?: SidebarSubmenuItemProps[];
}

interface SidebarProps {
  links: SidebarLinkProps[];
  userRoles: string[];
  isSidebarOpen: boolean;
  isSubmenuOpen: { [key: string]: boolean };
  toggleSubmenu: (menu: string) => void;
  logo: string;
  version?: string;
  developer?: string;
}

const Sidebar = ({
  links,
  userRoles,
  isSidebarOpen,
  isSubmenuOpen,
  toggleSubmenu,
  logo,
  version,
  developer,
}: SidebarProps) => {
  const location = useLocation();

  const hasPermission = (userRoles: string[], requiredRoles: string[]): boolean => {
    return requiredRoles.some((role) => userRoles.includes(role));
  };

  const filteredLinks = links.filter((link) => hasPermission(userRoles, link.roles));

  return (
    <div
      className={cn(
        'bg-gradient-to-b from-[#1a1c2e] to-[#16162a] text-white',
        'h-full fixed space-y-6 py-4 transition-all duration-200 flex flex-col z-50',
        isSidebarOpen ? 'w-64' : 'w-20',
      )}
    >
      <div className='flex py-2 mx-4 my-2 justify-center items-center'>
        <img src={logo} alt='Logo' className={cn('h-12', isSidebarOpen ? 'w-auto' : 'w-5')} />
      </div>

      <ScrollArea className='h-full flex-1 px-3'>
        <nav className='space-y-1'>
          {filteredLinks.map((link) => (
            <SidebarItem
              key={link.label}
              icon={link.icon}
              label={link.label}
              to={link.to}
              isActive={location.pathname.startsWith(link.startsWith)}
              isSidebarOpen={isSidebarOpen}
              submenu={link.submenu}
              isSubmenuOpen={isSubmenuOpen[link.label] || false}
              toggleSubmenu={() => toggleSubmenu(link.label)}
            />
          ))}
        </nav>
      </ScrollArea>

      <footer className='px-4 py-3 border-t border-white/10'>
        <div className='flex-col justify-center items-center hidden sm:flex space-y-1'>
          <div className='text-xs font-medium text-white/70'>{version}</div>
          <div className='text-xs text-white/50'>{developer}</div>
        </div>
      </footer>
    </div>
  );
};

export default Sidebar;

