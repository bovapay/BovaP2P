import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSearchParams } from 'react-router-dom';
import { Checkbox } from '@mui/material';

export default function StateQueryFilter({ variants }: { variants: { value: string; label: string }[] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: SelectChangeEvent) => {
    searchParams.set('state', e.target.value);
    setSearchParams(searchParams);
  };

  const state = searchParams.get('state');
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select size="small" id="state-select" value={state || 'all'} onChange={handleChange}>
          {variants.map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
