import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import { clubRoutes } from './club.routes';
import { settingsRoutes } from './settings.routes';
import { PublicRoute, PrivateRoute } from './Route';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route path='/inicio' element={<PrivateRoute requiredPermissions={['*']} />}>
          <Route index element={<Home />} />
        </Route>

        <Route path='/club' element={<PrivateRoute requiredPermissions={['*']} />}>
          {clubRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>

        <Route path='/settings' element={<PrivateRoute requiredPermissions={['/admin']} />}>
          {settingsRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
