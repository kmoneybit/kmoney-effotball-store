import Image from "next/image";
import { CheckCircle, ShieldCheck, Zap } from "lucide-react";
import React from "react";

export interface ProductProps {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  price: string;
  imageUrl: string;
}

export default function ProductCard({
  title,
  description,
  highlights,
  price,
  imageUrl,
}: ProductProps) {
  const whatsappNumber = "2347062826313";
  const whatsappMessage = encodeURIComponent(
    `Hi KMoney Store, I want to buy this account: ${title}. Price: ${price}. Please confirm availability. Image: ${imageUrl}`,
  );

  return (
    <div className="group relative rounded-2xl border border-[var(--color-gold)]/20 bg-gradient-to-br from-[#001A88] to-[#0d0d44] flex flex-col overflow-hidden transition-all duration-300 hover:border-[var(--color-gold)]/60 hover:shadow-[0_0_30px_rgba(251,239,11,0.35)] hover:-translate-y-2 animate-card-glow">
      <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative h-56 w-full bg-gradient-to-b from-[#0022AA] to-[#000A33] flex items-center justify-center overflow-hidden border-b border-white/5 group-hover:h-64 transition-all duration-300 shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-b from-[#001A88] via-[#0022AA] to-[#000A33]" />
        <div className="absolute inset-0 bg-[var(--color-gold)]/8 blur-[60px] rounded-full z-0 group-hover:bg-[var(--color-gold)]/15 transition-all duration-500" />
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="relative z-10 object-cover object-top drop-shadow-[0_0_20px_rgba(251,239,11,0.2)] group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-[var(--color-gold)]/80 animate-float">
            <Zap className="w-16 h-16 opacity-70 group-hover:animate-spin" />
            <span className="text-sm uppercase tracking-[0.3em] font-bold">
              Premium Account
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 flex items-center gap-1.5 z-20 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          <ShieldCheck className="w-4 h-4 text-[#25D366] animate-pulse" />
          <span className="text-xs font-bold text-white/95 uppercase">
            Verified
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-xl font-bold text-white group-hover:text-gradient-gold transition-all duration-300 transform group-hover:scale-105">
            {title}
          </h3>
          {price ? (
            <span className="rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {price}
            </span>
          ) : null}
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
          {description}
        </p>

        <ul className="space-y-2 mb-6 flex-1">
          {highlights.map((highlight, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm text-gray-300 transform transition-all duration-300 group-hover:translate-x-1 hover:text-white"
            >
              <CheckCircle className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5 group-hover:animate-pulse" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 mt-auto">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 bg-[var(--color-gold)] hover:bg-[var(--color-gold-hover)] text-[#000F4D] italic font-black text-lg uppercase tracking-wider rounded-xl flex items-center justify-center transition-all shadow-[0_0_15px_rgba(251,239,11,0.2)] hover:shadow-[0_0_30px_rgba(251,239,11,0.5)] transform hover:scale-105 active:scale-95"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
