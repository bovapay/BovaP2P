import { useState } from 'react';

// material-ui
import { Box, Button, Grid, ListItemText, MenuItem, Stack, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// project import
import MainCard from 'components/MainCard';
import IncomeAreaChart from 'sections/dashboard/default/IncomeAreaChart';
import Accounts from './sections/Accounts';
import PayOuts from './sections/PayOuts';
import MassPayOuts from './sections/MassPayOuts';

import { useGetUserQuery } from 'store/api/user/user.api';
import CurrencyIconSwitcher from 'components/switchers/CurrencyIconSwitcher';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [slot, setSlot] = useState('hour');
  const [selectedCurrency, setCurrency] = useState('rub');

  const { data } = useGetUserQuery();

  const handleChange = (e: SelectChangeEvent) => {
    setCurrency(e.target.value);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      {/* <Finances /> */}
      <Accounts />
      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Общий оборот</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                size="small"
                onClick={() => setSlot('year')}
                color={slot === 'all' ? 'primary' : 'secondary'}
                variant={slot === 'all' ? 'outlined' : 'text'}
              >
                Всё время
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Год
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('day')}
                color={slot === 'day' ? 'primary' : 'secondary'}
                variant={slot === 'day' ? 'outlined' : 'text'}
              >
                Месяц
              </Button>
              {/* <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Неделя
              </Button> */}
              <Button
                size="small"
                onClick={() => setSlot('hour')}
                color={slot === 'hour' ? 'primary' : 'secondary'}
                variant={slot === 'hour' ? 'outlined' : 'text'}
              >
                Сутки
              </Button>

              <Select
                onChange={handleChange}
                value={selectedCurrency}
                size="small"
                sx={{
                  'div:first-child': { display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }
                }}
              >
                {data &&
                  data.p2p_balances.map((i, index) => (
                    <MenuItem
                      key={index}
                      value={i.currency}
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', pr: 5 }}
                    >
                      <CurrencyIconSwitcher currency={i.currency || ''} height={16} />
                      <ListItemText primary={i.currency.toUpperCase()} />
                    </MenuItem>
                  ))}
              </Select>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart slot={slot} selectedCurrency={selectedCurrency} />
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
