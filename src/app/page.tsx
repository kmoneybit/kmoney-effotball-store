"use client";

import { motion } from "framer-motion";
import { ChevronRight, Gamepad2, Shield, Zap, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";

const HERO_PLAYERS = [
  { src: "/players/neymar-concept.jpg", alt: "Neymar Jr" },
  { src: "/players/ronaldo-concept.jpg", alt: "Ronaldo" },
  { src: "/players/son-blitz.jpg", alt: "Son Blitz" },
  { src: "/players/messi-card.jpg", alt: "Messi (Card)" },
  { src: "/players/goats.jpg", alt: "GOATs" },
  { src: "/players/showcase-1.jpg", alt: "Showcase 1" },
];

const FEATURED_ACCOUNTS = [
  {
    id: "acc-1",
    title: "Epic Big Time Squad",
    description:
      "A fully loaded account featuring top-tier Big Time legends and absolute game-changers.",
    highlights: [
      "5x Epic Cards",
      "10x Showtime Players",
      "Division 1 Ready",
      "15,000 eFootball Coins",
    ],
    imageUrl: "/players/batistuta.jpg",
  },
  {
    id: "acc-2",
    title: "Showtime Legends Pack",
    description:
      "Perfect for competitive players looking to dominate the midfield and attack.",
    highlights: [
      "3x Epic Cards",
      "8x Showtime Players",
      "Fully Trained Squad",
      "5,000 eFootball Coins",
    ],
    imageUrl: "/players/son-blitz.jpg",
  },
  {
    id: "acc-3",
    title: "Starter Pro Edition",
    description:
      "Get a huge head start with this well-rounded account featuring META standard and POTW cards.",
    highlights: [
      "15x Premium POTW",
      "High Team Playstyle",
      "Great for Beginners",
      "2,000 eFootball Coins",
    ],
    imageUrl: "/players/player-1.jpg",
  },
  {
    id: "acc-4",
    title: "Neymar Master Class",
    description:
      "Build around the magic of Neymar with this premium concept account featuring creative players.",
    highlights: [
      "6x Epic Cards",
      "12x Showtime Players",
      "Attacking Playstyle",
      "20,000 eFootball Coins",
    ],
    imageUrl: "/players/neymar-concept.jpg",
  },
  {
    id: "acc-5",
    title: "Ronaldo Championship",
    description:
      "Experience the power and precision of a Ronaldo-focused squad with top-tier strikers.",
    highlights: [
      "7x Epic Cards",
      "15x Premium Players",
      "Elite Striker Setup",
      "25,000 eFootball Coins",
    ],
    imageUrl: "/players/ronaldo-concept.jpg",
  },
  {
    id: "acc-6",
    title: "Messi Showcase",
    description:
      "A creative playmaker-focused account featuring unique Messi cards and flair.",
    highlights: [
      "5x Epic Cards",
      "10x Premium Players",
      "Playmaker Style",
      "12,000 eFootball Coins",
    ],
    imageUrl: "/players/messi-card.jpg",
  },
  {
    id: "acc-7",
    title: "Showcase Collection",
    description:
      "Curated showcase accounts for streaming and content creators.",
    highlights: [
      "Multiple Showcase Players",
      "High Appeal Squad",
      "Fully Trained",
      "10,000 eFootball Coins",
    ],
    imageUrl: "/players/showcase-2.jpg",
  },
  {
    id: "acc-8",
    title: "GOATs Ultimate",
    description:
      "A legendary collection featuring GOAT-tier players across eras.",
    highlights: [
      "Legendary Cards",
      "Top Chemistry",
      "Collector's Item",
      "30,000 eFootball Coins",
    ],
    imageUrl: "/players/goats.jpg",
  },
];

const ADMINS = [
  {
    name: "KMoney",
    role: "Founder & Lead Admin",
    whatsapp: "https://wa.me/2347062826313",
    image: "/admin-profile.jpg",
  },
];

function HeroImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_PLAYERS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[550px]">
      {/* Glow ring behind image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full bg-[var(--color-gold)]/12 blur-[90px] animate-pulse" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[60%] h-[60%] rounded-full border-2 border-[var(--color-gold)]/20 animate-slow-rotate" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[75%] h-[75%] rounded-full border border-[var(--color-gold)]/10 animate-[spin_40s_linear_infinite_reverse]" />
      </div>

      {HERO_PLAYERS.map((player, index) => (
        <motion.div
          key={player.alt}
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="relative w-[90%] h-[90%] rounded-3xl overflow-hidden border-2 border-[var(--color-gold)]/25 shadow-[0_0_80px_rgba(251,239,11,0.2)] group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Image
              src={player.src}
              alt={player.alt}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000F4D] via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#000F4D]/40 to-transparent" />

            {/* Player name badge */}
            <motion.div
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="text-white font-black text-lg italic uppercase tracking-wider drop-shadow-lg">
                {player.alt}
              </span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                  >
                    <Star className="w-4 h-4 text-[var(--color-gold)] fill-[var(--color-gold)]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* Carousel dots */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_PLAYERS.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-[var(--color-gold)] w-8"
                : "bg-white/20 w-4 hover:bg-white/40"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[#000F4D] z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-gold)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#002BB8]/80 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-[var(--color-gold)]/3 rounded-full blur-[200px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 backdrop-blur-sm mb-8"
              >
                <Zap className="w-4 h-4 text-[var(--color-gold)]" />
                <span className="text-sm font-medium text-[var(--color-gold)]">
                  The #1 eFootball Store
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white max-w-4xl tracking-tighter mb-6 leading-[0.9] uppercase italic drop-shadow-lg"
              >
                DOMINATE THE PITCH. <br />
                <span className="text-gradient-gold">ELEVATE YOUR GAME.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
              >
                Instantly acquire premium eFootball accounts loaded with Epic
                cards, Showtime players, and unlimited potential. Skip the
                grind, start winning.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <a
                  href="#products"
                  className="px-8 py-4 bg-[var(--color-gold)] hover:bg-[var(--color-gold-hover)] text-[#000F4D] italic font-black text-lg rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(251,239,11,0.3)] hover:shadow-[0_0_30px_rgba(251,239,11,0.5)] hover:-translate-y-1"
                >
                  Browse Accounts <ChevronRight className="w-5 h-5" />
                </a>
                <a
                  href="#services"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-lg italic rounded-xl flex items-center justify-center gap-2 transition-all hover:border-white/20"
                >
                  Our Services
                </a>
              </motion.div>
            </div>

            {/* Hero Image Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-[450px] lg:h-[550px]"
            >
              <HeroImageCarousel />
            </motion.div>
          </div>

          {/* Trust stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 text-left max-w-4xl w-full border-t border-white/5 pt-12"
          >
            <div className="flex flex-col gap-2 relative">
              <Shield className="w-8 h-8 text-[var(--color-gold)] mb-2" />
              <h3 className="text-white font-bold text-xl">100% Secure</h3>
              <p className="text-gray-500 text-sm">
                Full access and email change guarantee on all accounts.
              </p>
            </div>
            <div className="flex flex-col gap-2 relative">
              <Zap className="w-8 h-8 text-[var(--color-gold)] mb-2" />
              <h3 className="text-white font-bold text-xl">Instant Delivery</h3>
              <p className="text-gray-500 text-sm">
                Get your account details immediately via WhatsApp after pay.
              </p>
            </div>
            <div className="flex flex-col gap-2 relative col-span-2 md:col-span-1">
              <Gamepad2 className="w-8 h-8 text-[var(--color-gold)] mb-2" />
              <h3 className="text-white font-bold text-xl">Top Tier Squads</h3>
              <p className="text-gray-500 text-sm">
                Curated selection of accounts with META players and Epics.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PLAYER SHOWCASE STRIP ═══════════ */}
      <section className="relative py-6 bg-[#000A33] border-y border-[var(--color-gold)]/10 overflow-hidden">
        <div className="flex animate-marquee items-center gap-8 whitespace-nowrap">
          {[...HERO_PLAYERS, ...HERO_PLAYERS, ...HERO_PLAYERS].map(
            (player, i) => (
              <div
                key={`${player.alt}-${i}`}
                className="flex-shrink-0 flex items-center gap-3 px-4"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--color-gold)]/30 flex-shrink-0">
                  <Image
                    src={player.src}
                    alt={player.alt}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-white/60 font-bold text-sm uppercase tracking-widest italic">
                  {player.alt}
                </span>
                <Star className="w-3.5 h-3.5 text-[var(--color-gold)] fill-[var(--color-gold)]" />
              </div>
            ),
          )}
        </div>
      </section>

      {/* ═══════════ OUR SERVICES ═══════════ */}
      <section
        id="services"
        className="py-24 bg-[#000F4D] relative border-t border-[var(--color-gold)]/10"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
              OUR <span className="text-gradient-gold">SERVICES</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Choose from our premium eFootball services. Click any option to
              contact us directly on WhatsApp and secure your request.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Buy / Sell */}
            <motion.a
              href="https://wa.me/2347062826313?text=Hi%20KMoney%20Store,%20I%20want%20to%20inquire%20about%20buying/selling%20an%20eFootball%20account."
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group bg-gradient-to-br from-[#001A88] to-[#0d0d44] p-8 rounded-3xl border border-[var(--color-gold)]/15 hover:border-[var(--color-gold)]/50 hover:bg-[#0022AA] transition-all hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(251,239,11,0.25)] flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-16 h-16 bg-[var(--color-gold)]/15 rounded-2xl flex items-center justify-center mb-6 text-[var(--color-gold)] transition-transform"
                whileHover={{ scale: 1.15, rotate: 10 }}
              >
                <Shield className="w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl font-black text-white uppercase italic mb-3 group-hover:text-[var(--color-gold)] transition-colors">
                Buy / Sell Accounts
              </h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow group-hover:text-gray-300 transition-colors">
                Trade your old account or purchase a premium Division 1 ready
                squad securely.
              </p>
              <motion.span
                className="w-full text-center px-6 py-3 bg-[var(--color-gold)]/10 text-[var(--color-gold)] font-bold rounded-xl text-sm group-hover:bg-[var(--color-gold)] group-hover:text-[#000F4D] transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Request Service
              </motion.span>
            </motion.a>

            {/* Coins Purchase */}
            <motion.a
              href="https://wa.me/2347062826313?text=Hi%20KMoney%20Store,%20I%20would%20like%20to%20purchase%20some%20eFootball%20coins."
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group bg-gradient-to-br from-[#001A88] to-[#0d0d44] p-8 rounded-3xl border border-[#25D366]/15 hover:border-[#25D366]/50 hover:bg-[#0022AA] transition-all hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(37,211,102,0.25)] flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-16 h-16 bg-[#25D366]/15 rounded-2xl flex items-center justify-center mb-6 text-[#25D366] transition-transform"
                whileHover={{ scale: 1.15, rotate: 10 }}
              >
                <Zap className="w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl font-black text-white uppercase italic mb-3 group-hover:text-[#25D366] transition-colors">
                Coins Purchase
              </h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow group-hover:text-gray-300 transition-colors">
                Get eFootball coins added to your account instantly at the best
                market rates.
              </p>
              <motion.span
                className="w-full text-center px-6 py-3 bg-[#25D366]/10 text-[#25D366] font-bold rounded-xl text-sm group-hover:bg-[#25D366] group-hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Request Service
              </motion.span>
            </motion.a>

            {/* Custom Formation */}
            <motion.a
              href="https://wa.me/2347062826313?text=Hi%20KMoney%20Store,%20I%20am%20interested%20in%20a%20custom%20formation."
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-gradient-to-br from-[#001A88] to-[#0d0d44] p-8 rounded-3xl border border-white/15 hover:border-white/50 hover:bg-[#0022AA] transition-all hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-6 text-white transition-transform"
                whileHover={{ scale: 1.15, rotate: 10 }}
              >
                <Gamepad2 className="w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl font-black text-white uppercase italic mb-3 group-hover:text-gradient-gold transition-colors">
                Custom Formation
              </h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow group-hover:text-gray-300 transition-colors">
                Get expert guidance and META custom formations designed to
                uniquely fit your playstyle.
              </p>
              <motion.span
                className="w-full text-center px-6 py-3 bg-white/10 text-white font-bold rounded-xl text-sm group-hover:bg-white group-hover:text-[#000F4D] transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Request Service
              </motion.span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED ACCOUNTS ═══════════ */}
      <section id="products" className="py-24 bg-[#000B33] relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                FEATURED <span className="text-gradient-gold">ACCOUNTS</span>
              </h2>
              <p className="text-gray-400 max-w-xl">
                Choose from our hand-picked selection of premium accounts ready
                for Division 1.
              </p>
            </div>

            <a
              href="https://wa.me/2347062826313?text=Hi%20KMoney%20Store,%20I'd%20like%20to%20see%20more%20accounts"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#001A88] border border-[var(--color-gold)]/20 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 font-bold rounded-lg transition-all flex items-center gap-2"
            >
              Request Custom Account <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_ACCOUNTS.map((account) => (
              <ProductCard key={account.id} {...account} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PLAYER GALLERY ═══════════ */}
      <section className="py-24 bg-[#000F4D] relative border-t border-[var(--color-gold)]/10 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
              LEGENDARY <span className="text-gradient-gold">PLAYERS</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              These are the kind of legends you get when you shop with KMoney
              Store.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { src: "/players/messi.jpg", name: "Messi", rating: "99" },
              {
                src: "/players/batistuta.jpg",
                name: "Batistuta",
                rating: "95",
              },
              { src: "/players/son.jpg", name: "Son", rating: "94" },
              { src: "/players/forlan.jpg", name: "Forlan", rating: "93" },
            ].map((player, index) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-[var(--color-gold)]/15 hover:border-[var(--color-gold)]/50 transition-all hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(251,239,11,0.3)] cursor-pointer"
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={player.src}
                  alt={player.name}
                  fill
                  className="object-cover group-hover:scale-120 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000F4D] via-[#000F4D]/30 to-transparent group-hover:from-[#000F4D]/90 transition-all duration-500" />

                {/* Rating badge */}
                <motion.div
                  className="absolute top-3 right-3 bg-[var(--color-gold)] text-[#000F4D] font-black text-sm px-3 py-1.5 rounded-lg shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  {player.rating}
                </motion.div>

                {/* Player info */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4"
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  <h3 className="text-white font-black text-lg uppercase italic mb-2 drop-shadow-lg group-hover:text-[var(--color-gold)] transition-colors">
                    {player.name}
                  </h3>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.4 + i * 0.05 }}
                      >
                        <Star className="w-3 h-3 text-[var(--color-gold)] fill-[var(--color-gold)]" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Extra images row */}
          <div className="grid grid-cols-3 gap-4 lg:gap-6 mt-6 lg:mt-8">
            {[
              { src: "/players/player-1.jpg", name: "Elite Pack 1" },
              { src: "/players/player-2.jpg", name: "Elite Pack 2" },
              { src: "/players/player-3.jpg", name: "Elite Pack 3" },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative aspect-video rounded-2xl overflow-hidden border border-white/15 hover:border-[var(--color-gold)]/40 transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(251,239,11,0.2)]"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000F4D]/90 via-[#000F4D]/40 to-transparent group-hover:from-[#000F4D] transition-all duration-500" />
                <motion.div
                  className="absolute bottom-3 left-3"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  <span className="text-white font-bold text-sm uppercase tracking-wider drop-shadow-lg">
                    {item.name}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MEET THE ADMINS ═══════════ */}
      <section className="py-24 bg-[#000B33] relative border-t border-[var(--color-gold)]/10">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            MEET THE <span className="text-gradient-gold">ADMINS</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-16">
            Our trusted team handling your premium eFootball accounts. Reach out
            to us directly for any inquiries!
          </p>

          <div className="flex justify-center gap-10 max-w-sm mx-auto w-full">
            {ADMINS.map((admin, idx) => (
              <motion.div
                key={admin.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                className="flex flex-col items-center bg-gradient-to-br from-[#001A88] to-[#0d0d44] p-8 rounded-3xl border border-[var(--color-gold)]/15 hover:border-[var(--color-gold)]/40 transition-all hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(251,239,11,0.25)] group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-32 h-32 rounded-full mb-6 bg-gradient-to-br from-[#0022AA] to-[#000a44] border-4 border-[#000F4D] outline outline-2 outline-[var(--color-gold)]/50 overflow-hidden flex items-center justify-center relative group-hover:outline-[var(--color-gold)] transition-all shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  initial={{ rotate: -5 }}
                >
                  {admin.image ? (
                    <Image
                      src={admin.image}
                      alt={admin.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="128px"
                    />
                  ) : (
                    <span className="text-5xl font-black text-[var(--color-gold)]/40">
                      {admin.name.charAt(0)}
                    </span>
                  )}
                </motion.div>

                <motion.h3
                  className="text-2xl font-black text-white uppercase italic mb-2 group-hover:text-gradient-gold transition-all"
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.3 + 0.2 }}
                >
                  {admin.name}
                </motion.h3>
                <motion.span
                  className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-6"
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.3 + 0.3 }}
                >
                  {admin.role}
                </motion.span>

                {admin.whatsapp !== "#" ? (
                  <motion.a
                    href={admin.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(37,211,102,0.3)] text-sm"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.3 + 0.4 }}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 0 25px rgba(37,211,102,0.6)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    MESSAGE ON WHATSAPP
                  </motion.a>
                ) : (
                  <motion.button
                    disabled
                    className="mt-auto px-4 py-3 bg-white/5 text-gray-500 font-bold rounded-xl flex items-center gap-2 cursor-not-allowed border border-white/10 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    viewport={{ once: true }}
                  >
                    LINK COMING SOON
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BUY WITH CONFIDENCE ═══════════ */}
      <section className="py-20 bg-[#000F4D] border-t border-[var(--color-gold)]/10">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[var(--color-gold)]/10 rounded-full flex items-center justify-center mb-8">
            <Shield className="w-10 h-10 text-[var(--color-gold)]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Buy With Complete Confidence
          </h2>
          <p className="text-gray-400 max-w-2xl mb-10 text-lg">
            Every account comes with a lifetime warranty against recovery. We
            guide you through the process of securing the Konami ID and linking
            your own email and password.
          </p>
          <a
            href="https://wa.me/2347062826313"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-gold)] font-bold hover:underline underline-offset-4 flex flex-row items-center gap-1"
          >
            Chat with us on WhatsApp for guarantees{" "}
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
