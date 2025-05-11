import { Home, NotFound, SignUp } from '@/pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from './Route';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<SignUp />} />
        </Route>

        <Route
          path='/inicio'
          element={<PrivateRoute requiredPermissions={['/admin', '/fiscal']} />}
        >
          <Route index element={<Home />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
