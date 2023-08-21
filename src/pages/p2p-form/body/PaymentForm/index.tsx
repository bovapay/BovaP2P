// material-ui
import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material';

import { CheckOutlined } from '@ant-design/icons';
import useGetTransactionData from 'pages/p2p-form/useGetTransactionData';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import TimerContent from '../TimerContent/TimerContent';
import { useAcceptP2PMutation, useCancelP2PMutation } from 'store/api/p2p/p2p.api';
import ConfirmModal from 'components/shared/ConfirmModal';
import { FormattedMessage } from 'react-intl';
import PaymentCard from './PaymentCard';

// ==============================|| BASIC WIZARD - PAYMENT  ||============================== //

export default function PaymentForm() {
  const { data, refetch } = useGetTransactionData();
  const [accept] = useAcceptP2PMutation();
  const [cancel] = useCancelP2PMutation();

  async function onCancelSubmit() {
    if (!data?.payload.id) {
      return;
    }
    await cancel({ id: data?.payload.id });
    refetch();
  }
  async function onAcceptClick() {
    if (!data?.payload.id) {
      return;
    }
    await accept({ id: data?.payload.id });
    refetch();
  }

  const isPaid = data?.payload.state === 'paid';

  const initialDate = new Date(data?.payload.close_at as string).getTime();
  const countDownStart = new Date(data?.payload.updated_at as string).getTime();

  return (
    <>
      <Typography sx={{ color: 'var(--character-secondary, #8C8C8C)', textAlign: 'center', fontWeight: 500 }}>
        <FormattedMessage id="toPayThBill" />{' '}
        <Typography component={'b'} sx={{ color: 'var(--day-title, #262626)', fontWeight: 700 }}>
          <FormattedMessage id="exactly" />
          &bnsp;
          {transformCurrencyValue(data?.payload.amount ? +data?.payload.amount : 0, { currency: data?.payload.currency as 'rub' })}
        </Typography>{' '}
        <FormattedMessage id="byCardNumber" />.
        <br />
        <FormattedMessage id="payWithOnlyOne" />.
      </Typography>

      <PaymentCard data={data} />

      <Box sx={{ width: '100%', maxWidth: '512px' }}>
        {isPaid ? (
          <>
            <LinearProgress />

            <Typography
              sx={{
                color: 'var(--day-title, #262626)',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: 700,
                mt: '16px'
              }}
            >
              <FormattedMessage id="findingYourTransfer" />
              ...
            </Typography>
          </>
        ) : (
          <TimerContent countDownStart={countDownStart} initialDate={initialDate} />
        )}
      </Box>
      {!isPaid && (
        <Stack
          gap={{ sm: '20px', xs: '10px' }}
          direction={{ sm: 'row' }}
          justifyContent={'center'}
          sx={{
            width: '100%',
            button: {
              minWidth: { sm: 'auto', xs: '80%' }
            }
          }}
        >
          <Button onClick={onAcceptClick} startIcon={<CheckOutlined />} variant="contained" sx={{ textTransform: 'initial' }}>
            <FormattedMessage id="iSentMoney" />
          </Button>
          <ConfirmModal onSubmit={onCancelSubmit} />
        </Stack>
      )}
    </>
  );
}
