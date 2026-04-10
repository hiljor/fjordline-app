import { Suspense } from "react";
import SearchForm from "../components/SearchForm";
import BookingWizardDataWrapper from "../components/booking/BookingWizard/BookingWizardDataWrapper";
import BookingWizardSkeleton from "../components/booking/BookingWizard/BookingWizardSkeleton";
import { redirect } from "next/navigation";

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

  const hasRequiredParams = params.from && params.to && params.date;

  if (!hasRequiredParams) {
    redirect("/");
  }

  return (
    <main className="relative z-0 min-h-screen bg-slate-50 pt-24 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-brand text-center">
          Din reise
        </h1>
        {/* Collapsible search for form editing */}
        <SearchForm collapsible={true} />
        {/* Booking Wizard that fetches data on the server and renders the client component */}
        <Suspense
          key={JSON.stringify(params)}
          fallback={<BookingWizardSkeleton />}
        >
          <BookingWizardDataWrapper searchParams={params} />
        </Suspense>
      </div>
    </main>
  );
}
