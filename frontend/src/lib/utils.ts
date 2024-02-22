import { Currency } from '@/types';

export function formatSumToString(amount: number, currency: Currency) {
  const currencySymbols: Record<Currency, string> = {
    'EUR': '€',
    'RUB': '₽',
    'USD': '$',
  };

  return `${amount} ${currencySymbols[currency]}`;
}
