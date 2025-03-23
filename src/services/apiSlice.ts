import { getOidc } from '@/oidc';
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
    prepareHeaders: async (headers) => {
      const token = await fetchWithAuth();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Companies', 'Materials', 'UserStocks', 'Stocks'],
  endpoints: (builder) => ({}),
});
