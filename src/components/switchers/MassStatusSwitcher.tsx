import { Chip } from '@mui/material';

export default function MassStatusSwitcher({ status }: { status: string }) {
  switch (status) {
    case 'failed':
      return <Chip size="small" variant="light" label={'Не зачислена'} color="error" />;
    case 'processing':
      return <Chip size="small" variant="light" label={'В процессе'} color="warning" />;
    case 'paid':
      return <Chip size="small" variant="light" label={'Зачислена'} color="success" />;
    default:
      return <></>;
  }
}
