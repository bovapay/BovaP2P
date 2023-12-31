import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IP2PResponse } from 'store/api/p2p/p2p.api';

const createdAt = new Date().getTime();
const closedAt = createdAt + 60 * 35 * 1000;

const initialState: IP2PResponse = {
  result_code: '',
  payload: {
    id: 'test31f6b695a637463c61776bf62dcfcc66dc44',
    merchant_id: '',
    amount: '',
    old_amount: '',
    form_url: '',
    state: 'waiting_payment',
    created_at: createdAt.toString(),
    updated_at: createdAt.toString(),
    close_at: new Date(closedAt).toISOString(),
    callback_url: '/create-test',
    redirect_url: null,
    currency: '',
    resipient_card: {
      id: '',
      number: '4511907772952289',
      sbp: false,
      bank_name: '',
      bank_colors: {},
      brand: 'visa',
      card_holder: '',
      updated_at: '',
      created_at: ''
    }
  }
};

export const p2pTestSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setP2PState: (state, action: PayloadAction<string>) => {
      state.payload.state = action.payload;
    },
    setP2PAmount: (state, action: PayloadAction<string>) => {
      state.payload.amount = action.payload;
    },
    setP2PCurrency: (state, action: PayloadAction<string>) => {
      state.payload.currency = action.payload;
    },
    setP2PCard: (state, action: PayloadAction<string>) => {
      state.payload.resipient_card.number = action.payload;
    },
    setP2PBank: (state, action: PayloadAction<string>) => {
      state.payload.resipient_card.bank_name = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setP2PState, setP2PAmount, setP2PCurrency, setP2PCard, setP2PBank } = p2pTestSlice.actions;

export default p2pTestSlice.reducer;
