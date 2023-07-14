import { useEffect, useState } from 'react';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Loader from 'components/Loader';
import TransactionsTable from './table';
import { useSearchParams } from 'react-router-dom';
import { useLazyGetDealsQuery } from 'store/api/deals/deals.api';
import { IDealItem } from 'store/api/deals/deals.types';

// ==============================|| REACT TABLE - FILTERING ||============================== //

const Transactions = () => {
  const [searchParams] = useSearchParams();
  const [list, setList] = useState<IDealItem[]>([]);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);

  const [getList, { data, isLoading, isError }] = useLazyGetDealsQuery();

  async function getListData(page: number) {
    page === 1 && setIsRefetching(true);
    const resp = await getList({
      page: page,
      // state: router.query.state?.toString()?.split(','),
      material_card_number: searchParams.get('receiver')
      // search: router.query.search,
      // sort: router.query.sort,
      // device_id: deviceQuery ? router.query[deviceQuery] : router.query.device_id,
      // material_id: router.query.material_id,
      // amount: router.query.amount,
      // amountFrom: router.query.amountFrom,
      // amountTo: router.query.amountTo,
      // dateFrom: router.query.dateFrom,
      // dateTo: router.query.dateTo
    });
    let curData = resp.data?.data;
    if (page === 1) {
      curData && setList(curData);
      setIsRefetching(false);
    } else {
      let curData = resp?.data?.data as IDealItem[];
      curData && setList((current) => current.concat(curData));
    }
  }

  useEffect(() => {
    getListData(1);
  }, [
    // router.query.state,
    searchParams.get('receiver')
    // router.query.sort,
    // router.query.device_id,
    // router.query.material_id,
    // router.query.amount,
    // router.query.amountFrom,
    // router.query.amountTo,
    // router.query.dateFrom,
    // router.query.dateTo
  ]);

  useEffect(() => {
    getListData(1);
  }, []);

  const fetchMoreData = () => {
    data?.meta?.next_page && getListData(data?.meta?.next_page);
    console.log('fetch');
  };

  if (isLoading) {
    <Loader />;
  }
  return (
    <MainCard content={false} border={false}>
      <ScrollX>
        <TransactionsTable data={list} update={fetchMoreData} />
      </ScrollX>
    </MainCard>
  );
};

export default Transactions;
