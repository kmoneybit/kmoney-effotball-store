import Link from "next/link";
import { CheckCircle, ShieldCheck, Zap } from "lucide-react";
import React from "react";

export interface ProductProps {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  imageUrl?: string;
}

export default function ProductCard({
  title,
  description,
  highlights,
  imageUrl,
}: ProductProps) {
  const whatsappNumber = "2347062826313";
  const whatsappMessage = encodeURIComponent(
    `Hi KMoney Store, I am interested in buying the ${title} account. Is it still available?`,
  );

  return (
    <div className="group relative rounded-2xl border border-[var(--color-gold)]/20 bg-[#001A88] flex flex-col overflow-hidden transition-all duration-300 hover:border-[var(--color-gold)]/50 hover:shadow-[0_0_20px_rgba(251,239,11,0.25)] hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative h-48 w-full bg-[#0022AA] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#001A88] via-[#0022AA] to-[#000A33]" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-[var(--color-gold)]/80">
          <Zap className="w-16 h-16 opacity-70" />
          <span className="text-sm uppercase tracking-[0.3em]">
            Premium Account
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
          <span className="text-xs font-medium text-white/90">Verified</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient-gold transition-all">
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>

        <ul className="space-y-2 mb-6 flex-1">
          {highlights.map((highlight, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm text-gray-300"
            >
              <CheckCircle className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 mt-auto">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 bg-[var(--color-gold)] hover:bg-[var(--color-gold-hover)] text-[#000F4D] italic font-black text-lg uppercase tracking-wider rounded-xl flex items-center justify-center transition-all shadow-[0_0_15px_rgba(251,239,11,0.2)] hover:shadow-[0_0_25px_rgba(251,239,11,0.4)]"
          >
            Buy via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
