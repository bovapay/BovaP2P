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

// ==============================|| REACT TABLE - FILTERING ||============================== //

const Transactions = ({ isDisputesOnly }: { isDisputesOnly: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [list, setList] = useState<IDealItem[]>([]);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const [getList, { data, isLoading, isError }] = useLazyGetDealsQuery();

  //add page
  const receiver = searchParams.get('receiver');
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
  const state = searchParams.get('state');
  const amountFrom = searchParams.get('amountFrom');
  const amountTo = searchParams.get('amountTo');

  async function getListData(page: number) {
    page === 1 && setIsRefetching(true);
    const resp = await getList({
      page: page,
      card_number: receiver,
      dateFrom: dateFrom,
      dateTo: dateTo,
      state: state,
      states: isDisputesOnly
        ? [
            'repeated_accepted_successed',
            'accepted_successed',
            'repeated_closed_failed',
            'closed_failed',
            'reviewing',
            'repeated_reviewing'
          ]
        : undefined,
      amountFrom: amountFrom,
      amountTo: amountTo
    });
    let curData = resp.data;
    if (page === 1) {
      curData && setList(curData);
    } else {
      let curData = resp?.data as IDealItem[];
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
  }, [receiver, dateFrom, dateTo, state, amountFrom, amountTo, isDisputesOnly]);

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

  let disputeFilters = [
    { label: 'Спор принят', value: 'accepted_successed' },
    { label: 'Повторный спор принят', value: 'repeated_accepted_successed' },
    { label: 'Оспаривается', value: 'reviewing' },
    { label: 'Оспаривается повторно', value: 'repeated_reviewing' },
    { label: 'Спор отклонён', value: 'closed_failed' },
    { label: 'Повторный cпор отклонён', value: 'repeated_closed_failed' }
  ];
  let transactionFilters = [
    { label: 'Зачислена', value: 'successed' },
    { label: 'Не зачислена', value: 'failed' },
    { label: 'В обработке', value: 'created' },
    { label: 'Оплачена', value: 'paid' }
  ];
  let filters = isDisputesOnly
    ? [{ label: 'Все статусы', value: 'all' }, ...disputeFilters]
    : [{ label: 'Все статусы', value: 'all' }, ...transactionFilters, ...disputeFilters];
  return (
    <MainCard content={false} border={false}>
      <ScrollX>
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ padding: 2 }}>
          <DateRangeQueryPicker />
        </Stack>

        <Table>
          <TableHead sx={{ borderTopWidth: 2 }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>СУММА (Фиат)</TableCell>
              <TableCell>ПОЛУЧАТЕЛЬ</TableCell>
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
              <TableCell>
                <ReceiverQueryFilter />
              </TableCell>
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

export default Transactions;
