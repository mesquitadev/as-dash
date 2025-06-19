import { RouteObject } from 'react-router-dom';
import Personalization from '@/pages/Settings/Personalization';
import ApiKeys from '@/pages/Settings/ApiKeys';
import PDV from '@/pages/Settings/PDV';

export const settingsRoutes: RouteObject[] = [
  {
    path: 'personalization',
    element: <Personalization />,
  },
  {
    path: 'api-keys',
    element: <ApiKeys />,
  },
  {
    path: 'pdv',
    element: <PDV />,
  },
];
