import { getOidc } from '@/oidc';
import { RootState } from '@/store'; // Importa o tipo RootState para acessar o estado global
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = 'http://localhost:8443/api/v1';

export const fetchWithAuth = async () => {
  const oidc = await getOidc();
  if (oidc.isUserLoggedIn) {
    const { accessToken } = await oidc.getTokens();
    return accessToken;
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers, { getState }) => {
      const token = await fetchWithAuth();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      // Obter o tenantId do Redux usando getState
      const state = getState() as RootState;
      const tenantId = state.selectedTenant?.tenantId;
      if (tenantId) {
        headers.set('X-Tenant-ID', tenantId);
      }

      return headers;
    },
  }),
  tagTypes: ['Companies', 'Materials', 'UserStocks', 'Stocks', 'Tenants'],
  endpoints: () => ({}),
});
