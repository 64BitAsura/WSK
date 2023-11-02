/**
 * General axis tick formatting functions
 */
import isFinite from 'lodash/isFinite';
import toNumber from 'lodash/toNumber';

/**
 * @function
 * Determine if a string is readable/parseable date
 * @param input {string}
 */
const isValidDateString = (input: string) => !isNaN(new Date(input).getTime());

const locale = 'en-US';

const tickformatUSD = (value: any) => {
  let val;
  val = value;
  if (isFinite(toNumber(value))) {
    val = toNumber(value).toLocaleString(locale, {
      style: 'currency',
      currency: 'USD'
    });
  }

  return val;
};

const tickformatLocalString = (value: any) => {
  let val;
  val = value;
  if (isFinite(toNumber(value))) {
    val = toNumber(value).toLocaleString(locale);
  }

  return val;
};

const tickformatLocalStringForOneDimension = (value: any) => {
  let val;
  val = value;
  if (isFinite(toNumber(value))) {
    val = toNumber(value).toLocaleString(locale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    });
  }

  return val;
};

const tickformatLocalStringForTwoDimension = (value: any) => {
  let val;
  val = value;
  if (isFinite(toNumber(value))) {
    val = toNumber(value).toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  return val;
};

const percent = (value: any) => {
  let val;
  val = value;
  if (isFinite(toNumber(value))) {
    val = `${toNumber(value).toLocaleString(locale)}%`;
  }

  return val;
};

const percentOneDimension = (value: any) => {
  let val;
  val = value;
  if (isFinite(toNumber(value))) {
    val = `${toNumber(value).toLocaleString(locale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })}%`;
  }

  return val;
};

const percentTwoDimension = (value: any) => {
  let val;
  val = value;
  if (isFinite(toNumber(value))) {
    val = `${toNumber(value).toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}%`;
  }

  return val;
};

const dateFormatYYYY = (value: any) => {
  let val;
  val = value;
  if (isValidDateString(value)) {
    val = new Date(value).toLocaleDateString(locale, {
      year: 'numeric'
    });
  }

  return val;
};

const dateFormatMDYYYY = (value: any) => {
  let val;
  val = value;
  if (isValidDateString(value)) {
    val = new Date(value).toLocaleDateString(locale, {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  }

  return val;
};

const dateFormatMDYY = (value: any) => {
  let val;
  val = value;
  if (isValidDateString(value)) {
    val = new Date(value).toLocaleDateString(locale, {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    });
  }

  return val;
};

const dateFormatMMDDYYYY = (value: any) => {
  let val;
  val = value;
  if (isValidDateString(value)) {
    val = new Date(value).toLocaleDateString(locale, {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }

  return val;
};

const dateFormatMMYYYY = (value: any) => {
  let val;
  val = value;
  if (isValidDateString(value)) {
    val = new Date(value).toLocaleDateString(locale, {
      month: 'short',
      year: 'numeric'
    });
  }

  return val;
};

const dateFormatMMMDYYYY = (value: any) => {
  let val;
  val = value;
  if (isValidDateString(value)) {
    val = new Date(value).toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  return val;
};

const dateFormatISODATE = (value: any) => {
  let val;
  val = value;
  if (isValidDateString(value)) {
    val = new Date(value).toISOString();
  }

  return val;
};

const tickFormatLookup = {
  USD: tickformatUSD,
  localestring: tickformatLocalString,
  localestring1d: tickformatLocalStringForOneDimension,
  localestring2d: tickformatLocalStringForTwoDimension,
  percent: percent,
  percent1d: percentOneDimension,
  percent2d: percentTwoDimension,
  YYYY: dateFormatYYYY,
  'M/D/YYYY': dateFormatMDYYYY,
  'M/D/YY': dateFormatMDYY,
  'MM/DD/YYYY': dateFormatMMDDYYYY,
  'MM YYYY': dateFormatMMYYYY,
  'MMM D, YYYY': dateFormatMMMDYYYY,
  ISODATE: dateFormatISODATE,
  raw: (value) => value
};

/**
 * @function
 * @param value {any}
 * @param modifier {string}
 */
export const tickFormat = (value: any, modifier: string = 'raw') => tickFormatLookup[modifier](value);
