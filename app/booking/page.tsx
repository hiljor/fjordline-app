import { getFilteredDepartures } from '../lib/db';
import SearchForm from '../components/SearchForm';
import BookingWizard from '../components/booking/BookingWizard';

export default async function DeparturesPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ from: string; to: string; date: string; returnDate?: string }> 
}) {
  const params = await searchParams;
  
  // 1. Fetch data on the server for speed and SEO
  const { departures, returns } = await getFilteredDepartures(params);

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Keep the collapsible search for quick changes */}
        <SearchForm collapsible={true} />

        {/* Pass the data to the Client Component "Wizard" 
          which will handle React Hook Form state 
        */}
        <BookingWizard 
          outboundItems={departures} 
          returnItems={returns} 
        />
      </div>
    </main>
  );
}