import { createApi } from '@reduxjs/toolkit/query/react';
import { IDealItem, IDisputeItem } from './deals.types';
import baseQueryWithToken from '../../base-query';
import { QueryType } from 'types/shared';

export const dealsApi = createApi({
  reducerPath: 'dealsApi',
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getDeals: builder.query<
      IDealItem[],
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
        let query = `p2p_transactions?`;

        if (page) {
          query = query + `&page=${page}`;
        }
        if (params.search) {
          query = query + '&q[term]=' + params.search;
        }
        if (params.state) {
          query = query + '&q[state_cont]=' + (params.state === 'all' ? '' : params.state);
        }
        if (params.states) {
          query = query + params.states?.map((i) => '&q[state_in][]=' + i).join('');
        }
        if (params.search_id) {
          query = query + `&q[id_eq]=${params.search_id}`;
        }
        if (params.card_number) {
          query = query + `&q[number_cont]=${params.card_number}`;
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
    getDeal: builder.query<IDealItem, { id: string }>({
      query: (params) => `p2p_transactions/${params.id}`,
      transformResponse(baseQueryReturnValue: { result_code: string; payload: IDealItem }, meta, arg) {
        return baseQueryReturnValue.payload;
      }
    }),
    getDealDisputes: builder.query<IDisputeItem[], { id: string | number }>({
      query: ({ id }) => `p2p_disputes?q[p2p_tx_uuid_eq]=${id}&page=1`
    }),
    createDealDispute: builder.mutation<any, { amount: number | string; id: string | number; files: File[] }>({
      query: ({ files, id, amount }) => {
        let formdata = new FormData();
        const [file1, file2] = files;
        console.log(file1, file2);
        formdata.append('transaction_id', id.toString());
        formdata.append('p2p_dispute[amount]', amount.toString());
        formdata.append('p2p_dispute[proof_image]', file1);
        if (file2) {
          formdata.append('p2p_dispute[proof_image2]', file2);
        }
        return {
          url: `p2p_disputes`,
          method: 'POST',
          body: formdata
        };
      }
    })
  })
});

export const { useGetDealsQuery, useLazyGetDealsQuery, useGetDealQuery, useGetDealDisputesQuery, useCreateDealDisputeMutation } = dealsApi;
