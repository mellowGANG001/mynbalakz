export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
}

export interface Tariff {
  id: string;
  name: string;
  description: string;
  price: number;
  isPopular?: boolean;
}

export interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  color: "green" | "yellow" | "blue";
}

export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  stat: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}
