import React from 'react';

import { TableCell, TableRow, Typography } from '@mui/material';

export default function TableError({ children, colSpan }: { children?: React.ReactElement; colSpan?: number }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan || 1}>
        <Typography color={'error'} align="center">
          {children || 'Ошибка загрузки'}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
