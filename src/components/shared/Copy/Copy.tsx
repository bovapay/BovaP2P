import React from 'react';

import useCopyToClipboard from 'hooks/useCopyToClipboard';
import { IconButton, Tooltip } from '@mui/material';
import { CopyOutlined } from '@ant-design/icons';

export default function Copy({ value }: { value: string }) {
  const [copiedValue, copy] = useCopyToClipboard();

  return (
    <Tooltip title="Копировать">
      <IconButton onClick={() => copy(value)}>
        <CopyOutlined />
      </IconButton>
    </Tooltip>
  );
}
