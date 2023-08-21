import { Box, Button, FormHelperText, Grid, Typography } from '@mui/material';
import BankSwitcher from 'pages/p2p-form/body/PaymentForm/BankSwitcher';
import React, { useState } from 'react';

const BANKS = {
  rub: ['sberbank', 'raiffeisen', 'tinkoff'],
  byn: ['alfa_bank', 'bnb_bank', 'technobank', 'bsb_bank', 'mt_bank', 'belinvest'],
  gel: ['credo_bank', 'tbc_bank', 'bank_of_georgia'],
  kgs: ['optima_bank', 'keremet_bank', 'kicb_bank'],
  idr: ['bni_bank', 'bri_bank', 'mandiri_bank']
};

export default function Banks({
  currency,
  nextStep,
  bank,
  setBank
}: {
  currency: string | undefined;
  nextStep(): void;
  bank: string | undefined;
  setBank(val: string): void;
}) {
  const [error, setError] = useState('');

  function onSubmit() {
    if (!bank) {
      return setError('Please select a bank');
    }
    nextStep();
  }
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        Select a bank
      </Typography>
      <Grid container columns={12} spacing={'10px'}>
        {BANKS[currency as 'rub']?.map((i, index) => (
          <Grid key={index} item xs={6} sm={6} md={4}>
            <BankSwitcher bank={i} activeSelect={bank === i} select onSelect={() => setBank(i)} />
          </Grid>
        ))}
      </Grid>
      <Box>
        <FormHelperText error>{error}</FormHelperText>
        <Button
          onClick={onSubmit}
          variant="contained"
          size="large"
          sx={{
            width: '200px',
            height: '48px'
          }}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
