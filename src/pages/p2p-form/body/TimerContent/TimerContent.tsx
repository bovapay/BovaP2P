import React from 'react';

// import styles from '../styles.module.scss';
import { useCountdown } from 'hooks/useCountDown';
import { LinearProgress, Typography } from '@mui/material';

export default function TimerContent({ countDownStart, initialDate }: { countDownStart: number; initialDate: number }) {
  const [days, hours, minutes, seconds, countDown] = useCountdown(initialDate);
  let range = initialDate - countDownStart;
  const percentage = Math.ceil(countDown / (range / 100));

  return (
    <>
      {countDown > 0 ? (
        <Typography
          sx={{
            color: 'var(--day-title, #262626)',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 500,
            mb: '16px'
          }}
        >
          Осталось времени:{' '}
          <Typography
            component={'span'}
            sx={{
              color: 'var(--character-secondary, #8C8C8C)'
            }}
          >
            {minutes} мин {seconds < 10 ? '0' : ''}
            {seconds} сек
          </Typography>
        </Typography>
      ) : (
        <Typography
          sx={{
            color: 'var(--day-title, #262626)',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 700,
            mb: '16px'
          }}
        >
          Время вышло
        </Typography>
      )}
      <LinearProgress variant="determinate" value={percentage > 0 ? percentage : 0} />
    </>
  );
}
