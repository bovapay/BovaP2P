import React from 'react';
import { useParams } from 'react-router';
import { useGetP2PQuery } from 'store/api/p2p/p2p.api';

export default function useGetTransactionData() {
  let { id } = useParams();

  const responseState = useGetP2PQuery({ id: id as 'string' }, { skip: !id, pollingInterval: 7000 });
  return responseState;
}
