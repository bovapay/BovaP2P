import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from '../../base-query';
import { IStatsItem } from './stats.types';

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getStats: builder.query<IStatsItem[], { period: string; currency: string }>({
      query: ({ period = 'hour', currency = 'rub' }) => `chart?period=${period}&currency=${currency}`
    })
  })
});

export const { useGetStatsQuery } = statsApi;
