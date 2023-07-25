import { Grid, Typography } from '@mui/material';

import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { useGetUserQuery } from 'store/api/user/user.api';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';

const Accounts = () => {
  const { data, isLoading } = useGetUserQuery();

  const p2pRub = data?.p2p_balances.find((i) => i.currency === 'rub');

  const p2pGel = data?.p2p_balances.find((i) => i.currency === 'gel');

  const p2pIdr = data?.p2p_balances.find((i) => i.currency === 'idr');
  return (
    <>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Счета</Typography>
      </Grid>
      {p2pRub && (
        <Grid item xs={12} sm={6} lg={3}>
          <AnalyticEcommerce
            title="P2P (RUB)"
            count={p2pRub?.amount ? transformCurrencyValue(+p2pRub?.amount, { currency: 'RUB' }) : 'Нет данных'}
          />
        </Grid>
      )}
      {p2pGel && (
        <Grid item xs={12} sm={6} lg={3}>
          <AnalyticEcommerce
            title="P2P (GEL)"
            count={p2pGel?.amount ? transformCurrencyValue(+p2pGel?.amount, { currency: 'RUB' }) : 'Нет данных'}
          />
        </Grid>
      )}
      {/* <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="P2P–СБП (RUB)" count="$ 10 000" percentage={27.4} isLoss color="warning" extra="≈ ₽ 11 556 937 " />
      </Grid> */}
      {p2pIdr && (
        <Grid item xs={12} sm={6} lg={3}>
          <AnalyticEcommerce
            title="P2P (IDR)"
            count={p2pGel?.amount ? transformCurrencyValue(+p2pGel?.amount, { currency: 'RUB' }) : 'Нет данных'}
          />
        </Grid>
      )}
    </>
  );
};
export default Accounts;
