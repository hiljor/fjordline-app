import type { Departure } from '../types/departure';
import { getFilteredDepartures } from '../lib/db';

import Link from 'next/link';

export default async function DeparturesPage({
  searchParams,
}: {
  searchParams: Promise<{ from: string; to: string; date: string; returnDate?: string }>;
}) {
  const params = await searchParams;
  const results = await getFilteredDepartures(params);
  const departures = results.departures;
  const returns = results.returns;
  const from = params.from;
  const to = params.to;
  const date = params.date;
  const returnDate = params.returnDate;

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Søke-info Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              {from} <span className="text-brand">→</span> {to}
            </h1>
            <p className="text-slate-500 font-medium">{date}</p>
          </div>
          <Link 
            href="/" 
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-full font-bold transition-all text-sm"
          >
            Endre søk
          </Link>
        </div>

        {/* UTREISE SEKSJON */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-brand rounded-full" />
            Velg utreise
          </h2>
          
          {departures.length > 0 ? (
            <div className="grid gap-4">
              {departures.map((dep) => (
                <DepartureCard key={dep.id} departure={dep} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
              Ingen tilgjengelige avganger funnet for denne datoen.
            </div>
          )}

          {/* RETUR SEKSJON (Vises kun hvis returnDate finnes i URL) */}
          {returnDate && (
            <div className="mt-12 space-y-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-emerald-500 rounded-full" />
                Velg hjemreise ({to} → {from})
              </h2>
              {returns.length > 0 ? (
                <div className="grid gap-4">
                  {returns.map((dep) => (
                    <DepartureCard key={dep.id} departure={dep} accentColor="emerald" />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
                  Ingen returreiser funnet for {returnDate}.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// --- Underkomponent for selve reise-kortet ---
function DepartureCard({ 
  departure, 
  accentColor = "brand" 
}: { 
  departure: Departure, 
  accentColor?: "brand" | "emerald" 
}) {
  // Finn den laveste prisen blant billettypene
  const lowestPrice = Math.min(...departure.ticketTypes.map(t => t.price));
  
  // Formater tid (HH:mm)
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("no-NO", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 p-5 md:p-7 flex flex-col md:flex-row gap-6 items-center hover:border-brand/50 transition-all hover:shadow-md">
      
      {/* Tid og Skip */}
      <div className="flex flex-col items-center md:items-start min-w-[120px]">
        <span className="text-3xl font-black text-slate-900 tracking-tighter">
          {formatTime(departure.departureTime)}-{formatTime(departure.arrivalTime)}
        </span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
          {departure.vessel}
        </span>
      </div>

      {/* Rute-illustrasjon */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="flex items-center gap-3 w-full max-w-[200px]">
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="flex-1 h-[2px] bg-slate-100 relative">
             <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl opacity-20">🚢</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-slate-300" />
        </div>
        <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase">
          Ankomst {formatTime(departure.arrivalTime)}
        </div>
      </div>

      {/* Pris og Info */}
      <div className="flex flex-col items-end gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
        <div className="flex items-center gap-2">
          {departure.requiresCabin && (
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase">
              🛏️ Lugar inkl.
            </span>
          )}
        </div>
        
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Fra</p>
          <p className={`text-3xl font-black text-${accentColor === 'brand' ? 'brand' : 'emerald-600'}`}>
            {lowestPrice},-
          </p>
        </div>

        <button className={`w-full md:w-auto bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-brand/10`}>
          Velg reise
        </button>
      </div>
    </div>
  );
}