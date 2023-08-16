import React from 'react';
import P2PLogo from '../../components/shared/P2Plogo';
import { Box } from '@mui/material';
import P2pFormBody from './body';

export default function P2PFormPage() {
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
