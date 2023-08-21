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
import { ReactComponent as CredoBank } from 'assets/icons/banks/credo_bank.svg';
import { ReactComponent as TbcBank } from 'assets/icons/banks/tbc_bank.svg';
import { ReactComponent as BankOfGeorgia } from 'assets/icons/banks/bank_of_georgia.svg';
import { ReactComponent as OptimaBank } from 'assets/icons/banks/optima_bank.svg';
import { ReactComponent as KicbBank } from 'assets/icons/banks/kicb_bank.svg';
import { ReactComponent as KremetBank } from 'assets/icons/banks/keremet_bank.svg';
import { ReactComponent as BriBank } from 'assets/icons/banks/bri_bank.svg';
import { ReactComponent as BniBank } from 'assets/icons/banks/bni_bank.svg';
import { ReactComponent as MandiriBank } from 'assets/icons/banks/mandiri_bank.svg';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/material';

export default function BankSwitcher({
  bank,
  select,
  activeSelect,
  onSelect
}: {
  bank: string;
  select?: boolean;
  activeSelect?: boolean;
  onSelect?(): void;
}) {
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
      case 'credo_bank':
        return <CredoBank />;
      case 'tbc_bank':
        return <TbcBank />;
      case 'bank_of_georgia':
        return <BankOfGeorgia />;
      case 'optima_bank':
        return <OptimaBank />;
      case 'kicb_bank':
        return <KicbBank />;
      case 'keremet_bank':
        return <KremetBank />;
      case 'bri_bank':
        return <BriBank />;
      case 'bni_bank':
        return <BniBank />;
      case 'mandiri_bank':
        return <MandiriBank />;
      default:
        return false;
    }
  }
  const logo = getLogo();
  function getTitle() {
    switch (bank) {
      case 'sberbank':
        return 'Sberbank';
      case 'raiffeisen':
        return 'Raiffeisen';
      case 'tinkoff':
        return 'Tinkoff';
      case 'belinvest':
        return 'Belinvest';
      case 'mt_bank':
        return 'MT Bank';
      case 'bsb_bank':
        return 'BSB';
      case 'technobank':
        return 'Technobank';
      case 'bnb_bank':
        return 'BNB';
      case 'alfa_bank':
        return 'Alfa Bank';
      case 'credo_bank':
        return 'Credo Bank';
      case 'tbc_bank':
        return 'TBC Bank';
      case 'bank_of_georgia':
        return 'Bank of Georgia';
      case 'optima_bank':
        return 'OptimaBank';
      case 'kicb_bank':
        return 'KICB';
      case 'keremet_bank':
        return 'Keremet Bank';
      case 'bca_bank':
        return 'BCA Bank';
      case 'bri_bank':
        return 'BRI';
      case 'bni_bank':
        return 'BNI';
      case 'mandiri_bank':
        return 'Mandiri';
      default:
        return bank;
    }
  }
  const title = getTitle();

  if (select) {
    return (
      <Box
        onClick={onSelect}
        sx={{
          height: '70px',
          cursor: 'pointer',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          padding: '11px 11px 11px 15px',
          borderRadius: '4px',
          position: 'relative',
          border: `1px solid ${activeSelect ? '#7265E6' : 'transparent'}`,
          background: 'var(--grad, linear-gradient(90deg, #FAFAFB 0%, #F5F3FA 100%))',
          overflow: 'hidden',
          '&:hover': {
            border: '1px solid #7265E6',
            boxShadow: '0px 4px 30px 0px rgba(114, 101, 230, 0.10)'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            svg: {
              width: '40px',
              height: '40px'
            }
          }}
        >
          {logo}
        </Box>
        <Typography
          sx={{
            fontSize: { xs: '12px', sm: '14px' },
            fontWeight: 500,
            lineHeight: '20px'
          }}
        >
          {title}
        </Typography>
      </Box>
    );
  }
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
