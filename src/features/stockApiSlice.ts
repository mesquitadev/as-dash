import { apiSlice } from '@/services/apiSlice';

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

interface SingleStock {
  id: string;
  name: string;
}

export const stockApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getStocks: query<Stock, QueryParams>({
      query: () => ({
        url: `/stock`,
        method: 'GET',
      }),
      providesTags: ['Stocks'],
    }),

    getStockById: query<SingleStock, number>({
      query: (stockId) => ({
        url: `/stock/${stockId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetStocksQuery, useGetStockByIdQuery } = stockApiSlice;
