const DEFAULT_LOCALE = 'en-US';

const formats: Record<NumberFormatType, IntlConfig> = {
  decimal: {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    signDisplay: 'auto',
  },
  percent: {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
    signDisplay: 'always',
  },
  percentAbsolute: {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
    signDisplay: 'never',
  },
  currency: {
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
    currency: 'USD',
    currencyDisplay: 'code',
  },
  marketValue: {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 6,
    signDisplay: 'never',
  }
};

type IntlConfig = {
  style: 'decimal' | 'percent' | 'currency';
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  signDisplay?: 'never' | 'auto' | 'always';
  currency?: string;
  currencyDisplay?: string;
}

type NumberFormatType = 'decimal' | 'percent' | 'percentAbsolute' | 'currency' | 'marketValue';

type FormatFunction = (value: number, format?: NumberFormatType) => string;

const newFormatter = (format: NumberFormatType) => {
  return new Intl.NumberFormat(DEFAULT_LOCALE, formats[format]);
};

const useNumberFormat = () => {
  const numberFormat: FormatFunction = (value, format = 'decimal') => newFormatter(format).format((format === 'percent' || format === 'percentAbsolute') ? value / 100 : value);

  return { numberFormat };
};


export { useNumberFormat };