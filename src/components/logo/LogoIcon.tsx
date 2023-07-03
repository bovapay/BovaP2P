// material-ui
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'types/config';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoIconDark from 'assets/images/logo-icon-dark.svg';
 * import logoIcon from 'assets/images/logo-icon.svg';
 * import { ThemeMode } from 'types/config';
 *
 */

// ==============================|| LOGO ICON SVG ||============================== //

const LogoIcon = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === ThemeMode.DARK ? logoIconDark : logoIcon} alt="Mantis" width="100" />
     *
     */
    <>
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_225_323293)">
          <path
            d="M23.9568 0C34.3482 0 39.5462 0 42.7708 3.22887C45.9999 6.45775 45.9999 11.6506 45.9999 22.041V23.959C45.9999 34.3493 45.9999 39.5422 42.7708 42.7711C39.5416 45.9999 34.3482 45.9999 23.9568 45.9999H22.0386C11.6472 45.9999 6.45379 45.9999 3.2246 42.7711C0 39.5422 0 34.3447 0 23.9544L0 22.0364C0 11.6506 0 6.45315 3.2292 3.22887C6.45379 0 11.6518 0 22.0432 0H23.9614H23.9568Z"
            fill={theme.palette.primary.dark}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
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
      {/* <svg width="134" height="46" viewBox="0 0 134 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_225_323298)">
          <path
            d="M23.9568 0C34.3482 0 39.5462 0 42.7708 3.22887C45.9999 6.45775 45.9999 11.6506 45.9999 22.041V23.959C45.9999 34.3493 45.9999 39.5422 42.7708 42.7711C39.5416 45.9999 34.3482 45.9999 23.9568 45.9999H22.0386C11.6472 45.9999 6.45379 45.9999 3.2246 42.7711C0 39.5422 0 34.3447 0 23.9544L0 22.0364C0 11.6506 0 6.45315 3.2292 3.22887C6.45379 0 11.6518 0 22.0432 0H23.9614H23.9568Z"
            fill={theme.palette.primary.dark}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M25.4494 36.9015C32.0135 35.7384 37 29.9829 37 23.058C37 15.294 30.732 9 23 9C15.268 9 9 15.294 9 23.058C9 30.2074 14.3149 36.1103 21.1937 37L23.3499 33.2499L25.4494 36.9015ZM23 31.4927C18.3608 31.4927 14.6 27.7164 14.6 23.058C14.6 18.3996 18.3608 14.6232 23 14.6232C27.6392 14.6232 31.4 18.3996 31.4 23.058C31.4 27.7164 27.6392 31.4927 23 31.4927Z"
            fill={theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.common.white}
          />
        </g>
      </svg> */}
    </>
    // <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
    //   <path
    //     d="M7.27577 57.2242L17.5616 46.9384L17.5724 46.9276H36.9234L29.2238 54.6273L27.2358 56.6152L19.3511 64.5L20.3276 65.4792L64.5 109.649L109.649 64.5L101.761 56.6152L101.206 56.0572L92.0766 46.9276H111.428L111.438 46.9384L119.5 55.0002L129 64.5L64.5 129L0 64.5L7.27577 57.2242ZM64.5 0L101.77 37.2695H82.4185L64.5 19.3511L46.5816 37.2695H27.2305L64.5 0Z"
    //     fill={theme.palette.primary.dark}
    //   />
    //   <path
    //     d="M19.3509 64.5L27.2357 56.6152L29.2236 54.6273L21.5267 46.9276H17.5722L17.5615 46.9384L7.27561 57.2242L17.1483 67.0487L19.3509 64.5Z"
    //     fill="url(#paint0_linear)"
    //   />
    //   <path
    //     d="M101.762 56.6152L109.649 64.5L108.868 65.2807L108.871 65.2834L119.5 55.0002L111.438 46.9384L111.428 46.9276H110.644L101.206 56.0572L101.762 56.6152Z"
    //     fill="url(#paint1_linear)"
    //   />
    //   <path
    //     d="M17.5508 46.9276L17.5615 46.9384L27.2357 56.6152L64.4999 93.8767L111.449 46.9276H17.5508Z"
    //     fill={theme.palette.primary.main}
    //   />
    //   <defs>
    //     <linearGradient id="paint0_linear" x1="25.0225" y1="49.3259" x2="11.4189" y2="62.9295" gradientUnits="userSpaceOnUse">
    //       <stop stopColor={theme.palette.primary.darker} />
    //       <stop offset="0.9637" stopColor={theme.palette.primary.dark} stopOpacity="0" />
    //     </linearGradient>
    //     <linearGradient id="paint1_linear" x1="103.5" y1="49.5" x2="114.5" y2="62" gradientUnits="userSpaceOnUse">
    //       <stop stopColor={theme.palette.primary.darker} />
    //       <stop offset="1" stopColor={theme.palette.primary.dark} stopOpacity="0" />
    //     </linearGradient>
    //   </defs>
    // </svg>
  );
};

export default LogoIcon;
