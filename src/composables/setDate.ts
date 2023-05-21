import moment, { unitOfTime } from 'moment';

export function setDate(date: Date, aspect: unitOfTime.All, value: number): Date {
  return moment(date).set(aspect, value).toDate();
}
