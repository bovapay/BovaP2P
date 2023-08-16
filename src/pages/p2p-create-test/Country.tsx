import React, { useState } from 'react';
import { ReactComponent as Rub } from 'assets/icons/countries/ru.svg';
import { ReactComponent as Gel } from 'assets/icons/countries/ge.svg';
import { ReactComponent as Byn } from 'assets/icons/countries/by.svg';
import { ReactComponent as Idr } from 'assets/icons/countries/id.svg';
import { ReactComponent as Kgs } from 'assets/icons/countries/kg.svg';
import { Button, FormHelperText, Grid, Typography } from '@mui/material';
import { Box } from '@mui/material';

const COUNTRIES = [
  {
    currency: 'rub',
    icon: <Rub />,
    title: 'Russia'
  },
  {
    currency: 'gel',
    icon: <Gel />,
    title: 'Georgia'
  },
  {
    currency: 'byn',
    icon: <Byn />,
    title: 'Belarus'
  },
  {
    currency: 'idr',
    icon: <Idr />,
    title: 'Indonesia'
  },
  {
    currency: 'kgs',
    icon: <Kgs />,
    title: 'Kyrgyzstan'
  }
];

export default function Country({
  currency,
  setCurrency,
  nextStep
}: {
  currency: string | undefined;
  setCurrency: React.Dispatch<React.SetStateAction<string | undefined>>;
  nextStep(): void;
}) {
  const [error, setError] = useState('');

  function onSubmit() {
    if (!currency) {
      return setError('Please select a country');
    }
    nextStep();
  }
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        Select a country
      </Typography>
      <Grid container columns={12} spacing={'10px'}>
        {COUNTRIES.map((i, index) => (
          <Grid key={index} item xs={4}>
            <Box
              onClick={() => setCurrency(i.currency)}
              sx={{
                height: '70px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '11px 0px 11px 15px',
                borderRadius: '4px',
                position: 'relative',
                border: `1px solid ${currency === i.currency ? '#7265E6' : 'transparent'}`,
                background: 'var(--grad, linear-gradient(90deg, #FAFAFB 0%, #F5F3FA 100%))',
                overflow: 'hidden',
                '&:hover': {
                  border: '1px solid #7265E6',
                  boxShadow: '0px 4px 30px 0px rgba(114, 101, 230, 0.10)'
                }
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '20px'
                }}
              >
                {i.title}{' '}
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#7265E6',
                    textTransform: 'uppercase',
                    display: 'inline'
                  }}
                >
                  ({i.currency})
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    svg: {
                      transform: 'translate(50%, -50%)',
                      height: '48px',
                      width: 'auto',
                      borderRadius: '16px'
                    }
                  }}
                >
                  {i.icon}
                </Box>
              </Typography>
            </Box>
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
