const monthLabel = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

export function changeTime(timeData: number) {
  const time = timeData.toString();
  return time.length === 1 ? '0' + time : time;
}

function parseTime(date: any, withSeconds: boolean = false) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${changeTime(hours)}:${changeTime(minutes)}${withSeconds ? `:${changeTime(seconds)}` : ''}`;
}
type parseMode = 'default' | 'noWords' | 'monthOnly' | 'monthDay' | 'year';

function getDateWithoutHMS(val: Date) {
  const date = new Date(val);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0, 0);
  return date.getTime();
}

export function parseDate(dateData: string | Date | number, mode: parseMode = 'default', withSeconds: boolean = false) {
  const now = new Date();
  const date = new Date(dateData);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  if (mode === 'default' && getDateWithoutHMS(date) == getDateWithoutHMS(now)) {
    return `Сегодня, ${parseTime(date, withSeconds)}`;
  }
  if (mode === 'default' && getDateWithoutHMS(date) == getDateWithoutHMS(yesterday)) {
    return `Вчера, ${parseTime(date, withSeconds)}`;
  }

  if (mode === 'noWords') {
    return `${parseTime(date, withSeconds)}`;
  }
  if (mode === 'monthOnly') {
    return monthLabel[month];
  }
  if (mode === 'monthDay') {
    return `${changeTime(day)}.${changeTime(month + 1)}`;
  }
  if (mode === 'year') {
    return `${changeTime(day)}.${changeTime(month + 1)}.${year}`;
  }
  return `${changeTime(day)}.${changeTime(month + 1)}, ${parseTime(date, withSeconds)}`;
}
