"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EFootballIcon } from "./EFootballIcon";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-gold)]/20 bg-[#000F4D]/80 backdrop-blur supports-[backdrop-filter]:bg-[#000F4D]/60">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <EFootballIcon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-black text-2xl tracking-tighter uppercase italic text-white shadow-black drop-shadow-md">
            KMoney <span className="text-[var(--color-gold)]">Store</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center text-sm font-bold tracking-wider uppercase text-gray-200">
          <Link
            href="/"
            className="hover:text-[var(--color-gold)] transition-colors"
          >
            Home
          </Link>
          <a
            href="/#services"
            className="hover:text-[var(--color-gold)] transition-colors"
          >
            Services
          </a>
          <a
            href="/#products"
            className="hover:text-[var(--color-gold)] transition-colors"
          >
            Accounts
          </a>
          <Link
            href="/admin"
            className="hover:text-[var(--color-gold)] transition-colors"
          >
            Admin
          </Link>
          <Link
            href="https://wa.me/2347062826313"
            target="_blank"
            className="px-6 py-2 bg-[var(--color-gold)] text-[#000F4D] italic font-black rounded-md hover:bg-[var(--color-gold-hover)] transition-colors shadow-[0_0_15px_rgba(251,239,11,0.2)]"
          >
            CONTACT US
          </Link>
        </nav>

        <button
          className="md:hidden text-white hover:text-[var(--color-gold)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-b border-[var(--color-gold)]/20 bg-[#001A88]/95 backdrop-blur"
          >
            <nav className="flex flex-col gap-4 p-4 text-center font-bold uppercase tracking-wider text-gray-200">
              <Link
                onClick={() => setIsOpen(false)}
                href="/"
                className="px-4 py-2 hover:bg-white/5 rounded-lg active:text-[var(--color-gold)] transition-colors"
              >
                Home
              </Link>
              <a
                onClick={() => setIsOpen(false)}
                href="/#services"
                className="px-4 py-2 hover:bg-white/5 rounded-lg active:text-[var(--color-gold)] transition-colors"
              >
                Services
              </a>
              <a
                onClick={() => setIsOpen(false)}
                href="/#products"
                className="px-4 py-2 hover:bg-white/5 rounded-lg active:text-[var(--color-gold)] transition-colors"
              >
                Accounts
              </a>
              <Link
                onClick={() => setIsOpen(false)}
                href="/admin"
                className="px-4 py-2 hover:bg-white/5 rounded-lg active:text-[var(--color-gold)] transition-colors"
              >
                Admin Dashboard
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                href="https://wa.me/2347062826313"
                target="_blank"
                className="mt-2 mx-auto max-w-xs block w-full px-4 py-3 bg-[var(--color-gold)] text-[#000F4D] italic font-black rounded-md"
              >
                WHATSAPP US
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
