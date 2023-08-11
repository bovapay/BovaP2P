import React from 'react';

import { ReactComponent as Tinkoff } from 'assets/icons/banks/tinkoff.svg';
import { ReactComponent as Sber } from 'assets/icons/banks/sberbank.svg';
import { ReactComponent as Raif } from 'assets/icons/banks/raiffeisen.svg';
import { Stack, Typography } from '@mui/material';

export default function BankSwitcher({ bank }: { bank: string }) {
  function getLogo() {
    switch (bank) {
      case 'sberbank':
        return <Sber />;
      case 'raiffeisen':
        return <Raif />;
      case 'tinkoff':
        return <Tinkoff />;
      default:
        return false;
    }
  }
  const logo = getLogo();
  function getTitle() {
    switch (bank) {
      case 'sberbank':
        return 'Сбербанк';
      case 'raiffeisen':
        return 'Райффайзен Банк';
      case 'tinkoff':
        return 'Тинькофф банк';
      default:
        return bank;
    }
  }
  const title = getTitle();
  return (
    <Stack alignItems={'center'} flexDirection={'row'} gap={'10px'}>
      {logo && (
        <Stack
          sx={{
            width: '40px',
            height: '40px',
            padding: '5px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            border: '1px solid #EAEAEA',
            background: '#FAFAFA',
            svg: { height: '100%' }
          }}
        >
          {logo}
        </Stack>
      )}
      <Typography
        sx={{
          color: 'var(--day-7, #8C8C8C)',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 500
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
}
