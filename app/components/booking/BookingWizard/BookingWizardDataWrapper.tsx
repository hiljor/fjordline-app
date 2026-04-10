import { fetchFilteredDepartures } from "@/app/lib/db";
import { ResolvedSearchParams } from "@/app/types/searchParams";
import BookingWizard from "./BookingWizard";

/**
 * Data wrapper which fetches data for and displays the BookingWizard component.
 * @param params search parameters from the booking form
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
      returnDate={searchParams.returnDate ? searchParams.returnDate : ""}
      isRoundTripRequested={!!searchParams.returnDate}
    />
  );
}
