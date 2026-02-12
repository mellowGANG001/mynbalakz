import dynamic from "next/dynamic";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";

const Features = dynamic(() => import("@/components/sections/Features").then((mod) => mod.Features));
const Parks = dynamic(() => import("@/components/sections/Parks").then((mod) => mod.Parks));
const Restaurants = dynamic(() => import("@/components/sections/Restaurants").then((mod) => mod.Restaurants));
const Tickets = dynamic(() => import("@/components/sections/Tickets").then((mod) => mod.Tickets));
const Promos = dynamic(() => import("@/components/sections/Promos").then((mod) => mod.Promos));
const Newsletter = dynamic(() => import("@/components/sections/Newsletter").then((mod) => mod.Newsletter));
const Footer = dynamic(() => import("@/components/sections/Footer").then((mod) => mod.Footer));

export default function MarketingHome() {
  return (
    <main className="min-h-screen bg-[#F8F8F8]">
      <Header />
      <Hero />
      <Features />
      <Parks />
      <Restaurants />
      <Tickets />
      <Promos />
      <Newsletter />
      <Footer />
    </main>
  );
}
