import { useEffect, useState } from 'react';

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography, Box } from '@mui/material';

// project imports
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import MainCard from 'components/MainCard';
import useGetTransactionData from '../useGetTransactionData';
import Loader from 'components/Loader';
import { transformCurrencyValue } from 'utils/transformCurrencyValue';
import { ReactComponent as ErrorImage } from 'assets/images/maintenance/error-flat.svg';

// step options
const steps = ['Поиск реквизитов', 'Перевод на карту', 'Результат платежа'];

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const P2pFormBody = () => {
  const { data, isLoading, isError } = useGetTransactionData();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step: number, isError: boolean) {
    if (isError) {
      return (
        <Stack sx={{ textAlign: 'center' }} justifyContent={'center'} alignItems={'center'}>
          <ErrorImage />
          <Typography variant="h3">Упс ! Что-то пошло не так:</Typography>
          <Typography>Платёж не найден</Typography>
        </Stack>
      );
    }
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  useEffect(() => {
    switch (data?.payload.state) {
      case 'created':
        setActiveStep(0);
        break;
      case 'processing':
        setActiveStep(0);
        break;
      case 'waiting_payment':
        setActiveStep(1);
        break;
      case 'paid':
        setActiveStep(1);
        break;
      case 'successed':
        setActiveStep(2);
        break;
      case 'failed':
        setActiveStep(2);
        break;
      default:
        break;
    }
  }, [data?.payload.state]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <MainCard
      title={
        <Stack gap={'5px'}>
          <Stack direction={'row'} gap={'5px'} justifyContent={'space-between'}>
            <Stack direction={{ sm: 'row' }} sx={{ maxWidth: 'calc(100% - 150px)', overflow: 'hidden' }} gap={1}>
              Счет на оплату{' '}
              <Typography
                component={'span'}
                sx={{ whiteSpace: 'nowrap', display: { sm: 'inline', xs: 'none' } }}
                color={'var(--day-5, #D9D9D9)'}
              >
                {data?.payload?.id}
              </Typography>
            </Stack>
            <Box sx={{ flexShrink: 0 }}>
              {transformCurrencyValue(data?.payload.amount ? +data?.payload.amount : 0, { currency: data?.payload.currency as 'rub' })}
            </Box>
          </Stack>
          <Typography
            component={'span'}
            sx={{ whiteSpace: 'nowrap', display: { sm: 'none', xs: 'inline' } }}
            color={'var(--day-5, #D9D9D9)'}
          >
            {data?.payload?.id}
          </Typography>
        </Stack>
      }
      sx={{
        width: '100%',
        maxWidth: '834px'
      }}
    >
      <Stepper activeStep={activeStep} sx={{ pb: '20px', pt: '0px' }} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Неизвестная ошибка
            </Typography>
          </>
        ) : (
          <>
            <Stack
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                border: { sm: '1px solid var(--day-4, #F0F0F0)' },
                borderRadius: '4px',
                minHeight: '500px',
                gap: '30px',
                px: { sm: '20px' },
                pt: '40px',
                pb: '60px'
              }}
            >
              {getStepContent(activeStep, isError)}
            </Stack>
            {/* <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <AnimateButton>
                <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </AnimateButton>
            </Stack> */}
          </>
        )}
      </>
    </MainCard>
  );
};

export default P2pFormBody;
