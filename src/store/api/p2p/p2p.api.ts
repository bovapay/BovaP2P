import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from '../../base-query';

export interface IP2PResponse {
  result_code: string;
  payload: {
    id: string;
    merchant_id: string;
    amount: string;
    old_amount: string;
    form_url: string;
    state: string;
    created_at: string;
    updated_at: string;
    close_at: string;
    callback_url: string;
    redirect_url: null;
    currency: string;
    resipient_card: {
      id: string;
      number: string;
      sbp: boolean;
      bank_name: string;
      bank_colors: {};
      brand: string;
      card_holder: string;
      updated_at: string;
      created_at: string;
    };
  };
}

export const p2pApi = createApi({
  reducerPath: 'p2pApi',
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getP2P: builder.query<IP2PResponse, { id: string | number }>({
      query: ({ id }) => `p2p_transactions/${id}`
    }),
    acceptP2P: builder.mutation<any, { id: string | number }>({
      query: ({ id }) => {
        return {
          url: `p2p_transactions/${id}/paid`,
          method: 'PUT',
          body: { id: id }
        };
      }
    }),
    cancelP2P: builder.mutation<any, { id: string | number }>({
      query: ({ id }) => {
        return {
          url: `p2p_transactions/${id}/cancel`,
          method: 'PUT',
          body: { id: id }
        };
      }
    })
  })
});

export const { useGetP2PQuery, useAcceptP2PMutation, useCancelP2PMutation } = p2pApi;
