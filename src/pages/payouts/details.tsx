// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { useMediaQuery, Grid, Divider, List, ListItem, Stack, TableCell, TableRow, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

// assets
import { CheckOutlined } from '@ant-design/icons';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import { IPayoutsItem } from 'store/api/payouts/payouts.types';
import { typeTextSwitcher } from './item';
import { parseDate } from 'utils/parseDate';

// ==============================|| EXPANDING TABLE - USER DETAILS ||============================== //

const PayoutDetail = ({ data }: { data: IPayoutsItem }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  const backColor = alpha(theme.palette.primary.lighter, 0.1);

  return (
    <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
      <TableCell colSpan={8} sx={{ p: 2.5 }}>
        <Grid container alignItems={'stretch'} spacing={2.5}>
          <Grid item xs={12} sm={6} md={6} xl={6} sx={{ stretch: '100%' }}>
            <MainCard sx={{ height: '100%' }}>
              <Grid container sx={{ height: '100%', justifyContent: 'space-between', flexDirection: 'column' }} spacing={3}>
                <Grid item xs={12} sx={{ height: '100%', justifyContent: 'space-between', flexDirection: 'column' }}>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar color="success" size="xl">
                      <CheckOutlined />
                    </Avatar>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{typeTextSwitcher(data.type_of)}</Typography>
                      <Typography color="secondary">{data.txid || 'Нет данных об id транзакции'}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-around" alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                      <Typography color="secondary">Валюта</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {data.currency.toUpperCase()}
                      </Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography color="secondary">Сумма</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {transformCurrencyValue(data.amount ? +data.amount : 0, { currency: data.currency as 'rub' })}
                      </Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />

                    <Stack spacing={0.5} alignItems="center">
                      <Typography color="secondary">Курс</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {transformCurrencyValue(data.rate_usdt ? +data.rate_usdt : 0)}
                      </Typography>{' '}
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={6} sx={{ stretch: '100%' }}>
            <Stack spacing={2.5} sx={{ height: '100%' }}>
              <MainCard title="Информация об операции" sx={{ height: '100%' }}>
                <List sx={{ py: 0, height: '100%' }}>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Дата создания</Typography>
                          <Typography>{parseDate(data.created_at)}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Комментарий</Typography>
                      <Typography>{data.comment || 'Отстуствует'}</Typography>
                    </Stack>
                  </ListItem>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </List>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default PayoutDetail;
