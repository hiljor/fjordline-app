"use client"; // Viktig: State krever Client Component

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-brand">
          <span>🚢</span>
          <span>Fjord Line</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-md font-medium">
          <Link href="/mine-reiser" className="hover:text-brand transition-colors">
            Mine bestillinger
          </Link>
        </nav>

        {/* Høyre side: Knapp + Mobil-meny-trigger */}
        <div className="flex items-center gap-2">
          <button className="hidden sm:block rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-all">
            Logg inn
          </button>

          {/* Mobil-meny knapp (kun synlig på små skjermer) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden text-brand focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <span className="text-2xl">✕</span> // Lukk-ikon
            ) : (
              <span className="text-2xl">☰</span> // Meny-ikon
            )}
          </button>
        </div>
      </div>

      {/* Dropdown-meny for mobil */}
      {isOpen && (
        <div className="md:hidden border-t bg-white p-4 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <Link 
            href="/mine-reiser" 
            onClick={() => setIsOpen(false)}
            className="block text-lg font-medium text-slate-700 hover:text-brand"
          >
            - Mine bestillinger
          </Link>
          <button className="w-full rounded-lg bg-brand py-3 text-white font-semibold">
            Logg inn
          </button>
        </div>
      )}
    </header>
  );
}