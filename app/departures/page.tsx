import { getFilteredDepartures } from '../lib/db';
import SearchForm from '../components/SearchForm';
import DepartureList from '../components/departures/DepartureList';
import { DepartureListSkeleton } from '../components/departures/DepartureSkeleton';
import { Suspense } from 'react';

/**
 * Results component that fetches data.
 * We now only return the list itself, not the headers.
 */
async function DepartureResults({ params, type }: { params: any, type: 'outbound' | 'return' }) {
  const { departures, returns } = await getFilteredDepartures(params);
  
  const items = type === 'outbound' ? departures : returns;

  if (items.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
        Ingen tilgjengelige avganger funnet for denne reisen.
      </div>
    );
  }

  return <DepartureList items={items} accentColor={'brand'} type={type} />;
}

export default async function DeparturesPage({ searchParams }: { searchParams: Promise<{ from: string; to: string; date: string; returnDate?: string }> }) {
  const params = await searchParams;
  const { returnDate } = params;

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <SearchForm collapsible={true} />

        {/* The entire selection is one form */}
        <form action="/checkout" method="GET">
          <div className="space-y-12">
            <section className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-brand rounded-full" />
                1. Velg utreise
              </h2>
              <Suspense fallback={<DepartureListSkeleton />}>
                <DepartureResults params={params} type="outbound" />
              </Suspense>
            </section>

            {returnDate && (
              <section className="space-y-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-6 bg-brand rounded-full" />
                  2. Velg hjemreise
                </h2>
                <Suspense fallback={<DepartureListSkeleton />}>
                  <DepartureResults params={params} type="return" />
                </Suspense>
              </section>
            )}
          </div>

          {/* Sticky Footer with Submit */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="max-w-4xl mx-auto flex justify-end">
              <button 
                type="submit"
                className="bg-brand text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-brand-dark transition-all shadow-lg active:scale-95"
              >
                Gå videre til bestilling →
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}