import { useMemo } from 'react';

// material-ui
import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import { useTable, useFilters, useGlobalFilter, Column, HeaderGroup, Cell } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { EmptyTable } from 'components/third-party/ReactTable';

import makeData from 'data/react-table';
import { GlobalFilter, DefaultColumnFilter, SelectColumnFilter, NumberRangeColumnFilter, renderFilterTypes } from 'utils/react-table';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import { useNavigate } from 'react-router-dom';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const initialState = useMemo(() => ({ filters: [{ id: 'status', value: '' }] }), []);
  const navigate = useNavigate();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, preGlobalFilteredRows, setGlobalFilter } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState,
      filterTypes
    },
    useGlobalFilter,
    useFilters
  );

  const sortingRow = rows.slice(0, 10);

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ padding: 2 }}>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          placeholder="Поиск по транзакциям"
          setGlobalFilter={setGlobalFilter}
        />
        <Stack spacing={1} direction={'row'}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker label="От" />
            <DatePicker label="До" />
          </LocalizationProvider>
        </Stack>
      </Stack>

      <Table {...getTableProps()}>
        <TableHead sx={{ borderTopWidth: 2 }}>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: HeaderGroup) => (
                <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {headerGroups.map((group: HeaderGroup<{}>) => (
            <TableRow {...group.getHeaderGroupProps()}>
              {group.headers.map((column: HeaderGroup) => (
                <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                  {column.canFilter ? column.render('Filter') : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {sortingRow.length > 0 ? (
            sortingRow.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow sx={{ textDecoration: 'none' }} {...row.getRowProps()}>
                  {row.cells.map((cell: Cell) => (
                    <TableCell
                      onClick={() => navigate(`/transaction/${row.id}`)}
                      {...cell.getCellProps([{ className: cell.column.className }])}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <EmptyTable msg="No Data" colSpan={7} />
          )}
        </TableBody>
      </Table>
    </>
  );
}

// ==============================|| REACT TABLE - FILTERING ||============================== //

const Transactions = () => {
  const data = useMemo(() => makeData(2000), []);

  const columns = useMemo(
    () =>
      [
        {
          Header: 'ID',
          accessor: 'lastName',
          filter: 'fuzzyText',
          disableFilters: true
        },
        {
          Header: 'СУММА (USDT)',
          accessor: 'firstName',
          disableFilters: true,
          Cell: ({ value }: { value: string }) => {
            return transformCurrencyValue(Math.random() * 10, { currency: 'USDT' });
          }
        },
        {
          Header: 'СУММА (Фиат)',
          accessor: 'id',
          Filter: NumberRangeColumnFilter,
          filter: 'between',
          Cell: ({ value }: { value: string }) => {
            return transformCurrencyValue(Math.random() * 900, { currency: 'RUB' });
          }
        },
        {
          Header: 'ПОЛУЧАТЕЛЬ',
          accessor: 'age',
          filter: 'fuzzyText'
        },
        {
          Header: 'СТАТУСЫ',
          accessor: 'status',
          Filter: SelectColumnFilter,
          filter: 'includes',
          Cell: ({ value }: { value: string }) => {
            switch (value) {
              case 'Complicated':
                return <Chip color="error" label="Не зачислена" size="small" variant="light" />;
              case 'Relationship':
                return <Chip color="success" label="Зачислена" size="small" variant="light" />;
              case 'Single':
              default:
                return <Chip color="info" label="Оплачена" size="small" variant="light" />;
            }
          }
        },
        {
          Header: 'ДАТА И ВРЕМЯ',
          accessor: 'time',
          disableFilters: true,
          Cell: ({ value }: { value: string }) => {
            return <Typography color="secondary">{value}</Typography>;
          }
        }
      ] as Column[],
    []
  );

  return (
    <MainCard content={false} border={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default Transactions;
