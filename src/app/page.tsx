"use client";

import { motion } from "framer-motion";
import { ChevronRight, Gamepad2, Shield, Zap } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

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
  },
];

const ADMINS = [
  {
    name: "KMoney",
    role: "Founder & Lead Admin",
    whatsapp: "https://wa.me/2347062826313",
  },
];

export default function Home() {
  return (
    <div className="w-full">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#000F4D] z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-gold)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#002BB8]/80 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8 py-20 flex flex-col items-center text-center">
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
            className="text-5xl md:text-7xl font-black text-white max-w-4xl tracking-tighter mb-6 leading-tight uppercase italic drop-shadow-lg"
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
            Instantly acquire premium eFootball accounts loaded with Epic cards,
            Showtime players, and unlimited potential. Skip the grind, start
            winning.
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
            <a
              href="https://wa.me/2347062826313?text=Hi%20KMoney%20Store,%20I%20want%20to%20inquire%20about%20buying/selling%20an%20eFootball%20account."
              target="_blank"
              rel="noreferrer"
              className="group bg-[#001A88] p-8 rounded-3xl border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/40 hover:bg-[#0022AA] transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(251,239,11,0.15)] flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[var(--color-gold)]/10 rounded-2xl flex items-center justify-center mb-6 text-[var(--color-gold)] group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic mb-3">
                Buy / Sell Accounts
              </h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">
                Trade your old account or purchase a premium Division 1 ready
                squad securely.
              </p>
              <span className="w-full text-center px-6 py-3 bg-[var(--color-gold)]/10 text-[var(--color-gold)] font-bold rounded-xl text-sm group-hover:bg-[var(--color-gold)] group-hover:text-[#000F4D] transition-colors">
                Request Service
              </span>
            </a>

            <a
              href="https://wa.me/2347062826313?text=Hi%20KMoney%20Store,%20I%20would%20like%20to%20purchase%20some%20eFootball%20coins."
              target="_blank"
              rel="noreferrer"
              className="group bg-[#001A88] p-8 rounded-3xl border border-[var(--color-gold)]/10 hover:border-[#25D366]/40 hover:bg-[#0022AA] transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(37,211,102,0.15)] flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mb-6 text-[#25D366] group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic mb-3">
                Coins Purchase
              </h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">
                Get eFootball coins added to your account instantly at the best
                market rates.
              </p>
              <span className="w-full text-center px-6 py-3 bg-[#25D366]/10 text-[#25D366] font-bold rounded-xl text-sm group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                Request Service
              </span>
            </a>

            <a
              href="https://wa.me/2347062826313?text=Hi%20KMoney%20Store,%20I%20am%20interested%20in%20a%20custom%20formation."
              target="_blank"
              rel="noreferrer"
              className="group bg-[#001A88] p-8 rounded-3xl border border-[var(--color-gold)]/10 hover:border-white/40 hover:bg-[#0022AA] transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic mb-3">
                Custom Formation
              </h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">
                Get expert guidance and META custom formations designed to
                uniquely fit your playstyle.
              </p>
              <span className="w-full text-center px-6 py-3 bg-white/10 text-white font-bold rounded-xl text-sm group-hover:bg-white group-hover:text-[#000F4D] transition-colors">
                Request Service
              </span>
            </a>
          </div>
        </div>
      </section>

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

      <section className="py-24 bg-[#000F4D] relative border-t border-[var(--color-gold)]/10">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex flex-col items-center bg-[#001A88] p-8 rounded-3xl border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/30 transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(251,239,11,0.15)] group"
              >
                <div className="w-32 h-32 rounded-full mb-6 bg-[#0022AA] border-4 border-[#000F4D] outline outline-2 outline-[var(--color-gold)]/50 overflow-hidden flex items-center justify-center relative group-hover:outline-[var(--color-gold)] transition-all">
                  <span className="text-4xl font-black text-[var(--color-gold)]/30">
                    {admin.name.charAt(0)}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white uppercase italic mb-1 group-hover:text-gradient-gold transition-all">
                  {admin.name}
                </h3>
                <span className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-6">
                  {admin.role}
                </span>

                {admin.whatsapp !== "#" ? (
                  <a
                    href={admin.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl flex items-center gap-2 transition-transform hover:scale-105 shadow-[0_0_15px_rgba(37,211,102,0.3)] text-sm"
                  >
                    MESSAGE ON WHATSAPP
                  </a>
                ) : (
                  <button
                    disabled
                    className="mt-auto px-4 py-3 bg-white/5 text-gray-500 font-bold rounded-xl flex items-center gap-2 cursor-not-allowed border border-white/10 text-sm"
                  >
                    LINK COMING SOON
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
