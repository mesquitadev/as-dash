
import { apiSlice } from '@/services/apiSlice';

interface MostSoldItem {
  itemName: string;
  totalQuantitySold: number;
  abcCategory: string;
}

interface MostSoldItemsResponse {
  data: MostSoldItem[];
}

interface GetMostSoldItemsParams {
  startDate?: string; // Optional start date in ISO format
  endDate?: string;   // Optional end date in ISO format
}

type IndicadoresResponse = {
  totalUsers: number;
  totalPurchased: number;
  totalDiscounts: number;
  totalVouchersRedeemed: number;
  averageTicket: number;
  totalSales: number;
  totalVouchersIssued: number;
};

interface GetIndicadoresParams {
  startDate?: string; // Optional start date in ISO format
  endDate?: string;   // Optional end date in ISO format
}

const mostSoldItemsEndpoint = '/indicadores/most-sold-items';
const indicadoresEndpoint = '/indicadores';

function getMostSoldItems({ startDate, endDate }: GetMostSoldItemsParams) {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  return {
    url: `${mostSoldItemsEndpoint}?${params.toString()}`,
    method: 'GET',
  };
}

function getIndicadores({ startDate, endDate }: GetIndicadoresParams) {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  return {
    url: `${indicadoresEndpoint}?${params.toString()}`,
    method: 'GET',
  };
}

export const indicadoresApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getMostSoldItems: query<MostSoldItemsResponse, GetMostSoldItemsParams>({
      query: getMostSoldItems,
    }),
    getIndicadores: query<IndicadoresResponse, GetIndicadoresParams>({
      query: getIndicadores,
    }),
  }),
});

export const { useGetMostSoldItemsQuery, useGetIndicadoresQuery } = indicadoresApiSlice;