import dynamic from "next/dynamic";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";

const PhotoGrid = dynamic(() => import("@/components/sections/PhotoGrid").then((mod) => mod.PhotoGrid));
const ParkMap = dynamic(() => import("@/components/sections/ParkMap").then((mod) => mod.ParkMap));
const Tickets = dynamic(() => import("@/components/sections/Tickets").then((mod) => mod.Tickets));
const Promos = dynamic(() => import("@/components/sections/Promos").then((mod) => mod.Promos));
const Reviews = dynamic(() => import("@/components/sections/Reviews").then((mod) => mod.Reviews));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then((mod) => mod.FAQ));
const Newsletter = dynamic(() => import("@/components/sections/Newsletter").then((mod) => mod.Newsletter));
const Footer = dynamic(() => import("@/components/sections/Footer").then((mod) => mod.Footer));
const BirthdayPopup = dynamic(() => import("@/components/sections/BirthdayPopup").then((mod) => mod.BirthdayPopup));

export default function MarketingHome() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PhotoGrid />
      <ParkMap />
      <Tickets />
      <Promos />
      <Reviews />
      <FAQ />
      <Newsletter />
      <Footer />
      <BirthdayPopup />
    </main>
  );
}
