import Link from "next/link";
import { EFootballIcon } from "./EFootballIcon";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-gold)]/10 bg-[#000A33] py-12 mt-auto">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <EFootballIcon className="w-6 h-6" />
            <span className="font-black text-xl tracking-tighter uppercase italic text-white drop-shadow-md">
              KMoney <span className="text-[var(--color-gold)]">Store</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
            Your premium destination for elite eFootball accounts. Dominate the
            pitch with top-tier squads instantly.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:mx-auto">
          <h3 className="font-semibold text-lg text-white mb-2">Quick Links</h3>
          <a
            href="/#services"
            className="text-gray-400 hover:text-[var(--color-gold)] text-sm transition-colors"
          >
            Our Services
          </a>
          <a
            href="/#products"
            className="text-gray-400 hover:text-[var(--color-gold)] text-sm transition-colors"
          >
            Browse Accounts
          </a>
          <Link
            href="https://wa.me/2347062826313"
            className="text-gray-400 hover:text-[var(--color-gold)] text-sm transition-colors"
          >
            Contact Support
          </Link>
        </div>

        <div className="flex flex-col gap-3 md:ml-auto">
          <h3 className="font-semibold text-lg text-white mb-2">Connect</h3>
          <a
            href="https://wa.me/2347062826313"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-[#25D366] text-sm transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-12 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} eFootball Store. All rights reserved.
      </div>
    </footer>
  );
}
