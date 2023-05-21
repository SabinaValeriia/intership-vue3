import moment from 'moment';

export function isBeforeDate(dateF: Date, dateS: Date): boolean {
  return moment(dateF).isBefore(dateS);
}
