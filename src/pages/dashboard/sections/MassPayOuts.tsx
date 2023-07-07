import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Chip } from '@mui/material';
import MainCard from 'components/MainCard';
import { LabelKeyObject } from 'react-csv/components/CommonPropTypes';

// ==========================|| DATA WIDGET - LATEST MESSAGES ||========================== //
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('24.06, 12:23', 159, 6.0, 24, 4.0),
  createData('24.06, 12:23 ', 237, 9.0, 37, 4.3),
  createData('24.06, 12:23 ', 262, 16.0, 24, 6.0),
  createData('24.06, 12:23 ', 305, 3.7, 67, 4.3),
  createData('24.06, 12:23 ', 356, 16.0, 49, 3.9)
];

export const header: LabelKeyObject[] = [
  { label: 'Dessert (100g serving)', key: 'name' },
  { label: 'Calories (g)', key: 'calories' },
  { label: 'Fat (g)', key: 'fat' },
  { label: 'Carbs (g)', key: 'carbs' },
  { label: 'Protein (g)', key: 'protein' },
  { label: 'Protein (g)', key: 'protein' },
  { label: 'Protein (g)', key: 'protein' }
];

const MassPayOuts = () => (
  <Grid item md={6} sx={{ stretch: '100%', height: '100%' }}>
    {/* <MainCard title="Выводы средств" content={false} secondary={}>
      <CardContent></CardContent>
    </MainCard> */}
    <MainCard
      content={false}
      title="Массовые выплаты"
      secondary={
        <Link component={RouterLink} to="#" color="primary">
          Смотреть всё
        </Link>
      }
      sx={{ stretch: '100%', height: '100%' }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Дата выплаты</TableCell>
              <TableCell align="left">ID клиента</TableCell>
              <TableCell align="left">Статус</TableCell>
              <TableCell align="right">Сумма выплаты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover key={index} sx={{ borderBottom: '1px solid #f0f0f0' }}>
                <TableCell sx={{ pl: 3, py: 2 }} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                <TableCell align="left">
                  <Chip size="small" variant="light" label={'Rejected'} color="error" />
                </TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  </Grid>
);

export default MassPayOuts;
