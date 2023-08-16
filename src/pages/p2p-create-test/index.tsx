import { Box, FormControl, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import P2PLogo from 'components/shared/P2Plogo';
import React, { useState } from 'react';
import Country from './Country';
import Banks from './Banks';
import Amount from './Amount';
import { useNavigate } from 'react-router';

export default function P2PCreateTest() {
  const [currency, setCurrency] = useState<string>();
  const [bank, setBank] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [amountError, setAmountError] = useState('');
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  function nextStep() {
    setStep((step) => step + 1);
  }
  function createPayment() {
    if (!amount) {
      return setAmountError('Please enter amount');
    }
    navigate(`/test/116c7683f42c0c29157e69fcfee60906921acaed?bank=${bank}&amount=${amount}&currency=${currency}`);
  }
  function getStep() {
    switch (step) {
      case 0:
        return <Country currency={currency} setCurrency={setCurrency} nextStep={nextStep} />;
      case 1:
        return <Banks currency={currency} nextStep={nextStep} bank={bank} setBank={setBank} />;
      case 2:
        return <Amount amount={amount} setAmount={setAmount} createPayment={createPayment} error={amountError} setError={setAmountError} />;
      default:
        return <></>;
    }
  }
  return (
    <Box
      sx={{
        px: { sm: '69px', xs: '2px' },
        py: { sm: '60px', xs: '30px' },
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <P2PLogo />
      <MainCard
        title="Creating a test P2P payment"
        sx={{
          width: '100%',
          maxWidth: '834px',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
        contentSX={{
          flexGrow: 1
        }}
      >
        <Box
          component={'form'}
          onSubmit={(e) => {
            e.preventDefault();
            createPayment();
          }}
          sx={{
            minHeight: '100%',
            px: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px'
          }}
        >
          {getStep()}
        </Box>
      </MainCard>
    </Box>
  );
}
