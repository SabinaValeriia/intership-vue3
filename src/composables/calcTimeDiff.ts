import moment from 'moment';

export function calcTimeDiff(start: Date, end: Date, unit: moment.unitOfTime.Diff): number {
  return moment(end).diff(start, unit);
}
