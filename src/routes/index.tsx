import { Home, Materials, NotFound, SignUp } from '@/pages';
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

        <Route
          path='/materiais'
          element={<PrivateRoute requiredPermissions={['/admin', '/fiscal']} />}
        >
          <Route index element={<Materials />} />
        </Route>

        {/* <Route path='/estoques' element={<PrivateRoute requiredPermissions={['/admin']} />}>
          <Route index element={<Estoques />} />
          <Route path='editar/:id' element={<EditCompany />} />
        </Route>

        <Route path='/empresas' element={<PrivateRoute requiredPermissions={['/admin']} />}>
          <Route index element={<Companies />} />
          <Route path='editar/:id' element={<EditCompany />} />
        </Route> */}

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
