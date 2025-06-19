import { useTenant } from '@/hooks/useTenant';
import { useOidc } from '@/oidc';
import { getGreeting } from '@/utils';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { RiLayoutMasonryFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar, { SidebarLinkProps } from './Sidebar';
import SignOutDialog from './SignOutDialog';
// import { FaList } from 'react-icons/fa';

s

// Import logos
import logo from '@/assets/macros-logo.png';
import OptionMenu from '@/components/ui/OptionMenu';

const SidebarLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<{ [key: string]: boolean }>({});

  const { decodedIdToken } = useOidc();
  const userRoles = decodedIdToken?.groups || [];
  const { tenantOptions, setTenantId, tenantId } = useTenant();
  const location = useLocation();

  // Define navigation links
  const links: SidebarLinkProps[] = React.useMemo(
    () => [
      {
        icon: RiLayoutMasonryFill,
        label: 'Dashboard',
        startsWith: '/inicio',
        roles: ['/admin', '/fiscal'],
        to: '/inicio',
      },
      {
        icon: Cog8ToothIcon,
        label: 'Configuração',
        startsWith: '/configuracao',
        roles: ['/master'],
        to: '/configuracao',
        // submenu: [
        //   { to: '/estoques', label: 'Gerenciar Estoques', icon: PlusIcon, roles: ['/admin'] },
        //   { to: '/empresas', label: 'Gerenciar Empresas', icon: PlusIcon, roles: ['/admin'] },
        //   {
        //     to: '/minhas-anotacoes/lista',
        //     label: 'Lista de Anotações',
        //     icon: FaList,
        //     roles: ['/user'],
        //   },
        // ],
      },
    ],
    [],
  );

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
    // Implement sign out functionality here
    // signOut();
    setOpenSignOutModal(false);
  };

  return (
    <div className='flex h-screen'>
      {/* Sidebar Component */}
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

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        } transition-all duration-200 overflow-y-auto`}
      >
        {/* Header Component */}
        <Header
          isSidebarOpen={isSidebarOpen}
          greeting={getGreeting()}
          userName={decodedIdToken?.name || 'Usuário'}
        >
          <OptionMenu
            options={tenantOptions}
            onChange={setTenantId}
            value={tenantId}
          />
        </Header>
        {/* Main Content Area */}
        <div className='mt-24 px-5'>
          {children}
        </div>
      </div>

      {/* Sign Out Dialog */}
      <SignOutDialog
        open={openSignOutModal}
        onClose={handleSignOut}
        onSignOut={handleSignOutConfirm}
      />
    </div>
  );
};

export default SidebarLayout;