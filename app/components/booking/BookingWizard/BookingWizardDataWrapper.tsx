import { fetchFilteredDepartures } from "@/app/lib/db";
import { ResolvedSearchParams } from "@/app/types/searchParams";
import { Suspense } from "react";
import BookingWizardSkeleton from "./BookingWizardSkeleton";
import BookingWizard from "./BookingWizard";

/**
 * Data wrapper which fetches data for and displays the BookingWizard component.
 * @param param0
 * @returns
 */
export default async function BookingWizardDataWrapper({
  searchParams,
}: {
  searchParams: ResolvedSearchParams;
}) {
  const { departures, returns } = await fetchFilteredDepartures(searchParams);

  return (
    <BookingWizard
      outboundItems={departures}
      returnItems={returns}
      outboundDate={searchParams.date}
      returnDate={searchParams.returnDate}
      isRoundTripRequested={!!searchParams.returnDate}
    />
  );
}
