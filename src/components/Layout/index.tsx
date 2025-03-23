import logoEqtl from '@/assets/logo-eqtl.svg';
import logo from '@/assets/logo-sigma.svg';

import { useOidc } from '@/oidc';
import { getGreeting } from '@/utils';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import {
  ChevronDownIcon,
  Cog8ToothIcon,
  ExclamationTriangleIcon,
  ListBulletIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { FaList } from 'react-icons/fa';
import { RiLayoutMasonryFill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import Breadcumbs from '../Breadcumbs';

const SidebarLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<{ [key: string]: boolean }>({});
  const { decodedIdToken } = useOidc();
  const userRoles = decodedIdToken?.groups || [];

  const location = useLocation();

  const links = React.useMemo(
    () => [
      {
        icon: RiLayoutMasonryFill,
        label: 'Materiais',
        startsWith: '/materiais',
        roles: ['/admin', '/fiscal'],
        to: '/materiais',
      },
      {
        icon: RiLayoutMasonryFill,
        label: 'Relatórios',
        startsWith: '/relatorios',
        roles: ['/admin'],
        to: '/relatorios',
        submenu: [
          { to: '/relatorios/entrada', label: 'Entrada', icon: PlusIcon, roles: ['/admin'] },
          { to: '/relatorios/saida', label: 'Saída', icon: ListBulletIcon, roles: ['/admin'] },
        ],
      },
      {
        icon: Cog8ToothIcon,
        label: 'Configuração',
        startsWith: '/configuracao',
        roles: ['/master'],
        to: '/configuracao',
        submenu: [
          { to: '/estoques', label: 'Gerenciar Estoques', icon: PlusIcon, roles: ['/admin'] },
          { to: '/empresas', label: 'Gerenciar Empresas', icon: PlusIcon, roles: ['/admin'] },
          {
            to: '/minhas-anotacoes/lista',
            label: 'Lista de Anotações',
            icon: FaList,
            roles: ['/user'],
          },
        ],
      },
    ],
    [],
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const openParentMenu = () => {
      links.forEach((link) => {
        if (link.submenu) {
          link.submenu.forEach((sublink) => {
            if (location.pathname.startsWith(sublink.to)) {
              setIsSubmenuOpen((prev) => ({ ...prev, [link.label]: true }));
            }
          });
        }
      });
    };

    openParentMenu();
  }, [links, location.pathname]);

  const handleSignOut = () => {
    setOpenSignOutModal((state) => !state);
  };

  const toggleSubmenu = (menu: string) => {
    setIsSubmenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const hasPermission = (userRoles: string[], requiredRoles: string[]): boolean => {
    return requiredRoles.some((role) => userRoles.includes(role));
  };

  const filteredLinks = links.filter((link) => hasPermission(userRoles, link.roles));

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div
        className={`bg-primary text-white h-[calc(100%-1rem)] m-2 rounded-lg fixed ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } space-y-6 py-7 transition-width duration-200 flex flex-col z-20 overflow-hidden`}
      >
        <div className='flex py-2 mx-4 my-2 justify-center items-center'>
          <img src={logo} alt='Logo' className='w-[130px] h-70' />
        </div>
        <div className='mx-5'>
          <hr className='border-white'></hr>
        </div>
        <div className='h-full flex flex-col justify-between overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 scrollbar-track-gray-300'>
          <nav className='pt-5 mx-2'>
            {filteredLinks.map((link) => (
              <div key={link.label}>
                {link.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(link.label)}
                      className={`w-full font-light relative py-2.5 px-4 mb-1 transition duration-200 hover:bg-secondary flex justify-between items-center rounded-lg ${
                        isSidebarOpen ? '' : 'justify-center text-center'
                      } ${location.pathname.startsWith(link.startsWith) && 'bg-secondary'}`}
                    >
                      <div className='flex flex-row items-center justify-center'>
                        <link.icon className={`mr-2 h-5 w-5 ${isSidebarOpen ? '' : 'm-0'}`} />
                        {isSidebarOpen && link.label}
                      </div>
                      <span
                        className={`transform transition-transform duration-200 ${
                          isSubmenuOpen[link.label] ? 'rotate-180' : ''
                        }`}
                      >
                        <ChevronDownIcon className='h-5 w-5' />
                      </span>
                    </button>
                    <ul
                      className={` bg-tertiary rounded-md transition-all duration-300 ease-in-out overflow-hidden ${
                        isSubmenuOpen[link.label] ? 'max-h-40' : 'max-h-0'
                      }`}
                    >
                      {link.submenu
                        .filter((sublink) => hasPermission(userRoles, sublink.roles))
                        .map((sublink) => (
                          <li key={sublink.to}>
                            <Link
                              to={sublink.to}
                              className={`relative py-2.5 px-2 transition duration-200 hover:bg-tertiary flex items-center ${
                                isSidebarOpen ? '' : 'justify-center text-center'
                              } ${location.pathname.startsWith(sublink.to) ? 'bg-secondary' : ''}`}
                            >
                              <sublink.icon className='ml-2 mr-2 h-5 w-5' />
                              {isSidebarOpen && sublink.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    className={`font-light relative py-2.5 px-4 mb-1 transition duration-200 hover:bg-secondary flex items-center rounded-lg ${
                      isSidebarOpen ? '' : 'justify-center text-center'
                    } ${location.pathname.startsWith(link.startsWith) && 'bg-secondary'}`}
                  >
                    <link.icon className={`mr-2 h-5 w-5 ${isSidebarOpen ? '' : 'm-0'}`} />
                    {isSidebarOpen && link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <footer className='p-1'>
            <div className='py-2 flex-col justify-center items-center hidden sm:flex'>
              <img src={logoEqtl} alt='Logo Equatorial' className='hidden sm:block' />
              <div className='text-sm font-semibold text-white'>Sigma - v1.0.0 - Build 990</div>
              <div className='text-xs text-gray-200'>Desenvolvido por MaisTECH</div>
            </div>
          </footer>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        } overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 scrollbar-track-gray-300`}
      >
        {/* Top Bar */}
        <div className='bg-gray-100 text-white p-4 flex justify-end items-center fixed top-0 left-0 right-0'>
          <div className='flex items-center space-x-4'>
            <span className='text-sm text-black'>
              {getGreeting()}, {decodedIdToken ? decodedIdToken.name : 'Usuário'}
            </span>
          </div>
        </div>
        <div className='mt-24 px-5'>
          <Breadcumbs />
          {children}
        </div>
      </div>

      <Dialog open={openSignOutModal} onClose={handleSignOut} className='relative z-10'>
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
        />

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <DialogPanel transition>
              <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10'>
                    <ExclamationTriangleIcon aria-hidden='true' className='size-6 text-red-600' />
                  </div>
                  <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <DialogTitle as='h3' className='text-base font-semibold text-gray-900'>
                      Sair da Plataforma
                    </DialogTitle>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>Deseja sair da plataforma?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  // onClick={() => signOut()}
                  className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                ></button>
                <button
                  type='button'
                  onClick={handleSignOut}
                  className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                >
                  Não
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SidebarLayout;
