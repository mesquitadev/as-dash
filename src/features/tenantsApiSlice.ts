import { apiSlice } from '@/services/apiSlice';

interface Tenant {
  value: string;
  label: string;
  isDefault: boolean;
}

export const tenantsApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getTenants: query<Tenant[], void>({
      query: () => ({
        url: `/tenants`,
        method: 'GET',
      }),
      providesTags: ['Tenants'],
    }),
  }),
});

export const { useGetTenantsQuery } = tenantsApiSlice;
