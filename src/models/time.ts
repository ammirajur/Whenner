const MILLISECONDS_PER_MINUTE = 60000;
const MILLISECONDS_PER_HOUR = 3600000;
const MILLISECONDS_PER_DAY = 86400000;

/**
 * Use instead of Date for easy mocking in tests
 */
export const Time = {
  current: () => new Date(),
  now: () => Date.now(),

  today: () => new Date(Time.current().setHours(0, 0, 0, 0)),

  tomorrow: () => new Date(Time.today().getTime() + MILLISECONDS_PER_DAY),
  dayAfterTomorrow: () =>
    new Date(Time.tomorrow().getTime() + MILLISECONDS_PER_DAY),
  dayAfter: (date: Date) =>
    new Date(new Date(date).setHours(0, 0, 0, 0) + MILLISECONDS_PER_DAY),

  yesterday: () => new Date(Time.today().getTime() - MILLISECONDS_PER_DAY),

  earliest: (...dates: Date[]) =>
    dates.reduce((prev, current) => (current < prev ? current : prev)),
  latest: (...dates: Date[]) =>
    dates.reduce((prev, current) => (current > prev ? current : prev)),

  set: (to: Date) => {
    Time.current = () => new Date(to);
    Time.now = () => to.getTime();
  }
};

export interface Start {
  readonly start: Date;
}

export function inStartOrder<T extends Start>(...starts: T[]) {
  return starts.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export interface End {
  readonly end: Date;
}

export interface Estimated {
  readonly estimate: number;
}

export type StartEstimated = Start & Estimated;
export type EndEstimated = End & Estimated;
export type Period = Start & End;

export function period(item: any): Period | undefined {
  if(item && item.start && item.end){
    return item;
  }

  return undefined;
}

export function estimated(item: any): Estimated | undefined {
  if(item && item.estimate){
    return item;
  }

  return undefined;
}

export function periodsOverlap(period1: Period, period2: Period) {
  return (
    (period1.start < period2.start && period1.end > period2.start) ||
    (period1.start > period2.start && period1.start < period2.end)
  );
}

export function addHour(toDate: Date) {
  return new Date(toDate.getTime() + MILLISECONDS_PER_HOUR);
}

export function add30Minutes(toDate: Date) {
  return new Date(toDate.getTime() + MILLISECONDS_PER_MINUTE * 30);
}

export function latestOf(...dates: Date[]) {
  return dates.reduce(function(date1, date2) {
    return date1 > date2 ? date1 : date2;
  });
}
