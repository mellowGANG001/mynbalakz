"use client";

import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import Link from "next/link";
import { branches } from "@/lib/home-data";
import { ROUTES } from "@/config/routes";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 26 },
  },
};

export function ParkMap() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Heading */}
        <motion.h2
          className="text-outline-huge"
          style={{ fontSize: "clamp(60px, 12vw, 80px)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Выберите парк
        </motion.h2>

        {/* Decorative search pill */}
        <motion.div
          className="relative max-w-md"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            className="form-input pl-13 md:pl-14"
            placeholder="Поиск по городу или адресу…"
            readOnly
            aria-label="Поиск парка"
            style={{ paddingLeft: 52 }}
          />
        </motion.div>

        {/* Map embed */}
        <motion.div
          className="rounded-3xl overflow-hidden bg-gray-100 min-h-[300px] md:min-h-[450px] relative"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <iframe
            src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A48.0%2C%22lon%22%3A68.0%2C%22zoom%22%3A5%7D%2C%22opt%22%3A%7B%22city%22%3A%22kazakhstan%22%7D%2C%22org%22%3A%22mynbala%22%7D"
            className="w-full h-full absolute inset-0"
            style={{ border: 0, minHeight: "inherit" }}
            loading="lazy"
            title="Карта парков MYNBALA"
            allowFullScreen
          />
          {/* Fallback overlay in case iframe doesn't load */}
          <noscript>
            <div className="flex items-center justify-center h-full text-gray-400 font-bold text-lg">
              Карта парков
            </div>
          </noscript>
        </motion.div>

        {/* Park cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {branches.map((branch) => (
            <motion.div key={branch.id} variants={itemVariants}>
              <Link href={ROUTES.parks} className="block group">
                <div className="rounded-2xl bg-[var(--surface-soft)] p-5 md:p-6 space-y-2 transition-all duration-300 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1">
                  <h3 className="font-black text-base md:text-lg text-[var(--ink)] leading-tight group-hover:text-[var(--primary)] transition-colors">
                    {branch.name}
                  </h3>
                  <p className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <MapPin className="w-4 h-4 flex-shrink-0 text-[var(--primary)]" />
                    {branch.city} &middot; {branch.address}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
