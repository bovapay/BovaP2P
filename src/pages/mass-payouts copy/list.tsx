import React, { Fragment, useState } from 'react';

import { Chip } from '@mui/material';
import { TableCell, TableRow, Typography } from '@mui/material';
import TableLoader from 'components/shared/TableLoader';
import { useNavigate } from 'react-router';
import { IDealItem } from 'store/api/deals/deals.types';
import { parseDate } from 'utils/parseDate';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import { EmptyTable } from 'components/third-party/ReactTable';
import TableError from 'components/shared/TableError';
import CardNumberFormat from 'components/shared/CardNumberFormat';
import MassPayoutDetail from './details';
import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import MassStatusSwitcher from 'components/switchers/MassStatusSwitcher';
import { IMassPayoutsItem } from 'store/api/mass-payouts/mass-payouts.types';
import Item from './item';

interface IList {
  isLoading: boolean;
  isError: boolean;
  isRefetching;
  list: IMassPayoutsItem[];
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
