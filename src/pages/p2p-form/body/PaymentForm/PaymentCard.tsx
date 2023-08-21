import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { IP2PResponse } from 'store/api/p2p/p2p.api';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import Bg from 'assets/images/p2p-card-bg.png';
import { paymentColorFullIcons } from 'utils/helpers/paymentColorFulIcons';
import BankSwitcher from './BankSwitcher';
import CardNumberFormat from 'components/shared/CardNumberFormat';
import Copy from 'components/shared/Copy/Copy';

export default function PaymentCard({ data }: { data?: IP2PResponse }) {
  return (
    <Box
      sx={{
        borderRadius: '12px',
        border: '1px solid var(--day-4, #F0F0F0)',
        padding: '20px 20px 20px 20px',
        width: data?.payload.currency === 'gel' || data?.payload.currency === 'byn' ? '450px' : '384px',
        maxWidth: '100%',
        height: { sm: '240px' },
        position: 'relative'
      }}
    >
      <img style={{ zIndex: 0, position: 'absolute', height: '102%', width: '102%', left: -1, top: 0 }} src={Bg} alt="bg" />

      <Stack
        sx={{ height: '100%', zIndex: 2, position: 'relative', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}
      >
        <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'} gap={1}>
          <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>
            {' '}
            <FormattedMessage id="makeTransferByCard" />{' '}
          </Typography>
          <Box sx={{ height: '18px', svg: { height: '100%' } }}>{paymentColorFullIcons[data?.payload?.resipient_card.brand as 'mir']}</Box>
        </Stack>
        <BankSwitcher bank={data?.payload.resipient_card.bank_name || ''} />
        <Box>
          <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
            <Typography
              sx={{
                flexGrow: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: data?.payload.currency === 'byn' || data?.payload.currency === 'gel' ? '14px' : '20px',
                fontWeight: 700,
                color: 'var(--day-title, #262626)'
              }}
            >
              {data?.payload.currency === 'gel' || data?.payload.currency === 'byn' ? (
                data?.payload.resipient_card.number
              ) : (
                <CardNumberFormat value={data?.payload.resipient_card.number} />
              )}
            </Typography>
            <Copy value={data?.payload.resipient_card.number || ''} />
          </Stack>
          <Typography
            sx={{
              color: 'var(--day-7, #8C8C8C)',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            {data?.payload.resipient_card.card_holder}
          </Typography>
        </Box>
        <Typography color={'primary'} sx={{ fontSize: '16px', fontWeight: 700 }}>
          {transformCurrencyValue(data?.payload.amount ? +data?.payload.amount : 0, { currency: data?.payload.currency as 'rub' })}
        </Typography>
      </Stack>
    </Box>
  );
}
