function currencySignSwitcher(currency: string) {
  switch (currency) {
    case 'rub':
      return '₽';
    case 'gel':
      return '₾';
    case 'idr':
      return 'Rp';
    case 'usdt':
      return '₸';
    case 'byn':
      return 'Br';
    case 'uzs':
      return `so'm`;
    case 'kgs':
      return 'сом';
    default:
      return '';
  }
}

export function transformCurrencyValue(number: number, settings?: { currency: 'USDT' | 'RUB' | 'usdt' | 'rub' }) {
  // const shortNumber = number.toFixed(2);
  // const [leftVal, rightVal] = shortNumber.split('.');
  // const reversedValArray = leftVal.split('').reverse();
  // let validLeftVal = reversedValArray
  //   .map((i, idx) =>
  //     (idx + 1) % 3 === 0 && (idx !== reversedValArray.length || (reversedValArray.includes('-') && idx !== reversedValArray.length - 1))
  //       ? ` ${i}`
  //       : i
  //   )
  //   .reverse()
  //   .join('');
  // if (validLeftVal.split('')[0] === ' ') {
  //   validLeftVal = validLeftVal.replace(' ', '');
  // }
  // let value = `${validLeftVal}${+rightVal > 0 ? `,${+rightVal}` : ''}`;
  // if (settings?.currency) {
  //   value = `${value} ${currencySignSwitcher(settings?.currency?.toLowerCase())}`;
  // }
  // return value;
  const formatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2
  });
  let value = formatter.format(number);
  if (settings?.currency) {
    value = `${value} ${currencySignSwitcher(settings?.currency?.toLowerCase())}`;
  }
  return value;
}
