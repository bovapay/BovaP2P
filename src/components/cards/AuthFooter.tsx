// material-ui
import { Theme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        spacing={2}
        textAlign={matchDownSM ? 'center' : 'inherit'}
      >
        <Typography variant="caption">&copy; Все права защищены</Typography>

        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={matchDownSM ? 1 : 3} textAlign={matchDownSM ? 'center' : 'inherit'}>
          <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
            <Link component={RouterLink} to="https://www.bovapay.io#about" target="_blank" variant="caption" color="textPrimary">
              О нас
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
