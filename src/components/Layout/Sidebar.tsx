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
  footerLogo?: string;
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
                   footerLogo,
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
        'bg-primary text-sidebar-foreground h-full fixed text-white',
        isSidebarOpen ? 'w-64' : 'w-20',
        'space-y-6 py-4 transition-all duration-200 flex flex-col z-20 overflow-hidden',
      )}
    >
      <div className='flex py-2 mx-4 my-2 justify-center items-center'>
        <img src={logo} alt='Logo' className={cn('h-20', isSidebarOpen ? 'w-auto' : 'w-5 ')} />
      </div>
      <div className='mx-5'>
        <hr className='border-sidebar-border' />
      </div>

      <ScrollArea className='h-full flex-1'>
        <nav className='pt-2 mx-2'>
          {filteredLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.startsWith);

            // Process submenu items if they exist
            if (link.submenu) {
              link.submenu = link.submenu
                .filter((sublink) => hasPermission(userRoles, sublink.roles))
                .map((sublink) => ({
                  ...sublink,
                  isActive: location.pathname.startsWith(sublink.to),
                }));
            }

            return (
              <SidebarItem
                key={link.label}
                icon={link.icon}
                label={link.label}
                to={link.to}
                isActive={isActive}
                isSidebarOpen={isSidebarOpen}
                submenu={link.submenu}
                isSubmenuOpen={isSubmenuOpen[link.label] || false}
                toggleSubmenu={() => toggleSubmenu(link.label)}
              />
            );
          })}
        </nav>
      </ScrollArea>

      <footer className='p-1 mt-auto'>
        <div className='py-2 flex-col justify-center items-center hidden sm:flex'>
          {footerLogo && (
            <img src={footerLogo} alt='Footer Logo' className='hidden sm:block max-h-10' />
          )}
          {version && <div className='text-sm font-semibold text-sidebar-foreground'>{version}</div>}
          {developer && <div className='text-xs text-sidebar-foreground/70'>{developer}</div>}
        </div>
      </footer>

    </div>
  );
};

export default Sidebar;