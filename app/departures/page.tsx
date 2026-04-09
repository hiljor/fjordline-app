import type { Departure } from '../types/departure';
import { getFilteredDepartures } from '../lib/db';
import SearchForm from '../components/SearchForm';
import { Moon } from 'lucide-react';
import { Suspense } from 'react';

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
        <SearchForm  collapsible={true} />

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

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 p-5 md:p-7 flex flex-col md:flex-row gap-6 items-center hover:border-brand/50 transition-all hover:shadow-md">
      
      {/* Tid og Skip */}
      <JourneyInfo departure={departure} />

      {/* Rute-illustrasjon? */}

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

function JourneyInfo({departure}: { departure: Departure }) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const departureTime = formatTime(departure.departureTime);
  const arrivalTime = formatTime(departure.arrivalTime);
  const vessel = departure.vessel;
  const overnight = departure.requiresCabin;

  return (
  <div className="flex flex-col items-center md:items-start min-w-[120px]">
        <span className="text-xl font-black text-slate-900 tracking-tighter">
          {departureTime} – {arrivalTime} {overnight && < Moon size={20} className="inline-block text-brand" />}
        </span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
          {departure.vessel}
        </span>
      </div>
  );
}