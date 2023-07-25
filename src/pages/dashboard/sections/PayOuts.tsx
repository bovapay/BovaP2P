import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { CardContent, Grid, Link, Stack, Typography } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import TableLoader from 'components/shared/TableLoader';

// assets
import { CreditCardOutlined } from '@ant-design/icons';
import { useGetPayoutsQuery } from 'store/api/payouts/payouts.api';
import { parseDate } from 'utils/parseDate';
import { EmptyTable } from 'components/third-party/ReactTable';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import { typeTextSwitcher } from 'pages/payouts/item';

// ==========================|| DATA WIDGET - LATEST MESSAGES ||========================== //

const PayOuts = () => {
  const { data, isLoading, isFetching } = useGetPayoutsQuery({});

  function statusColorSwitcher(status: string) {
    switch (status) {
      case 'failed':
        return 'error';
      case 'confirmed':
        return 'warning';
      case 'pending':
        return 'warning';
      case 'payed':
        return 'success';
      default:
        return 'secondary';
    }
  }
  return (
    <Grid item xs={12} md={6} sx={{ stretch: '100%' }}>
      <MainCard
        title="Финансовые операции"
        content={false}
        secondary={
          <Link component={RouterLink} to="/payOut" color="primary">
            Смотреть всё
          </Link>
        }
        sx={{ minHeight: 352, height: '100%' }}
      >
        <CardContent>
          {data && data.length === 0 && (
            <Stack alignItems={'center'} justifyContent={'center'}>
              <EmptyTable msg="Нет выводов" />
            </Stack>
          )}

          {isLoading && <TableLoader />}

          <Grid
            container
            spacing={3}
            alignItems="center"
            sx={{
              position: 'relative',
              '&>*': {
                position: 'relative',
                zIndex: '5'
              },
              '&:after': {
                content: '""',
                position: 'absolute',
                top: 8,
                left: 153,
                width: 2,
                height: '100%',
                background: '#ebebeb',
                zIndex: '1'
              }
            }}
          >
            {isLoading && isFetching && <TableLoader />}
            {data &&
              data?.length > 0 &&
              data.slice(0, 4).map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Grid container spacing={2}>
                    <Grid item sx={{ width: 164 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={8}>
                          <Typography align="left" variant="caption" color="secondary" sx={{ width: '100%' }}>
                            {parseDate(item.created_at)}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Avatar color={statusColorSwitcher(item.status) as 'primary'}>
                            <CreditCardOutlined />
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography component="div" align="left" variant="subtitle1">
                            {transformCurrencyValue(+item?.amount, { currency: 'RUB' })}
                          </Typography>
                          <Typography color="secondary" align="left" variant="caption">
                            {typeTextSwitcher(item.type_of)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </CardContent>
      </MainCard>
    </Grid>
  );
};

export default PayOuts;
