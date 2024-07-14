import { Temporal } from '@js-temporal/polyfill';

export function formatDateTime(
  dateTimeISO: string,
  options: {
    year?: boolean;
    month?: boolean;
    day?: boolean;
    hour?: boolean;
    minute?: boolean;
    second?: boolean;
  } = { year: true, month: true, day: true, hour: true, minute: true, second: true }
): string {
  const zoned = Temporal.Instant.from(dateTimeISO).toZonedDateTimeISO(
    Temporal.Now.zonedDateTimeISO()
  );

  const dateParts: string[] = [];
  const timeParts: string[] = [];

  if (options.year) {
    dateParts.push(zoned.year.toString());
  }
  if (options.month) {
    dateParts.push(zoned.month.toString().padStart(2, '0'));
  }
  if (options.day) {
    dateParts.push(zoned.day.toString().padStart(2, '0'));
  }

  if (options.hour) {
    timeParts.push(zoned.hour.toString().padStart(2, '0'));
  }
  if (options.minute) {
    timeParts.push(zoned.minute.toString().padStart(2, '0'));
  }
  if (options.second) {
    timeParts.push(zoned.second.toString().padStart(2, '0'));
  }

  const dateOutput = dateParts.join('. ');
  const timeOutput = timeParts.join(':');
  return [dateOutput, timeOutput].filter((p) => p).join(' ');
}
