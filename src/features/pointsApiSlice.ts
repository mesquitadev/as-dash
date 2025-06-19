import { apiSlice } from '@/services/apiSlice';
import { ApiTags } from './types';

export interface Points {
  id: string;
  customerId: string;
  points: number;
  reason: string;
  createdAt: string;
}

export interface AssignPointsRequest {
  customerId: string;
  points: number;
  reason: string;
}

export const pointsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    assignPoints: builder.mutation<void, AssignPointsRequest>({
      query: (body) => ({
        url: '/points',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Points' as ApiTags, id: 'LIST' }],
    }),

    getCustomerPoints: builder.query<Points[], void>({
      query: () => '/points',
      providesTags: [{ type: 'Points' as ApiTags, id: 'LIST' }],
    }),
  }),
});

export const {
  useAssignPointsMutation,
  useGetCustomerPointsQuery
} = pointsApi;
