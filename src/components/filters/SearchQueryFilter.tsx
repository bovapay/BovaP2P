import React from 'react';

import { useSearchParams } from 'react-router-dom';
import { OutlinedInput } from '@mui/material';

export default function SearchQueryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <OutlinedInput
      placeholder="Поиск по транзакциям"
      value={searchParams.get('search') || ''}
      onChange={(e) => {
        searchParams.set('search', e.target.value);
        setSearchParams(searchParams);
      }}
    />
  );
}
