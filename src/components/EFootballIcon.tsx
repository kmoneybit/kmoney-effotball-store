import React from 'react';

export const EFootballIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Polygon crest background */}
    <path d="M50 5 L90 25 V75 L50 95 L10 75 V25 Z" fill="var(--color-gold)" fillOpacity="0.15" stroke="var(--color-gold)" strokeWidth="4" strokeLinejoin="round"/>
    
    {/* Letter K */}
    <path d="M35 30 V70" stroke="white" strokeWidth="12" strokeLinecap="round"/>
    <path d="M65 30 L35 50 L65 70" stroke="var(--color-gold)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
