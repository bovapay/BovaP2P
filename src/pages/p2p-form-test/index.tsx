import React from 'react';
import { Box } from '@mui/material';
import P2pFormBody from './body';
import P2PLogo from 'components/shared/P2Plogo';

export default function P2PFormTestPage() {
  return (
    <Box
      sx={{
        px: { sm: '69px', xs: '2px' },
        py: { sm: '60px', xs: '30px' },
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'center'
      }}
    >
      <P2PLogo />
      <P2pFormBody />
    </Box>
  );
}
