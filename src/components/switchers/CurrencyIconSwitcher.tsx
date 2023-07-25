import React from 'react';

import { ReactComponent as GeIcon } from 'assets/icons/countries/ge.svg';
import { ReactComponent as RuIcon } from 'assets/icons/countries/ru.svg';
import { ReactComponent as IdIcon } from 'assets/icons/countries/id.svg';

export default function CurrencyIconSwitcher({ currency, height }: { currency: string; height: number }) {
  const style = { height: height };
  switch (currency) {
    case 'rub':
      return <RuIcon style={style} />;
    case 'gel':
      return <GeIcon style={style} />;
    case 'idr':
      return <IdIcon style={style} />;
    default:
      return <></>;
  }
}
