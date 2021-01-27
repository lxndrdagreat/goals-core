export function isSameDate(a: Date, b: Date): boolean {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

export function dateStart(date: Date): Date {
  const start = new Date(date);
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);
  return start;
}

export function weekStart(startingDate: Date): Date {
  const weekStart = new Date(startingDate);
  weekStart.setHours(0);
  weekStart.setMinutes(0);
  weekStart.setSeconds(0);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  return weekStart;
}

export function calculateWeeksBetweenTwoDates(date1: Date, date2: Date): number {
  // The number of milliseconds in one week
  const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
  // Convert both dates to milliseconds
  const date1_ms = date1.getTime();
  const date2_ms = date2.getTime();
  // Calculate the difference in milliseconds
  const difference_ms = Math.abs(date1_ms - date2_ms);
  // Convert back to weeks and return whole weeks
  return Math.floor(difference_ms / ONE_WEEK);
}

export function calculateDaysBetweenTwoDates(date1: Date, date2: Date): number {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;
  // Convert both dates to milliseconds
  const date1_ms = date1.getTime();
  const date2_ms = date2.getTime();
  // Calculate the difference in milliseconds
  const difference_ms = Math.abs(date1_ms - date2_ms);
  // Convert back to weeks and return whole days
  const d = Math.floor(difference_ms / ONE_DAY);
  if (d === 0) {
    return date1.getDate() !== date2.getDate() ? 1 : 0;
  } else {
    return d;
  }
}
