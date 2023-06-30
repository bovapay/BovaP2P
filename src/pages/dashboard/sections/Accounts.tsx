import { Grid, Typography } from '@mui/material';

import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

const Accounts = () => {
  return (
    <>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Счета</Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="P2P (RUB)" count="$ 1 351 000" percentage={59.3} extra="₽ 114 375 660" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="P2P–СБП (RUB)" count="$ 136 510" percentage={70.5} extra="≈ ₽ 11 556 937" />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="P2P (GEL)" count="$ 10 000" percentage={27.4} isLoss color="warning" extra="≈ ₽ 11 556 937 " />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="P2P (IDR) " count="$ 10 000" percentage={27.4} isLoss color="warning" extra="≈ ₽ 11 556 937 " />
      </Grid>
    </>
  );
};
export default Accounts;
