export function formatCurrency(priceCents) {
    return ((Math.round(priceCents) / 100)* 80).toFixed(2);
}         

export default formatCurrency;