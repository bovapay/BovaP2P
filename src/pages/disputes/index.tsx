import { useMemo, useState } from 'react';

// material-ui
import { Box, Chip, LinearProgress, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

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
import InfiniteScroll from 'react-infinite-scroll-component';
import ruLocale from 'date-fns/locale/ru';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, update }: { columns: Column[]; data: []; update: () => void }) {
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

  const sortingRow = rows;
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
          height: 540,
          '& .infinite-scroll-component': {
            overflow: 'visible !important'
          }
        }}
        id="scrollableDiv"
      >
        <InfiniteScroll
          dataLength={rows.length}
          next={update}
          hasMore={true}
          loader={
            <Box sx={{ width: '70%', py: 1, px: 1, mx: 'auto' }}>
              <LinearProgress />
            </Box>
          }
          scrollThreshold={0.5}
          scrollableTarget="scrollableDiv"
        >
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
        </InfiniteScroll>
      </ScrollX>
    </>
  );
}

// ==============================|| REACT TABLE - FILTERING ||============================== //

const Disputes = () => {
  const data = useMemo(() => makeData(10), []);

  const [scrollData, setScrollData] = useState(data);

  const fetchMoreData = () => {
    setScrollData(scrollData.concat(makeData(100)) as []);
  };

  const columns = useMemo(
    () =>
      [
        {
          Header: 'ID',
          accessor: 'id',
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
          accessor: 'age',
          Filter: NumberRangeColumnFilter,
          filter: 'between',
          Cell: ({ value }: { value: string }) => {
            return transformCurrencyValue(Math.random() * 900, { currency: 'RUB' });
          }
        },
        {
          Header: 'ПОЛУЧАТЕЛЬ',
          accessor: 'lastName',
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
                return <Chip color="error" label="Спор отклонён" size="small" variant="light" />;
              case 'Relationship':
                return <Chip color="success" label="Спор принят" size="small" variant="light" />;
              case 'Single':
              default:
                return <Chip color="info" label="Оспаривается" size="small" variant="light" />;
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
        <ReactTable columns={columns} data={scrollData} update={fetchMoreData} />
      </ScrollX>
    </MainCard>
  );
};

export default Disputes;
