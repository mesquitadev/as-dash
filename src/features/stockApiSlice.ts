import { apiSlice } from '@/services/apiSlice';
import { ApiTags } from './types';

interface QueryParams {
  page?: number;
  size?: number;
  sort?: string;
}

interface StockItem {
  id: string;
  name: string;
  parentStockId: string | null;
  ownerId: number;
}

interface Stock {
  content: StockItem[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export const stockApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query<Stock, QueryParams>({
      query: (params) => ({
        url: '/stocks',
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'Stocks' as ApiTags, id: 'LIST' }],
    }),
  }),
});

export const { useGetStocksQuery } = stockApi;
