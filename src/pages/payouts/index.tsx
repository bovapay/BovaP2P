import { useEffect, useState } from 'react';

// project import
import { useSearchParams } from 'react-router-dom';
import { useLazyGetDealsQuery } from 'store/api/deals/deals.api';
import { IDealItem } from 'store/api/deals/deals.types';
import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { PER_PAGE } from 'utils/constants/shared';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import TableLoader from 'components/shared/TableLoader';
import DateRangeQueryPicker from 'components/filters/DateRangeQueryPicker';
import ReceiverQueryFilter from 'components/filters/ReceiverQueryFilter';
import SearchQueryFilter from 'components/filters/SearchQueryFilter';
import AmountRangeQueryPicker from 'components/filters/AmoutRangeQueryFilter';
import StateQueryFilter from 'components/filters/StateQueryFilter';
import List from './list';
import { useLazyGetMassPayoutsQuery } from 'store/api/mass-payouts/mass-payouts.api';
import { IMassPayoutsItem } from 'store/api/mass-payouts/mass-payouts.types';
import { useLazyGetPayoutsQuery } from 'store/api/payouts/payouts.api';
import { IPayoutsItem } from 'store/api/payouts/payouts.types';

// ==============================|| REACT TABLE - FILTERING ||============================== //

const Payouts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [list, setList] = useState<IPayoutsItem[]>([]);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const [getList, { data, isLoading, isError }] = useLazyGetPayoutsQuery();

  //add page
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
  const state = searchParams.get('state');
  const amountFrom = searchParams.get('amountFrom');
  const amountTo = searchParams.get('amountTo');

  async function getListData(page: number) {
    page === 1 && setIsRefetching(true);
    const resp = await getList({
      page: page,
      dateFrom: dateFrom,
      dateTo: dateTo,
      state: state,
      amountFrom: amountFrom,
      amountTo: amountTo
    });
    let curData = resp.data;
    if (page === 1) {
      curData && setList(curData);
    } else {
      let curData = resp?.data as IPayoutsItem[];
      curData && setList((current) => current.concat(curData));
    }
    setIsRefetching(false);
  }
  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      getListData(1);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [dateFrom, dateTo, state, amountFrom, amountTo]);

  useEffect(() => {
    setIsRefetching(true);
  }, []);

  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      getListData(page + 1);
      setPage((page) => page + 1);
    }
  }, [inView]);

  let filters = [
    { label: 'Все статусы', value: 'all' },
    { label: 'Оплачен', value: 'payed' },
    { label: 'В процессе', value: 'pending' },
    { label: 'Подтверждён', value: 'confirmed' },
    { label: 'Не зачислен', value: 'failed' }
  ];
  return (
    <MainCard content={false} border={false}>
      <ScrollX>
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ padding: 2 }}>
          {/* <SearchQueryFilter /> */}
          <DateRangeQueryPicker />
        </Stack>

        <Table>
          <TableHead sx={{ borderTopWidth: 2 }}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>СУММА (Фиат)</TableCell>
              <TableCell>ТИП ОПЕРАЦИИ</TableCell>
              <TableCell>СТАТУСЫ</TableCell>
              <TableCell>ДАТА И ВРЕМЯ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <AmountRangeQueryPicker />
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <StateQueryFilter variants={filters} />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            {/* TABLE LIST  */}
            <List isError={isError} isLoading={isLoading} isRefetching={isRefetching} list={list} />
          </TableBody>
        </Table>
        {data && data?.length >= PER_PAGE && !isLoading && !isRefetching && !isError && (
          <div ref={ref}>
            <TableLoader />
          </div>
        )}
      </ScrollX>
    </MainCard>
  );
};

export default Payouts;
