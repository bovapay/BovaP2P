import React from 'react';

import { Divider, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTheme } from '@mui/material/styles';
import ruLocale from 'date-fns/locale/ru';

export default function DateRangeQueryPicker() {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
  return (
    <Stack spacing={2} direction={'row'}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
        <DatePicker
          value={dateFrom ? new Date(+dateFrom) : null}
          onChange={(newValue) => {
            if (newValue) {
              searchParams.set('dateFrom', new Date(newValue).getTime().toString());
              setSearchParams(searchParams);
            }
          }}
          label="От"
          localeText={{
            fieldYearPlaceholder: () => 'ГГ',
            fieldMonthPlaceholder: () => 'ММ',
            fieldDayPlaceholder: () => 'ДД'
          }}
        />
        <Stack alignItems={'center'} justifyContent={'center'}>
          <Divider
            orientation="vertical"
            sx={{ borderWidth: 1, transform: 'rotate(90deg)', height: 12, borderColor: theme.palette.secondary[400] }}
          />
        </Stack>
        <DatePicker
          label="До"
          value={dateTo ? new Date(+dateTo) : null}
          onChange={(newValue) => {
            if (newValue) {
              searchParams.set('dateTo', new Date(newValue).getTime().toString());
              setSearchParams(searchParams);
            }
          }}
          localeText={{
            fieldYearPlaceholder: () => 'ГГ',
            fieldMonthPlaceholder: () => 'ММ',
            fieldDayPlaceholder: () => 'ДД'
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}
