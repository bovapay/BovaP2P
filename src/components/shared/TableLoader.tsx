import React from 'react';

import { CircularProgress, Stack } from '@mui/material';

export default function TableLoader() {
  return (
    <Stack width={'100%'} sx={{ my: 2 }} alignItems={'center'} justifyContent={'center'}>
      <CircularProgress color="primary" sx={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: 'auto' }} />
    </Stack>
  );
}
