import React from 'react';

import useCopyToClipboard from 'hooks/useCopyToClipboard';
import { IconButton, Tooltip } from '@mui/material';
import { CopyOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

export default function Copy({ value }: { value: string }) {
  const [copiedValue, copy] = useCopyToClipboard();

  return (
    <Tooltip title={<FormattedMessage id="copy" />}>
      <IconButton onClick={() => copy(value)}>
        <CopyOutlined />
      </IconButton>
    </Tooltip>
  );
}
