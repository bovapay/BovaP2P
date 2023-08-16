// material-ui
import { Typography, LinearProgress, Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';

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
          <FormattedMessage id="firstTitle" />
          ...
        </Typography>

        <LinearProgress sx={{ flexGrow: 0, mt: '24px' }} />
      </Box>
    </>
  );
}
