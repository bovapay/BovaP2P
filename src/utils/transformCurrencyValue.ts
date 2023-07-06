export const currencySign = {
  USDT: '₸',
  RUB: '₽'
};

export function transformCurrencyValue(number: number, settings?: { currency: 'USDT' | 'RUB' }) {
  const shortNumber = number.toFixed(2);
  const [leftVal, rightVal] = shortNumber.split('.');
  const reversedValArray = leftVal.split('').reverse();
  let validLeftVal = reversedValArray
    .map((i, idx) =>
      (idx + 1) % 3 === 0 && (idx !== reversedValArray.length || (reversedValArray.includes('-') && idx !== reversedValArray.length - 1))
        ? ` ${i}`
        : i
    )
    .reverse()
    .join('');
  if (validLeftVal.split('')[0] === ' ') {
    validLeftVal = validLeftVal.replace(' ', '');
  }
  let value = `${validLeftVal}${+rightVal > 0 ? `,${+rightVal}` : ''}`;
  if (settings?.currency) {
    value = `${currencySign[settings.currency]} ${value}`;
  }
  return value;
}
