import React from 'react';

import { OutlinedInput } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

export default function ReceiverQueryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <OutlinedInput
      placeholder="Карта или номер"
      size="small"
      value={searchParams.get('receiver') || ''}
      onChange={(e) => {
        searchParams.set('receiver', e.target.value);
        setSearchParams(searchParams);
      }}
    />
  );
}
