import { OutlinedInputProps } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import React from 'react';

export default function OutlinedNumberInput({ onChange, ...rest }: OutlinedInputProps) {
  return (
    <OutlinedInput
      onChange={(e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
          onChange && onChange(e);
        }
      }}
      {...rest}
    />
  );
}
