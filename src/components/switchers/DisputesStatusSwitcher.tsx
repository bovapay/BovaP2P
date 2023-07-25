import { Chip } from '@mui/material';
import React from 'react';

export default function DisputesStatusSwitcher({ status, repeated }: { status: string; repeated: boolean }) {
  switch (status) {
    case 'opened':
      return <Chip color="warning" label={repeated ? 'Оспаривается повторно' : 'Оспаривается'} size="small" variant="light" />;
    case 'paid':
      return <Chip color="info" label="Оплачена" size="small" variant="light" />;
    case 'closed':
      return <Chip color="error" label={repeated ? 'Повторный cпор отклонён' : 'Спор отклонён'} size="small" variant="light" />;
    case 'accepted':
      return <Chip color="success" label={repeated ? 'Повторный спор принят' : 'Спор принят'} size="small" variant="light" />;
    default:
      return <></>;
  }
}
