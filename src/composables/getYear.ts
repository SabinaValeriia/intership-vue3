import moment from 'moment';

export function getYear(date: Date): number {
  return moment(date).get('year');
}
