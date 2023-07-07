// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { useMediaQuery, Grid, Divider, List, ListItem, Stack, TableCell, TableRow, Typography } from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';

// project import
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

// assets
import { CheckOutlined } from '@ant-design/icons';
import { currencySign } from 'utils/transformCurrencyValue';

// ==============================|| EXPANDING TABLE - USER DETAILS ||============================== //

const MassPayoutDetail = ({ data }: any) => {
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
                      <Typography variant="h5">Успешная выплата</Typography>
                      <Typography color="secondary">#1</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-around" alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                      <Typography color="secondary">Сумма выплаты</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {currencySign.RUB} 1 000
                      </Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography color="secondary">Валюта</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        RUB
                      </Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography color="secondary">Сумма в USDT</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        11,31
                      </Typography>{' '}
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography color="secondary">Курс</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        88,88
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
              <MainCard title="Информация о выплате" sx={{ height: '100%' }}>
                <List sx={{ py: 0, height: '100%' }}>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Дата создания</Typography>
                          <Typography>23.03, 15:45</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Дата обновления статуса</Typography>
                          <Typography>Зачислена: 23.03, 15:55</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Получатель</Typography>
                          <Typography>Павел Андреевич П.</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Карта получателя</Typography>
                          <Typography>
                            <PatternFormat displayType="text" format="#### ##** **** ####" mask="_" defaultValue={'4276543466665341'} />
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Комментарий</Typography>
                      <Typography>Отстуствует</Typography>
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

export default MassPayoutDetail;
