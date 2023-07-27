import React from 'react';
import { PatternFormat } from 'react-number-format';

export default function CardNumberFormat({ value }) {
  return <PatternFormat displayType="text" format="#### #### #### ####" mask="_" defaultValue={value} />;
}
