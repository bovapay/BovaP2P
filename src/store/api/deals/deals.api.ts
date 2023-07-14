import { PER_PAGE } from 'utils/constants/shared';
import { createApi } from '@reduxjs/toolkit/query/react';
import { DealsStatsRangeType, IConfirmDealResponse, IDealResponse, IDealsResponse, IStatsResponse } from './deals.types';
import baseQueryWithToken from '../../base-query';
import { QueryType } from 'types/shared';
import { setStartDay } from 'types/helpers/dates';

export const dealsApi = createApi({
  reducerPath: 'dealsApi',
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getDeals: builder.query<
      IDealsResponse,
      {
        per?: number;
        page?: string | number;
        state?: string[];
        search_id?: string;
        material_card_number?: QueryType;
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
      query: (params) => {
        let query = `dashboard/v1/orders?&per=${params.per ? params.per : PER_PAGE}`;
        if (params.page) {
          query = query + `&page=${params.page}&q[sorts]=${params.sort ? `${params.sort}` : `created_at DESC`}`;
        }
        if (params.search) {
          query = query + '&q[term]=' + params.search;
        }
        if (params.state) {
          query = query + params.state?.map((i) => '&q[state_in][]=' + i).join('');
        }
        if (params.search_id) {
          query = query + `&q[id_eq]=${params.search_id}`;
        }
        if (params.material_card_number) {
          query = query + `&q[material_card_number_eq]=${params.material_card_number}`;
        }
        if (params.device_id) {
          query = query + `&q[device_id_eq]=${params.device_id}`;
        }
        if (params.material_id) {
          query = query + `&q[material_id_eq]=${params.material_id}`;
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
    }),
    getDeal: builder.query<IDealResponse, { id: string }>({
      query: (params) => `dashboard/v1/orders/${params.id}`
    }),
    getDealsStats: builder.query<
      IStatsResponse,
      {
        with_opened_dispute?: boolean;
        range?: DealsStatsRangeType;
        material_id?: string | number;
        device_id?: string | number;
        currency_eq?: string;
      }
    >({
      query: (params) => {
        let query = `dashboard/v1/orders/stats?`;
        if (params.with_opened_dispute) {
          query = query + `&q[with_opened_dispute]=${params.with_opened_dispute}`;
        }
        if (params.range === 'last_24h') {
          const today = new Date();
          today.setDate(today.getDate() - 1);
          query = query + `&q[created_at_gteq]=${today.toJSON()}`;
        }
        if (params.range === 'today') {
          query = query + `&q[created_at_gteq]=${setStartDay(new Date()).toJSON()}`;
        }
        if (params.range === 'week') {
          const d = new Date();
          const day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
          const weekStart = new Date(d.setDate(diff));
          query = query + `&q[created_at_gteq]=${setStartDay(weekStart).toJSON()}`;
        }
        if (params.range === 'month') {
          const date = new Date();
          const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

          query = query + `&q[created_at_gteq]=${firstDay.toJSON()}`;
        }
        if (params.range === 'year') {
          const yearStart = new Date(new Date().getFullYear(), 0, 1);

          query = query + `&q[created_at_gteq]=${yearStart.toJSON()}`;
        }
        if (params.material_id) {
          query = query + `&q[material_id_eq]=${params.material_id}`;
        }
        if (params.device_id) {
          query = query + `&q[device_id_eq]=${params.device_id}`;
        }
        return query;
      }
    }),
    confirmDeal: builder.mutation<IConfirmDealResponse, { id: string | number }>({
      query: (params) => ({
        url: `dashboard/v1/orders/${params.id}/confirm`,
        method: 'POST'
      })
    })
  })
});

export const { useGetDealsQuery, useLazyGetDealsQuery, useGetDealQuery, useGetDealsStatsQuery, useConfirmDealMutation } = dealsApi;
