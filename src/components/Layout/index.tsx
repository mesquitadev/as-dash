// @ts-nocheck
import { useTenant } from '@/hooks/useTenant';
import { useOidc } from '@/oidc';
import { getGreeting } from '@/utils';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import SignOutDialog from './SignOutDialog';
import { menuItems } from './menuItems';

import logo from '@/assets/macros-logo.png';
import OptionMenu from '@/components/ui/OptionMenu';

const SidebarLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<{ [key: string]: boolean }>({});

  const { decodedIdToken, logout } = useOidc();
  const userRoles = decodedIdToken?.groups || [];
  const { tenantOptions, setTenantId, tenantId } = useTenant();
  const location = useLocation();

  const links = React.useMemo(() => menuItems, []);

  // Handle sidebar responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Open parent menu when navigating directly to submenu item
  useEffect(() => {
    links.forEach((link) => {
      if (link.submenu) {
        link.submenu.forEach((sublink) => {
          if (location.pathname.startsWith(sublink.to)) {
            setIsSubmenuOpen((prev) => ({ ...prev, [link.label]: true }));
          }
        });
      }
    });
  }, [links, location.pathname]);

  // Toggle submenu open/close
  const toggleSubmenu = (menu: string) => {
    setIsSubmenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  // Handle sign out
  const handleSignOut = () => {
    setOpenSignOutModal((prev) => !prev);
  };

  const handleSignOutConfirm = () => {
    setOpenSignOutModal(false);
    logout && logout({ redirectTo: 'specific url', url: '/' });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        links={links}
        userRoles={userRoles}
        isSidebarOpen={isSidebarOpen}
        isSubmenuOpen={isSubmenuOpen}
        toggleSubmenu={toggleSubmenu}
        logo={logo}
        version='MacrOS - v1.0.0 - Build 990'
        developer='Desenvolvido por LudoLABS'
      />

      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 relative",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        <Header
          isSidebarOpen={isSidebarOpen}
          greeting={getGreeting()}
          userName={decodedIdToken?.name || 'Usuário'}
          onSignOut={handleSignOut}
        >
          <OptionMenu
            options={tenantOptions}
            onChange={setTenantId}
            value={tenantId}
          />
        </Header>

        <main className="flex-1 overflow-auto px-6 py-6 mt-16">
          {children}
        </main>
      </div>

      <SignOutDialog
        open={openSignOutModal}
        onOpenChange={setOpenSignOutModal}
        onConfirm={handleSignOutConfirm}
      />
    </div>
  );
};

export default SidebarLayout;

