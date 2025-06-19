import { apiSlice } from '@/services/apiSlice';
import { ApiTags } from './types';

interface GetCompaniesParams {
  page?: number;
  size?: number;
  sort?: string;
}

interface UserStockItem {
  id: string;
  name: string;
  isDefault: boolean;
}

interface UserStock {
  stockId: string;
  isDefault: boolean;
  value: string;
  label: string;
  items: UserStockItem[];
}

export const userStocksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserStocks: builder.query<UserStock[], GetCompaniesParams>({
      query: (params) => ({
        url: '/user-stocks',
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'UserStocks' as ApiTags, id: 'LIST' }],
    }),
  }),
});

export const { useGetUserStocksQuery } = userStocksApi;
