import React, { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'store';
import { setP2PAmount, setP2PBank, setP2PCard, setP2PCurrency } from 'store/reducers/p2p-test';

export default function useGetTransactionData() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const responseState = useSelector((state) => state.p2pTestSlice);

  const amount = searchParams.get('amount');
  useEffect(() => {
    dispatch(setP2PAmount(amount || ''));
  }, [amount]);
  const bank = searchParams.get('bank');
  useEffect(() => {
    dispatch(setP2PBank(bank || ''));
  }, [bank]);
  const currency = searchParams.get('currency');
  useEffect(() => {
    dispatch(setP2PCurrency(currency || ''));

    currency === 'gel' && dispatch(setP2PCard('GE63BG0000000231219345'));
    currency === 'byn' && dispatch(setP2PCard('BY41UNBS30145620011283451865'));
  }, [currency]);
  return { data: responseState, isLoading: false, isError: false, refetch: () => null };
}
