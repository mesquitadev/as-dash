import { apiSlice } from '@/services/apiSlice';
import { ApiTags } from './types';

export interface Item {
  id: number;
  name: string;
  quantity: number;
  materialCode: string;
  measureUnit: string;
  stockId: number;
}

interface CompaniesResponse {
  data: Item[];
  pageable: {
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
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
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface GetCompaniesParams {
  page?: number;
  size?: number;
  sort?: string;
  tenantId?: string;
  search?: string;
}

export const materialsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMaterials: builder.query<CompaniesResponse, GetCompaniesParams>({
      query: ({ page, tenantId, search }) => ({
        url: `/materials?page=${page}&tenant_id=${tenantId}${search ? `&search=${search}` : ''}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Materials' as ApiTags, id })),
              { type: 'Materials' as ApiTags, id: 'LIST' },
            ]
          : [{ type: 'Materials' as ApiTags, id: 'LIST' }],
    }),
    getMaterialById: builder.query<Item, number>({
      query: (id) => `/materials/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Materials' as ApiTags, id }],
    }),
    createMaterial: builder.mutation<void, Item>({
      query: (material) => ({
        url: '/materials',
        method: 'POST',
        body: material,
      }),
      invalidatesTags: [{ type: 'Materials' as ApiTags, id: 'LIST' }],
    }),
    updateMaterial: builder.mutation<void, Item>({
      query: ({ id, ...patch }) => ({
        url: `/materials/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Materials' as ApiTags, id }],
    }),
    deleteMaterial: builder.mutation<void, number>({
      query: (id) => ({
        url: `/materials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Materials' as ApiTags, id }],
    }),
  }),
});

