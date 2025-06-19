import { getOidc } from '@/oidc';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiTags } from '@/features/types';

export const baseUrl = 'https://api.ludolabs.rocks/api/v1';

export const fetchWithAuth = async () => {
  const oidc = await getOidc();
  if (oidc.isUserLoggedIn) {
    const { accessToken } = oidc.getTokens();
    return accessToken;
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('@App:token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Companies', 'Tenants', 'Materials', 'PDV', 'Points', 'Stocks', 'UserStocks'] as ApiTags[],
  endpoints: () => ({}),
});
