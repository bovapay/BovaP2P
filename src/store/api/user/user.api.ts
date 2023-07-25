import { createApi } from '@reduxjs/toolkit/query/react';
import { UserProfile } from 'types/auth';
import baseQueryWithToken from '../../base-query';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getUser: builder.query<UserProfile, void>({
      query: () => `user`
    })
  })
});

export const { useGetUserQuery } = userApi;
