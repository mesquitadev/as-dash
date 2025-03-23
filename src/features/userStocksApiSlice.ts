import { apiSlice } from '@/services/apiSlice';

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

export const userStockApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getUserStocks: query<UserStock[], GetCompaniesParams>({
      query: () => ({
        url: `/user-stocks`,
        method: 'GET',
      }),
      providesTags: ['UserStocks'],
    }),
  }),
});

export const { useGetUserStocksQuery } = userStockApiSlice;
