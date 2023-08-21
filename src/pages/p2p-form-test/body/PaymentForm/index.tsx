// material-ui
import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material';

import { CheckOutlined } from '@ant-design/icons';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import { useDispatch } from 'store';
import { setP2PState } from 'store/reducers/p2p-test';
import { FormattedMessage } from 'react-intl';
import TimerContent from '../../../p2p-form/body/TimerContent/TimerContent';
import ConfirmModal from 'components/shared/ConfirmModal';
import useGetTransactionData from 'pages/p2p-form-test/useGetTransactionData';
import PaymentCard from 'pages/p2p-form/body/PaymentForm/PaymentCard';

// ==============================|| BASIC WIZARD - PAYMENT  ||============================== //

export default function PaymentForm() {
  const { data } = useGetTransactionData();
  const dispatch = useDispatch();

  async function onCancelSubmit() {
    dispatch(setP2PState('failed'));
  }
  async function onAcceptClick() {
    dispatch(setP2PState('paid'));
    setTimeout(() => dispatch(setP2PState('successed')), 5000);
  }

  const isPaid = data?.payload.state === 'paid';

  const initialDate = new Date(data?.payload.close_at as string).getTime();
  const countDownStart = new Date(+data?.payload.updated_at).getTime();

  return (
    <>
      <Typography sx={{ color: 'var(--character-secondary, #8C8C8C)', textAlign: 'center', fontWeight: 500 }}>
        <FormattedMessage id="toPayThBill" />{' '}
        <Typography component={'b'} sx={{ color: 'var(--day-title, #262626)', fontWeight: 700 }}>
          <FormattedMessage id="exactly" />
          &nbsp;
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
