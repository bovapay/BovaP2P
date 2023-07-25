import { IMutationBase } from 'utils/helpers/shared-api';

interface IResipientCard {
  id: string;
  number: string;
  bank_name: string;
  bank_colors: {};
  brand: string;
  updated_at: string;
  created_at: string;
}
export interface IDealItem {
  id: string;
  amount: string;
  old_amount: string;
  currency: string;
  form_url: string;
  state: string;
  created_at: string;
  updated_at: string;
  close_at: string;
  callback_url: string;
  redirect_url: string;
  email: null;
  customer_name: null;
  card_number: null;
  resipient_card: IResipientCard;
}

export interface IDisputeItem {
  id: number;
  state: string;
  proof_image: string;
  proof_image2: string;
  p2p_transaction_id: string;
  repeated: boolean;
  amount: number;
  updated_at: string;
  created_at: string;
  resipient_card: IResipientCard;
}
