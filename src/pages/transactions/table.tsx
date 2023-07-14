import { Dispatch, SetStateAction, useMemo } from 'react';

// material-ui
import { Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// project import
import ScrollX from 'components/ScrollX';
import ruLocale from 'date-fns/locale/ru';
import { EmptyTable } from 'components/third-party/ReactTable';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IDealItem } from 'store/api/deals/deals.types';
import { TablePagination } from 'components/shared/Pagination';
import { Chip } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import { PatternFormat } from 'react-number-format';

function TransactionsTable({ data, update }: { data: IDealItem[]; update: () => void }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function getStatus(value: string) {
    switch (value) {
      case 'canceled':
        return <Chip color="error" label="Не зачислена" size="small" variant="light" />;
      case 'pending':
        return <Chip color="success" label="Зачислена" size="small" variant="light" />;
      case 'paid':
        return <Chip color="success" label="Зачислена" size="small" variant="light" />;
      case 'confirmed':
      default:
        return <Chip color="info" label="Оплачена" size="small" variant="light" />;
    }
  }

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ padding: 2 }}>
        <OutlinedInput
          placeholder="Поиск по транзакциям"
          value={searchParams.get('search')}
          onChange={(e) => {
            setSearchParams((params) => {
              return { ...params, search: e.target.value };
            });
          }}
        />

        <Stack spacing={1} direction={'row'}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
            <DatePicker
              label="От"
              localeText={{
                fieldYearPlaceholder: () => 'ГГ',
                fieldMonthPlaceholder: () => 'ММ',
                fieldDayPlaceholder: () => 'ДД'
              }}
            />
            <DatePicker
              label="До"
              localeText={{
                fieldYearPlaceholder: () => 'ГГ',
                fieldMonthPlaceholder: () => 'ММ',
                fieldDayPlaceholder: () => 'ДД'
              }}
            />
          </LocalizationProvider>
        </Stack>
      </Stack>
      <ScrollX
        sx={{
          // height: 540,
          '& .infinite-scroll-component': {
            overflow: 'visible !important'
          }
        }}
        id="scrollableDiv"
      >
        <Table>
          <TableHead sx={{ borderTopWidth: 2 }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>СУММА (USDT)</TableCell>
              <TableCell>СУММА (Фиат)</TableCell>
              <TableCell>ПОЛУЧАТЕЛЬ</TableCell>
              <TableCell>СТАТУСЫ</TableCell>
              <TableCell>ДАТА И ВРЕМЯ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <OutlinedInput
                  placeholder="Карта или номер"
                  size="small"
                  value={searchParams.get('receiver')}
                  onChange={(e) => {
                    setSearchParams((params) => {
                      return { ...params, receiver: e.target.value };
                    });
                  }}
                />
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            {data.length > 0 ? (
              data.map((row, index) => {
                return (
                  <TableRow sx={{ textDecoration: 'none' }} key={index}>
                    <TableCell onClick={() => navigate(`/transaction/${row.id}`)}>{row.id}</TableCell>
                    <TableCell onClick={() => navigate(`/transaction/${row.id}`)}>
                      {transformCurrencyValue(+row.usdt_amount, { currency: 'USDT' })}
                    </TableCell>
                    <TableCell onClick={() => navigate(`/transaction/${row.id}`)}>
                      {transformCurrencyValue(+row.amount, { currency: 'RUB' })}
                    </TableCell>
                    <TableCell onClick={() => navigate(`/transaction/${row.id}`)}>
                      <PatternFormat displayType="text" format="#### ##** **** ####" mask="_" defaultValue={row.material.card_number} />
                    </TableCell>
                    <TableCell onClick={() => navigate(`/transaction/${row.id}`)}>{getStatus(row.state)}</TableCell>
                    <TableCell onClick={() => navigate(`/transaction/${row.id}`)}>
                      <Typography color="secondary">{row.created_at}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <EmptyTable msg="No Data" colSpan={7} />
            )}

            <TableRow>
              <TableCell sx={{ p: 2 }} colSpan={7}>
                <TablePagination gotoPage={() => null} setPageSize={() => null} pageIndex={0} pageSize={10} />
                {/* <TablePagination gotoPage={() => null} rows={rows * 10} setPageSize={() => null} pageIndex={0} pageSize={10} /> */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollX>
    </>
  );
}

export default TransactionsTable;
