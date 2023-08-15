import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'store';
import { setP2PAmount, setP2PCurrency } from 'store/reducers/p2p-test';

export default function useGetTransactionData() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const responseState = useSelector((state) => state.p2pTestSlice);

  const amount = searchParams.get('amount');
  useEffect(() => {
    dispatch(setP2PAmount(amount || ''));
  }, [amount]);
  const currency = searchParams.get('currency');
  useEffect(() => {
    dispatch(setP2PCurrency(currency || ''));
  }, [currency]);
  return { data: responseState, isLoading: false, isError: false, refetch: () => null };
}
