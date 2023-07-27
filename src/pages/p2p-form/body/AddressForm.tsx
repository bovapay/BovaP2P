// material-ui
import { Checkbox, FormControlLabel, Grid, InputLabel, Stack, Typography, TextField, LinearProgress, Box } from '@mui/material';

// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //

export default function AddressForm() {
  return (
    <>
      <Box sx={{ maxWidth: '290px', width: '100%' }}>
        <Typography
          sx={{
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '500'
          }}
          textAlign={'center'}
        >
          Поиск реквизитов для оплаты...
        </Typography>

        <LinearProgress sx={{ flexGrow: 0, mt: '24px' }} />
      </Box>
    </>
  );
}
