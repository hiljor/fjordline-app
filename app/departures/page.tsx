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

  return <DepartureList items={items} accentColor={type === 'return' ? 'emerald' : 'brand'} />;
}

export default async function DeparturesPage({
  searchParams,
}: {
  searchParams: Promise<{ from: string; to: string; date: string; returnDate?: string }>;
}) {
  const params = await searchParams;
  const { from, to, returnDate } = params;

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <SearchForm collapsible={true} />

        {/* UTREISE SEKSJON */}
        <div className="space-y-6">
          {/* Static Header: Always visible */}
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-brand rounded-full" />
            Velg utreise
          </h2>
          
          <Suspense fallback={<DepartureListSkeleton />}>
            <DepartureResults params={params} type="outbound" />
          </Suspense>
        </div>

        {/* RETUR SEKSJON */}
        {returnDate && (
          <div className="mt-12 space-y-6">
            {/* Static Header: Always visible */}
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded-full" />
              Velg hjemreise ({to} → {from})
            </h2>
            
            <Suspense fallback={<DepartureListSkeleton />}>
              <DepartureResults params={params} type="return" />
            </Suspense>
          </div>
        )}
      </div>
    </main>
  );
}