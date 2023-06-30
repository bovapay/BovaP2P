import { Grid, Typography } from '@mui/material';

import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

const Finances = () => {
  return (
    <>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Финансы</Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <AnalyticEcommerce title="Общий баланс" count="$ 1 351 000" percentage={59.3} extra="≈ ₽ 114 375 660" />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <AnalyticEcommerce title="Общий доход" count="$ 136 510" percentage={70.5} extra="≈ ₽ 11 556 937 " />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <AnalyticEcommerce title="Последний вывод средств" count="$ 10 000" color="warning" extra="26.06.23, в 22:53" />
      </Grid>
    </>
  );
};
export default Finances;
