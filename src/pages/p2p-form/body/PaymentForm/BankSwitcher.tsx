import React from 'react';

import { ReactComponent as Tinkoff } from 'assets/icons/banks/tinkoff.svg';
import { ReactComponent as Sber } from 'assets/icons/banks/sberbank.svg';
import { ReactComponent as Raif } from 'assets/icons/banks/raiffeisen.svg';
import { ReactComponent as Belinvest } from 'assets/icons/banks/belinvest.svg';
import { ReactComponent as BsbBank } from 'assets/icons/banks/bsb_bank.svg';
import { ReactComponent as MtBank } from 'assets/icons/banks/mt_bank.svg';
import { ReactComponent as Technobank } from 'assets/icons/banks/technobank.svg';
import { ReactComponent as BnbBank } from 'assets/icons/banks/bnb_bank.svg';
import { ReactComponent as AlfaBank } from 'assets/icons/banks/alfa_bank.svg';
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
      case 'belinvest':
        return <Belinvest />;
      case 'mt_bank':
        return <MtBank />;
      case 'bsb_bank':
        return <BsbBank />;
      case 'technobank':
        return <Technobank />;
      case 'bnb_bank':
        return <BnbBank />;
      case 'alfa_bank':
        return <AlfaBank />;
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
            svg: { height: '100%', width: '100%' }
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
