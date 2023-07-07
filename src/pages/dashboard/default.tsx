import { useState } from 'react';

// material-ui
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import IncomeAreaChart from 'sections/dashboard/default/IncomeAreaChart';
import Finances from './sections/Finances';
import Accounts from './sections/Accounts';
import PayOuts from './sections/PayOuts';
import MassPayOuts from './sections/MassPayOuts';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [slot, setSlot] = useState('week');

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Finances />
      <Accounts />
      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Общий оборот</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('all')}
                color={slot === 'all' ? 'primary' : 'secondary'}
                variant={slot === 'all' ? 'outlined' : 'text'}
              >
                Всё время
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('year')}
                color={slot === 'year' ? 'primary' : 'secondary'}
                variant={slot === 'year' ? 'outlined' : 'text'}
              >
                Год
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Месяц
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Неделя
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('day')}
                color={slot === 'day' ? 'primary' : 'secondary'}
                variant={slot === 'day' ? 'outlined' : 'text'}
              >
                Сутки
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item container rowSpacing={4.5} columnSpacing={2.75} sx={{ alignItems: 'stretch' }}>
        <PayOuts />
        <MassPayOuts />
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
