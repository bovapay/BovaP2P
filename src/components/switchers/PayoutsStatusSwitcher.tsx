import { Chip } from '@mui/material';

export default function PayoutsStatusSwitcher({ status }: { status: string }) {
  switch (status) {
    case 'failed':
      return <Chip size="small" variant="light" label={'Не зачислен'} color="error" />;
    case 'confirmed':
      return <Chip size="small" variant="light" label={'Подтверждён'} color="warning" />;
    case 'pending':
      return <Chip size="small" variant="light" label={'В процессе'} color="warning" />;
    case 'payed':
      return <Chip size="small" variant="light" label={'Оплачен'} color="success" />;
    default:
      return <></>;
  }
}
