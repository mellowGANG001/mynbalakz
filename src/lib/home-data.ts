import type { Branch, FeatureItem, MenuItem, PromoItem, Tariff } from "@/types/content";

export const features: FeatureItem[] = [
  { id: "parks", title: "4 ПАРКА", subtitle: "Тараз, Шымкент, Аксу, Атырау", stat: "4" },
  { id: "rides", title: "50+ АТТРАКЦИОНОВ", subtitle: "Для детей и всей семьи", stat: "50+" },
  { id: "events", title: "КАЖДЫЕ ВЫХОДНЫЕ", subtitle: "Шоу, квесты и праздники", stat: "2x" },
  { id: "safety", title: "БЕЗОПАСНОСТЬ", subtitle: "Контроль и забота на каждом шаге", stat: "24/7" },
];

export const branches: Branch[] = [
  {
    id: "taraz",
    name: "MYNBALA TARAZ",
    city: "Тараз",
    address: "ТРЦ Grand Park",
    phone: "+7 (7262) 50-50-50",
    hours: "Ежедневно 10:00 - 22:00",
    image: "/images/placeholders/branch-1.jpg",
  },
  {
    id: "shymkent",
    name: "MYNBALA SHYMKENT",
    city: "Шымкент",
    address: "ТРЦ Mega City",
    phone: "+7 (7252) 50-50-50",
    hours: "Ежедневно 10:00 - 22:00",
    image: "/images/placeholders/branch-2.jpg",
  },
  {
    id: "aksu",
    name: "MYNBALA AKSU",
    city: "Аксу",
    address: "ул. Сатпаева, 15",
    phone: "+7 (7183) 50-50-50",
    hours: "Ежедневно 10:00 - 21:00",
    image: "/images/placeholders/branch-3.jpg",
  },
  {
    id: "atyrau",
    name: "MYNBALA ATYRAU",
    city: "Атырау",
    address: "ТРЦ Atyrau Plaza",
    phone: "+7 (7122) 50-50-50",
    hours: "Ежедневно 10:00 - 22:00",
    image: "/images/placeholders/branch-4.jpg",
  },
];

export const tariffs: Tariff[] = [
  { id: "weekday", name: "Будни (Пн-Пт)", description: "Безлимит до закрытия", price: 5000 },
  { id: "weekend", name: "Выходные (Сб-Вс)", description: "Безлимит до закрытия", price: 7000, isPopular: true },
  { id: "evening", name: "Вечерний тариф", description: "С 18:00 до закрытия", price: 4000 },
];

export const promos: PromoItem[] = [
  {
    id: "birthday",
    title: "ДЕНЬ РОЖДЕНИЯ",
    subtitle: "С КРУПНОЙ СКИДКОЙ",
    description: "Имениннику подарок и специальная программа для всей компании.",
    ctaLabel: "Выбрать программу",
    color: "yellow",
  },
  {
    id: "family",
    title: "СЕМЕЙНЫЙ УИКЕНД",
    subtitle: "-20% НА БИЛЕТЫ",
    description: "Скидка действует при покупке от 3 билетов в выходные дни.",
    ctaLabel: "Получить скидку",
    color: "green",
  },
  {
    id: "restaurant",
    title: "КОМБО + ПАРК",
    subtitle: "ВЫГОДНЕЕ ДО 30%",
    description: "Билет в парк + меню ресторана по специальной цене.",
    ctaLabel: "Смотреть комбо",
    color: "blue",
  },
];

export const menuHighlights: MenuItem[] = [
  {
    id: "pizza",
    name: "Семейная пицца",
    category: "Пицца",
    price: "от 4 900 ₸",
    image: "/images/placeholders/menu-1.jpg",
  },
  {
    id: "combo",
    name: "Kids combo",
    category: "Сеты",
    price: "от 3 200 ₸",
    image: "/images/placeholders/menu-2.jpg",
  },
  {
    id: "dessert",
    name: "Праздничные десерты",
    category: "Десерты",
    price: "от 1 600 ₸",
    image: "/images/placeholders/menu-3.jpg",
  },
];
