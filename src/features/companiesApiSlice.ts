import { apiSlice } from '@/services/apiSlice';

interface Company {
  id: string;
  name: string;
  address?: string; // Adicione outros campos conforme necessário
}

interface CompaniesResponse {
  content: Company[];
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
}

const companiesEndpoint = '/company';

const companyEndpoint = (id: string) => `/company/${id}`;

function createCompany(data: Company) {
  return { url: companiesEndpoint, method: 'POST', body: data };
}

function getCompanies({ page = 0, size = 10, sort = 'name,asc' }: GetCompaniesParams) {
  return {
    url: `${companiesEndpoint}?page=${page}&size=${size}&sort=${sort}`,
    method: 'GET',
  };
}

function getCompany(id: string) {
  return { url: companyEndpoint(id), method: 'GET' };
}

function updateCompany(data: Company) {
  return { url: companyEndpoint(data.id), method: 'PUT', body: data };
}

function deleteCompany(id: string) {
  return { url: companyEndpoint(id), method: 'DELETE' };
}

export const companiesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCompanies: query<CompaniesResponse, GetCompaniesParams>({
      query: getCompanies,
      providesTags: (result) =>
        result ? result.content.map(({ id }) => ({ type: 'Companies', id })) : ['Companies'],
    }),
    getCompany: query<Company, string>({
      query: getCompany,
      providesTags: (result, error, id) => [{ type: 'Companies', id }],
    }),
    createCompany: mutation<void, Company>({
      query: createCompany,
      invalidatesTags: ['Companies'],
    }),
    updateCompany: mutation<void, Company>({
      query: updateCompany,
      invalidatesTags: (result, error, { id }) => [{ type: 'Companies', id }],
    }),
    deleteCompany: mutation<void, string>({
      query: deleteCompany,
      invalidatesTags: (result, error, id) => [{ type: 'Companies', id }],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companiesApiSlice;
