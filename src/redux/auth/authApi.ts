import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';

export const authApi = createApi({
  reducerPath: 'Auth',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder: any) => ({
    register: builder.mutation({
      query: (userData: { name: string; email: string; password: string }) => ({
        url: 'auth/signup',
        method: 'POST',
        data: userData,
      }),

      providesTags: ({ email }: { email: string }) => [
        { type: 'Auth', id: email },
      ],
    }),
    login: builder.mutation({
      query: (userData: { email: string; password: string }) => {
        return {
          url: 'auth/signin',
          method: 'POST',
          data: userData,
        };
      },
      providesTags: ({ email }: { email: string }) => [
        { type: 'Auth', id: email },
      ],
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: 'auth/delete/account',
        method: 'DELETE',
        // credentials: 'include',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),

  tagTypes: ['Auth'],
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useDeleteAccountMutation,
} = authApi;
