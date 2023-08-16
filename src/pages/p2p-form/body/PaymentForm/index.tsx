// material-ui
import { Box, Button, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material';

import Bg from 'assets/images/p2p-card-bg.png';
import { paymentColorFullIcons } from 'utils/helpers/paymentColorFulIcons';
import CardNumberFormat from 'components/shared/CardNumberFormat';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import useGetTransactionData from 'pages/p2p-form/useGetTransactionData';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import BankSwitcher from './BankSwitcher';
import TimerContent from '../TimerContent/TimerContent';
import Copy from 'components/shared/Copy/Copy';
import { useAcceptP2PMutation, useCancelP2PMutation } from 'store/api/p2p/p2p.api';
import ConfirmModal from 'components/shared/ConfirmModal';
import { FormattedMessage } from 'react-intl';

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
          <FormattedMessage id="exactly" />{' '}
          {transformCurrencyValue(data?.payload.amount ? +data?.payload.amount : 0, { currency: data?.payload.currency as 'rub' })}
        </Typography>{' '}
        <FormattedMessage id="byCardNumber" />.
        <br />
        <FormattedMessage id="payWithOnlyOne" />.
      </Typography>

      <Box
        sx={{
          borderRadius: '12px',
          border: '1px solid var(--day-4, #F0F0F0)',
          padding: '20px 20px 20px 20px',
          width: '384px',
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
            <Box sx={{ height: '18px', svg: { height: '100%' } }}>
              {paymentColorFullIcons[data?.payload?.resipient_card.brand as 'mir']}
            </Box>
          </Stack>
          <BankSwitcher bank={data?.payload.resipient_card.bank_name || ''} />
          <Box>
            <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
              <Typography sx={{ fontSize: '20px', fontWeight: 700, color: 'var(--day-title, #262626)' }}>
                <CardNumberFormat value={data?.payload.resipient_card.number} />
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
