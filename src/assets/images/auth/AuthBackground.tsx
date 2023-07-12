// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// types
import { ThemeDirection, ThemeMode } from 'types/config';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(18px)',
        zIndex: -1,
        bottom: 0,
        transform: 'rotate(-45deg)  translate(-0%,-25%)'
      }}
    >
      <svg width="70%" height="calc(100vh - 175px)" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_225_323293)">
          <path
            d="M23.9568 0C34.3482 0 39.5462 0 42.7708 3.22887C45.9999 6.45775 45.9999 11.6506 45.9999 22.041V23.959C45.9999 34.3493 45.9999 39.5422 42.7708 42.7711C39.5416 45.9999 34.3482 45.9999 23.9568 45.9999H22.0386C11.6472 45.9999 6.45379 45.9999 3.2246 42.7711C0 39.5422 0 34.3447 0 23.9544L0 22.0364C0 11.6506 0 6.45315 3.2292 3.22887C6.45379 0 11.6518 0 22.0432 0H23.9614H23.9568Z"
            fill={theme.palette.primary.dark}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.4494 36.9015C32.0135 35.7384 37 29.9829 37 23.058C37 15.294 30.732 9 23 9C15.268 9 9 15.294 9 23.058C9 30.2074 14.3149 36.1103 21.1937 37L23.3499 33.2499L25.4494 36.9015ZM23 31.4927C18.3608 31.4927 14.6 27.7164 14.6 23.058C14.6 18.3996 18.3608 14.6232 23 14.6232C27.6392 14.6232 31.4 18.3996 31.4 23.058C31.4 27.7164 27.6392 31.4927 23 31.4927Z"
            fill={theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.common.white}
          />
        </g>
        <defs>
          <clipPath id="clip0_225_323293">
            <rect width="45.9999" height="45.9999" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

export default AuthBackground;
