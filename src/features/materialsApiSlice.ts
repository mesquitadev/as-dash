import { apiSlice } from '@/services/apiSlice';

interface Item {
  id: number;
  name: string;
  quantity: number;
  materialCode: string;
  measureUnit: string;
  stockId: number;
}

interface CompaniesResponse {
  content: Item[];
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
  stockId?: string | null;
}

const itemsEndpoint = (id: number) => `/items/${id}`;

function getItems(id: number) {
  return { url: itemsEndpoint(id), method: 'GET' };
}

function updateItem(data: Item) {
  return { url: itemsEndpoint(data.id), method: 'PUT', body: data };
}

function deleteItem(id: number) {
  return { url: itemsEndpoint(id), method: 'DELETE' };
}

export const materialsApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getMaterials: query<CompaniesResponse, GetCompaniesParams>({
      query: ({ page = 0, size = 50, sort = 'id,asc', stockId = null }) => {
        const queryString = `stock/items/${stockId}?page=${page}&size=${size}&sort=${sort}`;

        return queryString;
      },
      providesTags: (result) =>
        result ? result.content.map(({ id }) => ({ type: 'Materials', id })) : ['Materials'],
    }),
    getMaterial: query<Item, number>({
      query: getItems,
      providesTags: (_result, _error, id) => [{ type: 'Materials', id }],
    }),
    createMaterial: mutation<void, Item>({
      query: (data: Item) => ({
        url: '/items',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Materials'],
    }),
    updateMaterial: mutation<void, Item>({
      query: updateItem,
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Materials', id }],
    }),
    deleteMaterial: mutation<void, number>({
      query: deleteItem,
      invalidatesTags: (_result, _error, id) => [{ type: 'Materials', id }],
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useGetMaterialQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = materialsApiSlice;
