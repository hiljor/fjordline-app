import { getFilteredDepartures } from '../lib/db';
import SearchForm from '../components/SearchForm';
import DepartureList from '../components/departures/DepartureList'; // Import the new wrapper
import { Suspense } from 'react';

export default async function DeparturesPage({
  searchParams,
}: {
  searchParams: Promise<{ from: string; to: string; date: string; returnDate?: string }>;
}) {
  const params = await searchParams;
  const { departures, returns } = await getFilteredDepartures(params);
  const { from, to, returnDate } = params;

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <SearchForm collapsible={true} />

        {/* UTREISE SEKSJON */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-brand rounded-full" />
            Velg utreise
          </h2>
          
          {departures.length > 0 ? (
            /* Use the new component here */
            <DepartureList items={departures} />
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
              Ingen tilgjengelige avganger funnet for denne datoen.
            </div>
          )}

          {/* RETUR SEKSJON */}
          {returnDate && (
            <div className="mt-12 space-y-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-brand rounded-full" />
                Velg hjemreise ({to} → {from})
              </h2>
              {returns.length > 0 ? (
                /* And here for returns */
                <DepartureList items={returns} accentColor="brand" />
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