export const ROUTES = {
  home: "/",
  tickets: "/tickets",
  myTickets: "/my-tickets",
  parks: "/parks",
  restaurants: "/restaurants",
  promos: "/promos",
  support: "/support",
  profile: "/profile",
  birthday: "/birthday",
  attractions: "/attractions",
  cabinBooking: "/cabin-booking",
  authLogin: "/auth/login",
  authVerify: "/auth/verify",
  legalPrivacy: "/legal/privacy",
  legalTerms: "/legal/terms",
  legalOferta: "/legal/oferta",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
