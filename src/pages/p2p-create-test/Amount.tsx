import React, { useState } from 'react';
import { Button, FormHelperText, Grid, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { CreditCardOutlined } from '@ant-design/icons';
import OutlinedNumberInput from 'components/shared/OutlinedNumberInput';

export default function Amount({
  amount,
  setAmount,
  createPayment,
  error,
  setError
}: {
  amount: number | undefined;
  setAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  createPayment(): void;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) {
  function onSubmit() {
    if (!amount) {
      return setError('Please enter amount');
    }
    createPayment();
  }
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        Enter payment amount
      </Typography>
      <OutlinedNumberInput
        sx={{ maxWidth: '200px' }}
        placeholder="Payment amount"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      />

      <Box>
        <FormHelperText error>{error}</FormHelperText>
        <Button
          onClick={onSubmit}
          startIcon={<CreditCardOutlined />}
          variant="contained"
          size="large"
          sx={{
            width: '200px',
            height: '48px'
          }}
        >
          Create payment
        </Button>
      </Box>
    </>
  );
}
