import { getFilteredDepartures } from "../lib/db";
import SearchForm from "../components/SearchForm";
import BookingWizard from "../components/booking/BookingWizard";

export default async function DeparturesPage({
  searchParams,
}: {
  searchParams: Promise<{
    from: string;
    to: string;
    date: string;
    returnDate?: string;
  }>;
}) {
  const params = await searchParams;

  // 1. Fetch data on the server
  const { departures, returns } = await getFilteredDepartures(params);

  let hasError = true;
  let errorText = "";
  if (departures.length === 0) {
    errorText = "Vi har dessverre ingen avganger for den valgte datoen.";
  } else if (params.returnDate && returns.length === 0) {
    errorText = "Vi har dessverre ingen returer for den valgte returdatoen.";
  } else if (departures.length === 0 && params.returnDate && returns.length === 0) {
    errorText = "Vi har dessverre ingen avganger eller returer for de valgte datoene.";
  } else {
    hasError = false;
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Keep the collapsible search for quick changes */}
        <SearchForm collapsible={true} />

        {/* If there is no data, we could show an error or empty state here */}
        { hasError ? (
          <div className="bg-red-100 text-brand p-4 rounded mb-6">
            <p>{errorText}</p>
          </div>
        )
        : (
        <BookingWizard
          outboundItems={departures}
          returnItems={returns}
          outboundDate={params.date}
          returnDate={params.returnDate}
          isRoundTripRequested={!!params.returnDate}
        />
        )}
      </div>
    </main>
  );
}
