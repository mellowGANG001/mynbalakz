import dynamic from "next/dynamic";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";

const PhotoGrid = dynamic(() => import("@/components/sections/PhotoGrid").then((mod) => mod.PhotoGrid));
const Promos = dynamic(() => import("@/components/sections/Promos").then((mod) => mod.Promos));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then((mod) => mod.FAQ));
const Newsletter = dynamic(() => import("@/components/sections/Newsletter").then((mod) => mod.Newsletter));
const Footer = dynamic(() => import("@/components/sections/Footer").then((mod) => mod.Footer));

export default function MarketingHome() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PhotoGrid />
      <Promos />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
