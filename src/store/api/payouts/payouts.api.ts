import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from '../../base-query';
import { IPayoutsItem } from './payouts.types';
import { QueryType } from 'types/shared';

export const payoutsApi = createApi({
  reducerPath: 'payoutsApi',
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getPayouts: builder.query<
      IPayoutsItem[],
      {
        per?: number;
        page?: string | number;
        state?: QueryType;
        states?: string[];
        search_id?: string;
        card_number?: QueryType;
        search?: QueryType;
        sort?: QueryType;
        device_id?: QueryType;
        material_id?: QueryType;
        amount?: QueryType;
        amountFrom?: QueryType;
        amountTo?: QueryType;
        dateTo?: QueryType;
        dateFrom?: QueryType;
      }
    >({
      query: ({ page, ...params }) => {
        let query = `withdraws?`;

        if (page) {
          query = query + `&page=${page}`;
        }
        if (params.search) {
          query = query + '&q[term]=' + params.search;
        }
        if (params.state) {
          query = query + '&q[status_cont]=' + (params.state === 'all' ? '' : params.state);
        }
        if (params.states) {
          query = query + params.states?.map((i) => '&q[status_in][]=' + i).join('');
        }
        if (params.search_id) {
          query = query + `&q[id_eq]=${params.search_id}`;
        }
        if (params.card_number) {
          query = query + `&q[card_number]=${params.card_number}`;
        }
        if (params.amount) {
          query = query + `&q[amount_eq]=${params.amount}`;
        }
        if (params.amountFrom) {
          query = query + `&q[amount_gteq]=${params.amountFrom}`;
        }
        if (params.amountTo) {
          query = query + `&q[amount_lteq]=${params.amountTo}`;
        }
        if (params.dateFrom) {
          query = query + `&q[created_at_gt]=${new Date(+params.dateFrom).toISOString()}`;
        }
        if (params.dateTo) {
          query = query + `&q[created_at_lt]=${new Date(+params.dateTo).toISOString()}`;
        }
        return query;
      }
    })
  })
});

export const { useGetPayoutsQuery, useLazyGetPayoutsQuery } = payoutsApi;
