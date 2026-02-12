export type PromoOffer = {
  id: string;
  title: string;
  discount: number | null;
  valid_until: string;
};

export function getPromoCodeFromId(id: string) {
  return `MYN-${id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase()}`;
}

export function normalizePromoCode(value: string) {
  return value.trim().toUpperCase();
}

export function isPromoExpired(validUntil: string) {
  return Number(new Date(validUntil)) < Date.now();
}

export function findPromoByCode(promos: PromoOffer[], rawCode: string) {
  const normalizedCode = normalizePromoCode(rawCode);
  return promos.find((promo) => {
    if (promo.id === normalizedCode || promo.id.toUpperCase() === normalizedCode) {
      return true;
    }
    return getPromoCodeFromId(promo.id) === normalizedCode;
  });
}

