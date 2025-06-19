import { RouteObject } from 'react-router-dom';
import ClubPage from '@/pages/Club';
import MembersDashboard from '@/pages/Club/MembersDashboard';
import MembersList from '@/pages/Club/MembersList';
import BenefitsManagement from '@/pages/Club/BenefitsManagement';
import Points from '@/pages/Club/Points';

export const clubRoutes: RouteObject[] = [
  {
    path: '',
    element: <MembersDashboard />,
  },
  {
    path: 'members',
    element: <MembersList />,
  },
  {
    path: 'benefits',
    element: <BenefitsManagement />,
  },
  {
    path: 'levels',
    element: <ClubPage />,
  },
  {
    path: 'points',
    element: <Points />,
  }
];
