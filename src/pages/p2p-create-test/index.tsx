import React, { useState } from 'react';

import MainCard from 'components/MainCard';
import P2PLogo from 'components/shared/P2Plogo';
import Country from './Country';
import Banks from './Banks';
import Amount from './Amount';
import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

export default function P2PCreateTest() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [amount, setAmount] = useState<number>();
  const [amountError, setAmountError] = useState('');
  const navigate = useNavigate();

  const bank = searchParams.get('bank');
  function setBank(val: string) {
    searchParams.set('bank', val.toString());
    setSearchParams(searchParams);
  }

  const currency = searchParams.get('currency');
  function setCurrency(val: string) {
    searchParams.set('currency', val.toString());
    setSearchParams(searchParams);
  }
  const step = Number(searchParams.get('step'));
  function setStep(val: number) {
    searchParams.set('step', val.toString());
    setSearchParams(searchParams);
  }
  function nextStep() {
    setStep((Number(step) || 0) + 1);
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
        return <Country currency={currency || undefined} setCurrency={setCurrency} nextStep={nextStep} />;
      case 1:
        return <Banks currency={currency || undefined} nextStep={nextStep} bank={bank || undefined} setBank={setBank} />;
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
        title={
          <Stack gap={'5px'}>
            <Stack direction={'row'} gap={'5px'} justifyContent={'space-between'}>
              <Stack direction={{ sm: 'row' }} sx={{ maxWidth: 'calc(100% - 150px)', overflow: 'hidden' }} gap={1}>
                Creating a test P2P payment:{' '}
                <Typography component={'span'} sx={{ whiteSpace: 'nowrap', display: { xs: 'inline' } }} color={'var(--day-5, #D9D9D9)'}>
                  {step >= 1 && currency && currency.toUpperCase()}
                  {step >= 2 && bank && ` > ${bank.toUpperCase()}`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        }
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
            px: { sm: '80px' },
            py: { xs: '30px', sm: '0px' },
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
