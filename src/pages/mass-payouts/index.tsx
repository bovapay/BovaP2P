import { FC, Fragment, useCallback, useMemo, useState } from 'react';

// material-ui
import { Box, Chip, LinearProgress, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import { useTable, useFilters, useGlobalFilter, Column, HeaderGroup, Cell, Row, useExpanded } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { EmptyTable } from 'components/third-party/ReactTable';

import makeData from 'data/react-table';
import { GlobalFilter, DefaultColumnFilter, SelectColumnFilter, NumberRangeColumnFilter, renderFilterTypes } from 'utils/react-table';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import InfiniteScroll from 'react-infinite-scroll-component';
import ruLocale from 'date-fns/locale/ru';
import ExpandingUserDetail from 'sections/tables/react-table/ExpandingUserDetail';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import MassPayoutDetail from './details';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({
  columns,
  data,
  update,
  renderRowSubComponent
}: {
  columns: Column[];
  data: [];
  update: () => void;
  renderRowSubComponent: FC<any>;
}) {
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const initialState = useMemo(() => ({ filters: [{ id: 'status', value: '' }] }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    visibleColumns
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState,
      filterTypes
    },
    useGlobalFilter,
    useFilters,
    useExpanded
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
          style={{ width: 'visible' }}
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

                  const rowProps = row.getRowProps();
                  return (
                    <Fragment key={i}>
                      <TableRow sx={{ textDecoration: 'none' }} {...row.getRowProps()}>
                        {row.cells.map((cell: Cell) => (
                          <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                        ))}
                      </TableRow>
                      {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
                    </Fragment>
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

const Transactions = () => {
  const data = useMemo(() => makeData(50), []);

  const [scrollData, setScrollData] = useState(data);

  const fetchMoreData = () => {
    setTimeout(() => {
      setScrollData(scrollData.concat(makeData(10)) as []);
    }, 1500);
  };

  const columns = useMemo(
    () =>
      [
        {
          Header: () => null,
          id: 'expander',
          className: 'cell-center',
          Cell: ({ row }: { row: Row }) => {
            const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;
            return (
              <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', textAlign: 'center' }} {...row.getToggleRowExpandedProps()}>
                {collapseIcon}
              </Box>
            );
          },
          SubCell: () => null
        },
        {
          Header: 'ID',
          accessor: 'id',
          filter: 'fuzzyText',
          disableFilters: true
        },
        {
          Header: 'СУММА (USDT)',
          accessor: 'lastName',
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
          accessor: 'firstName',
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
                return <Chip color="info" label="В процессе" size="small" variant="light" />;
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

  const renderRowSubComponent = useCallback(({ row: { id } }: { row: Row<{}> }) => <MassPayoutDetail data={data[Number(id)]} />, [data]);

  return (
    <MainCard content={false} border={false}>
      <ReactTable columns={columns} data={scrollData} update={fetchMoreData} renderRowSubComponent={renderRowSubComponent} />
    </MainCard>
  );
};

export default Transactions;
