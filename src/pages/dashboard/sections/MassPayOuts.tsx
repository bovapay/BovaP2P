import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link, Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from '@mui/material';
import MainCard from 'components/MainCard';
import { useGetMassPayoutsQuery } from 'store/api/mass-payouts/mass-payouts.api';
import { parseDate } from 'utils/parseDate';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import MassStatusSwitcher from 'components/switchers/MassStatusSwitcher';
import TableLoader from 'components/shared/TableLoader';

// ==========================|| DATA WIDGET - LATEST MESSAGES ||========================== //

const MassPayOuts = () => {
  const { data, isLoading, isFetching } = useGetMassPayoutsQuery({});
  return (
    <Grid item md={6} sx={{ stretch: '100%', height: '100%' }}>
      {/* <MainCard title="Выводы средств" content={false} secondary={}>
      <CardContent></CardContent>
    </MainCard> */}
      <MainCard
        content={false}
        title="Массовые выплаты"
        secondary={
          <Link component={RouterLink} to="/massPayOut" color="primary">
            Смотреть всё
          </Link>
        }
        sx={{ stretch: '100%', height: '100%' }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 3 }}>Дата </TableCell>
                <TableCell align="left">Статус</TableCell>
                <TableCell>Сумма </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && isFetching && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <TableLoader />
                  </TableCell>
                </TableRow>
              )}
              {data &&
                data.slice(0, 5).map((row, index) => (
                  <TableRow hover key={index} sx={{ borderBottom: '1px solid #f0f0f0' }}>
                    <TableCell sx={{ pl: 3, py: 2 }} component="th" scope="row">
                      {parseDate(row.created_at)}
                    </TableCell>
                    <TableCell align="left">
                      <MassStatusSwitcher status={row.state} />
                    </TableCell>
                    <TableCell>{transformCurrencyValue(+row.amount, { currency: 'rub' })}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </Grid>
  );
};

export default MassPayOuts;
