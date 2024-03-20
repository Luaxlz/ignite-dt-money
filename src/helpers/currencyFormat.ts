export default function currencyFormatter(currency: number) {
  const formattedCurrency = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(currency);

  return formattedCurrency;
}
