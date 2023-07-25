import React from 'react';

import { Divider, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import OutlinedNumberInput from 'components/shared/OutlinedNumberInput';

export default function AmountRangeQueryPicker() {
  const theme = useTheme();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Stack spacing={2} direction={'row'}>
      <OutlinedNumberInput
        placeholder="От"
        size="small"
        value={searchParams.get('amountFrom') || ''}
        sx={{ width: 70 }}
        onChange={(e) => {
          searchParams.set('amountFrom', e.target.value);
          setSearchParams(searchParams);
        }}
      />

      <Stack alignItems={'center'} justifyContent={'center'}>
        <Divider
          orientation="vertical"
          sx={{ borderWidth: 1, transform: 'rotate(90deg)', height: 12, borderColor: theme.palette.secondary[400] }}
        />
      </Stack>

      <OutlinedNumberInput
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        placeholder="До"
        size="small"
        value={searchParams.get('amountTo') || ''}
        sx={{ width: 70 }}
        onChange={(e) => {
          searchParams.set('amountTo', e.target.value);
          setSearchParams(searchParams);
        }}
      />
    </Stack>
  );
}
