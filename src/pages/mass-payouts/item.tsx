import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { TableCell, TableRow, Typography } from '@mui/material';
import CardNumberFormat from 'components/shared/CardNumberFormat';
import MassStatusSwitcher from 'components/switchers/MassStatusSwitcher';
import React, { useState } from 'react';
import { IMassPayoutsItem } from 'store/api/mass-payouts/mass-payouts.types';
import { parseDate } from 'utils/parseDate';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import MassPayoutDetail from './details';

export default function Item({ row }: { row: IMassPayoutsItem }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((val) => !val);
  }
  return (
    <>
      <TableRow sx={{ textDecoration: 'none' }}>
        <TableCell onClick={toggleOpen}>{isOpen ? <ArrowDownOutlined /> : <ArrowRightOutlined />}</TableCell>
        <TableCell onClick={toggleOpen}>{row.id && `${row.id?.slice(0, 8)}...`}</TableCell>
        <TableCell onClick={toggleOpen}>{transformCurrencyValue(+row.amount, { currency: 'RUB' })}</TableCell>
        <TableCell onClick={toggleOpen}>
          <CardNumberFormat value={row?.recipient_card} />
        </TableCell>
        <TableCell onClick={toggleOpen}>
          <MassStatusSwitcher status={row.state} />
        </TableCell>
        <TableCell onClick={toggleOpen}>
          <Typography color="secondary">{parseDate(row.created_at)}</Typography>
        </TableCell>
      </TableRow>
      {isOpen && <MassPayoutDetail data={row} />}
    </>
  );
}
