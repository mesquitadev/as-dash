import { apiSlice } from '@/services/apiSlice';

const companiesEndpoint = '/transfer';

interface Transfer {
  items: {
    materialCode: string;
    quantity: number;
  }[];
  fromStockId: number;
  toStockId: number;
}

function transferItem(data: Transfer) {
  return { url: companiesEndpoint, method: 'POST', body: data };
}

export const transferMaterialsApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ mutation }) => ({
    transferMaterial: mutation<void, Transfer>({
      query: transferItem,
      invalidatesTags: ['Materials'],
    }),
  }),
});

export const { useTransferMaterialMutation } = transferMaterialsApiSlice;
