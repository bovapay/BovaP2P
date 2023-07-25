import { Chip } from '@mui/material';
import React from 'react';

export default function TransactionStatusSwitcher({ status }: { status: string }) {
  switch (status) {
    case 'processing':
      return <Chip color="warning" label="В обработке" size="small" variant="light" />;
    case 'created':
      return <Chip color="warning" label="Создана" size="small" variant="light" />;
    case 'reviewing':
      return <Chip color="warning" label="Оспаривается" size="small" variant="light" />;
    case 'repeated_reviewing':
      return <Chip color="warning" label="Оспаривается повторно" size="small" variant="light" />;
    case 'paid':
      return <Chip color="info" label="Оплачена" size="small" variant="light" />;
    case 'failed':
      return <Chip color="error" label="Не зачислена" size="small" variant="light" />;
    case 'closed_failed':
      return <Chip color="error" label="Спор отклонён" size="small" variant="light" />;
    case 'repeated_closed_failed':
      return <Chip color="error" label="Повторный cпор отклонён" size="small" variant="light" />;
    case 'successed':
      return <Chip color="success" label="Зачислена" size="small" variant="light" />;
    case 'accepted_successed':
      return <Chip color="success" label="Спор принят" size="small" variant="light" />;
    case 'repeated_accepted_successed':
      return <Chip color="success" label="Повторный спор принят" size="small" variant="light" />;
    case 'confirmed':
      return <Chip color="info" label="Оплачена" size="small" variant="light" />;
    default:
      return <></>;
  }
}
