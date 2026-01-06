const percentFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatPercent = (value: number | null | undefined): string =>
  value === null || value === undefined ? '—' : `${percentFormatter.format(value)}%`;

export const formatCurrency = (value: number | null | undefined): string =>
  value === null || value === undefined ? '—' : currencyFormatter.format(value);

export const formatNumber = (value: number | null | undefined, digits = 2): string =>
  value === null || value === undefined
    ? '—'
    : value.toLocaleString('en-US', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      });

