export const formatCurrency = (value: number, currency = "BRL", locale = "pt-BR") =>
   new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
