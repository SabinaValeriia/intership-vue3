import moment, { unitOfTime } from 'moment';

export function getDate(date: Date, aspect: unitOfTime.All): number {
  return moment(date).get(aspect);
}

