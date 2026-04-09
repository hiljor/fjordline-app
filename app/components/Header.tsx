"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[110] w-full bg-white border-b border-slate-100 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Venstre side: Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-brand">
          <span>🚢</span>
          <span>fjordline</span>
        </Link>

        {/* Høyre side: Navigasjon og Knapper samlet */}
        <div className="flex items-center gap-6">
          
          {/* Desktop Navigation - flyttet hit */}
          <nav className="hidden md:flex items-center gap-6 text-md font-medium">
            <Link href="/mine-reiser" className="hover:text-brand transition-colors text-slate-700">
              Mine bestillinger
            </Link>
          </nav>

          {/* Action Buttons & Mobile Trigger */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:block rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-all">
              Logg inn
            </button>

            {/* Mobil-meny knapp */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:hidden text-brand focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
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
          <button className="w-full rounded-lg bg-brand py-3 text-white font-semibold sm:hidden">
            Logg inn
          </button>
        </div>
      )}
    </header>
  );
}