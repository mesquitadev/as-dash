import { apiSlice } from '@/services/apiSlice';
import { ApiTags } from './types';

export interface PDV {
  id: string;
  name: string;
  identifier: string;
  storeId: string;
  apiKey: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreatePDVRequest {
  name: string;
  identifier: string;
  storeId: string;
}

export interface PDVResponse {
  data: PDV[];
  total: number;
}

export interface GetPDVParams {
  page?: number;
  limit?: number;
}

export interface UpdatePDVRequest {
  id: string;
  name?: string;
  identifier?: string;
  storeId?: string;
  status?: 'active' | 'inactive';
}

export const pdvApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPDVs: builder.query<PDVResponse, GetPDVParams>({
      query: (params) => ({
        url: '/pdv',
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'PDV' as ApiTags, id: 'LIST' }],
    }),

    createPDV: builder.mutation<void, CreatePDVRequest>({
      query: (data) => ({
        url: '/pdv',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'PDV' as ApiTags, id: 'LIST' }],
    }),

    updatePDV: builder.mutation<void, UpdatePDVRequest>({
      query: (data) => ({
        url: `/pdv/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'PDV' as ApiTags, id: 'LIST' }],
    }),

    deletePDV: builder.mutation<void, number>({
      query: (id) => ({
        url: `/pdv/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'PDV' as ApiTags, id: 'LIST' }],
    }),

    togglePDVStatus: builder.mutation<void, number>({
      query: (id) => ({
        url: `/pdv/${id}/toggle-status`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'PDV' as ApiTags, id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPDVsQuery,
  useCreatePDVMutation,
  useUpdatePDVMutation,
  useDeletePDVMutation,
  useTogglePDVStatusMutation,
} = pdvApi;
