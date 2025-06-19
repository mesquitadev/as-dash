import { RiLayoutMasonryFill } from 'react-icons/ri';
import { Crown, Users, Gift, Award, BarChart3, CircleDollarSign, Settings, Palette, Key, Terminal } from 'lucide-react';
import { SidebarLinkProps } from './Sidebar';

export const menuItems: SidebarLinkProps[] = [
  {
    icon: RiLayoutMasonryFill,
    label: 'Dashboard',
    startsWith: '/inicio',
    roles: ['/admin', '/club-manager', '/club-member'],
    to: '/inicio',
  },
  {
    icon: Crown,
    label: 'Clube de Membros',
    startsWith: '/club',
    roles: ['/admin', '/club-manager', '/club-member'],
    to: '/club',
    submenu: [
      {
        icon: BarChart3,
        label: 'Dashboard',
        to: '/club',
        roles: ['/admin', '/club-manager', '/club-member']
      },
      {
        icon: Users,
        label: 'Membros',
        to: '/club/members',
        roles: ['/admin', '/club-manager', '/club-member']
      },
      {
        icon: Gift,
        label: 'Benefícios',
        to: '/club/benefits',
        roles: ['/admin', '/club-manager', '/club-member']
      },
      {
        icon: Award,
        label: 'Níveis',
        to: '/club/levels',
        roles: ['/admin', '/club-manager', '/club-member']
      },
      {
        icon: CircleDollarSign,
        label: 'Pontos',
        to: '/club/points',
        roles: ['/admin', '/club-manager']
      }
    ]
  },
  {
    icon: Settings,
    label: 'Configurações',
    startsWith: '/settings',
    roles: ['/admin'],
    to: '/settings',
    submenu: [
      {
        icon: Palette,
        label: 'Personalização',
        to: '/settings/personalization',
        roles: ['/admin']
      },
      {
        icon: Key,
        label: 'Chaves de API',
        to: '/settings/api-keys',
        roles: ['/admin']
      },
      {
        icon: Terminal,
        label: 'PDV',
        to: '/settings/pdv',
        roles: ['/admin']
      }
    ]
  }
];
