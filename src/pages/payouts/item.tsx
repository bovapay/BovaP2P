import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Chip, TableCell, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { parseDate } from 'utils/parseDate';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import MassPayoutDetail from './details';
import { IPayoutsItem } from 'store/api/payouts/payouts.types';
import PayoutsStatusSwitcher from 'components/switchers/PayoutsStatusSwitcher';

export function typeTextSwitcher(val: string) {
  switch (val) {
    case 'transfer':
      return 'Перевод с P2P на OTC';
    case 'p2p':
      return 'Вывод с P2P баланса';
    case 'manual':
      return 'Запрошенный вывод';
    default:
      return '';
  }
}

export default function Item({ row }: { row: IPayoutsItem }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((val) => !val);
  }

  return (
    <>
      <TableRow sx={{ textDecoration: 'none', cursor: 'pointer' }}>
        <TableCell onClick={toggleOpen}>{isOpen ? <ArrowDownOutlined /> : <ArrowRightOutlined />}</TableCell>
        <TableCell onClick={toggleOpen}>{transformCurrencyValue(+row.amount, { currency: row.currency as 'rub' })}</TableCell>
        <TableCell onClick={toggleOpen}>
          <Chip color="info" label={typeTextSwitcher(row.type_of)} size="small"></Chip>
        </TableCell>
        <TableCell onClick={toggleOpen}>
          <PayoutsStatusSwitcher status={row.status} />
        </TableCell>
        <TableCell onClick={toggleOpen}>
          <Typography color="secondary">{parseDate(row.created_at)}</Typography>
        </TableCell>
      </TableRow>
      {isOpen && <MassPayoutDetail data={row} />}
    </>
  );
}
