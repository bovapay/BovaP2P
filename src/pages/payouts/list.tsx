import React, { Fragment } from 'react';

import { TableCell, TableRow } from '@mui/material';
import TableLoader from 'components/shared/TableLoader';
import { EmptyTable } from 'components/third-party/ReactTable';
import TableError from 'components/shared/TableError';
import Item from './item';
import { IPayoutsItem } from 'store/api/payouts/payouts.types';

interface IList {
  isLoading: boolean;
  isError: boolean;
  isRefetching;
  list: IPayoutsItem[];
}

export default function List({ isError, isLoading, isRefetching, list }: IList) {
  if (isLoading || isRefetching) {
    return (
      <TableRow>
        <TableCell colSpan={7}>
          <TableLoader />
        </TableCell>
      </TableRow>
    );
  }

  if (isError) {
    return <TableError colSpan={7} />;
  }

  if (list.length === 0) {
    return <EmptyTable msg="Транзакций не найдено" colSpan={7} />;
  }

  return (
    <>
      {list.map((row, index) => {
        return (
          <Fragment key={index}>
            <Item row={row} />
          </Fragment>
        );
      })}
    </>
  );
}
