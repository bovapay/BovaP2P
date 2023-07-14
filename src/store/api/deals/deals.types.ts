import { IMutationBase } from 'types/helpers/shared-api';

export interface IDealItem {
  id: string;
  usdt_amount: string;
  rate: string;
  amount: string;
  trader_usdt_income: string;
  bank_name: null | string;
  state: string;
  open_until: string;
  created_at: string;
  paid_at: null;
  confirmed_at: null | string;
  canceled_at: null | string;
  expired_at: null | string;
  material: {
    id: string;
    name: string;
    card_number: string;
    card_brand: string;
    bank_name: string;
    deleted_at: null | string;
  };
  device: {
    device_model: null | string;
    device_brand: null | string;
    id: number;
    uuid: string;
    name: string;
  } | null;
  message: {
    id: number;
    text: string;
    sender: string;
    received_at: string;
  } | null;
}
export interface IDealsResponse {
  data: IDealItem[];
  errors: any;
  message: null | string;
  status: string;
  meta: {
    current_page: number;
    next_page: null | number;
  };
}
export interface IDealResponse {
  data: IDealItem;
  errors: any;
  message: null | string;
  status: string;
  meta: {
    current_page: number;
    next_page: null | number;
  };
}

export interface IStatsResponse {
  data: {
    amount_sum: string;
    amount_sum_fiat: string;
    conversion: string;
    turnover: string;
    turnover_fiat: string;
    trader_income_fiat: string;
    trader_income_usdt: string;
    total_orders_count: number;
    confirmed_orders_count: number;
    canceled_orders_count: number;
    expired_orders_count: number;
    paid_orders_count: number;
    pending_orders_count: number;
  };
  errors: null;
  message: null;
  status: string;
  meta: {};
}

export interface IConfirmDealResponse extends IMutationBase {
  data: IDealItem;
}

export type DealsStatsRangeType = 'last_24h' | 'today' | 'week' | 'month' | 'year';
