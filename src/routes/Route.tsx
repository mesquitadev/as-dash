import Layout from '@/components/Layout';
import { useOidc } from '@/oidc';
import AccessDenied from '@/pages/common/AccessDenied';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC<{ requiredPermissions?: string[] }> = ({
  requiredPermissions = ['*'],
}) => {
  const { isUserLoggedIn, decodedIdToken } = useOidc();
  const hasPermission =
    requiredPermissions.includes('*') ||
    requiredPermissions.some((permission) => decodedIdToken?.groups.includes(permission));

  return isUserLoggedIn ? (
    hasPermission ? (
      <Layout>
        <Outlet />
      </Layout>
    ) : (
      <AccessDenied />
    )
  ) : (
    <Navigate to='/' />
  );
};

const PublicRoute: React.FC = () => {
  const { isUserLoggedIn } = useOidc();
  return isUserLoggedIn ? <Navigate to='/inicio' /> : <Outlet />;
};

export { PrivateRoute, PublicRoute };
