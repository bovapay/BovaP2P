import { Fragment } from 'react';

// material-ui
import { Box, Typography, Button, Stack, Link } from '@mui/material';
import { CheckOutlined, CloseOutlined, QuestionOutlined } from '@ant-design/icons';
import Avatar from 'components/@extended/Avatar';
import CardNumberFormat from 'components/shared/CardNumberFormat';
import useGetTransactionData from '../useGetTransactionData';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import { parseDate } from 'utils/parseDate';
import { FormattedMessage } from 'react-intl';

// ==============================|| BASIC WIZARD - REVIEW  ||============================== //

export default function Review() {
  const { data } = useGetTransactionData();

  function getTitle() {
    switch (data?.payload.state) {
      case 'successed':
        return <FormattedMessage id="p2pThirdSucceed" />;
      case 'failed':
        return <FormattedMessage id="p2pThirdFailed" />;
      default:
        return 'Не опознанный статус';
    }
  }
  const title = getTitle();

  function getAvatar() {
    switch (data?.payload.state) {
      case 'successed':
        return (
          <Avatar
            sx={{
              width: '64px',
              height: '64px',
              mb: '20px',
              svg: { width: '36px', height: '36px' }
            }}
            color="success"
          >
            <CheckOutlined />
          </Avatar>
        );
      case 'failed':
        return (
          <Avatar
            sx={{
              width: '64px',
              height: '64px',
              mb: '20px',
              svg: { width: '36px', height: '36px' }
            }}
            color="error"
          >
            <CloseOutlined />
          </Avatar>
        );
      default:
        return (
          <Avatar
            sx={{
              width: '64px',
              height: '64px',
              mb: '20px',
              svg: { width: '36px', height: '36px' }
            }}
            color="secondary"
          >
            <QuestionOutlined />
          </Avatar>
        );
    }
  }
  const avatar = getAvatar();
  return (
    <>
      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%', maxWidth: '460px', pb: '20px' }}>
        <Box>{avatar}</Box>
        <Box sx={{ textAlign: 'center', mb: '20px' }}>
          <Typography
            sx={{
              color: 'var(--day-title, #262626)',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            {title}
          </Typography>
          {data?.payload.state === 'successed' && (
            <Typography
              sx={{
                color: 'var(--character-secondary, #8C8C8C)',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              <FormattedMessage id="transferToTheCard" />{' '}
              <Typography component={'b'} sx={{ fontWeight: 500 }}>
                {data?.payload.currency === 'gel' || data?.payload.currency === 'byn' ? (
                  data?.payload.resipient_card.number
                ) : (
                  <CardNumberFormat value={data?.payload.resipient_card.number} />
                )}
              </Typography>
            </Typography>
          )}
        </Box>
        <Stack sx={{ borderBottom: '1px solid #F0F0F0', borderTop: '1px solid #F0F0F0', py: '20px', width: '100%', flexDirection: 'row' }}>
          <Stack width={'50%'} gap={'10px'} justifyContent={'center'} alignItems={'center'}>
            <Typography sx={{ color: 'var(--character-secondary, #8C8C8C)', fontSize: '14px', fontWeight: 400 }}>
              <FormattedMessage id="sum" />
            </Typography>
            <Typography
              sx={{
                color: 'var(--day-title, #262626)',
                fontSize: '16px',
                fontWeight: 700
              }}
            >
              {transformCurrencyValue(data?.payload.amount ? +data?.payload.amount : 0, { currency: data?.payload.currency as 'rub' })}
            </Typography>
          </Stack>
          <Stack width={'50%'} gap={'10px'} justifyContent={'center'} alignItems={'center'}>
            <Typography sx={{ color: 'var(--character-secondary, #8C8C8C)', fontSize: '14px', fontWeight: 400 }}>
              <FormattedMessage id="paymentDate" />
            </Typography>
            <Typography
              sx={{
                color: 'var(--day-title, #262626)',
                fontSize: '16px',
                fontWeight: 700
              }}
            >
              {data?.payload.updated_at && parseDate(new Date())}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Link href={data?.payload.callback_url || ''}>
        <Button size="large" variant="contained" sx={{ textTransform: 'initial' }}>
          <FormattedMessage id="backToShop" />
        </Button>
      </Link>
    </>
  );
}
