import { Departure } from "../types/departure";
import { ResolvedSearchParams as BookingSearchParams } from "../types/searchParams";

export async function fetchDepartures(): Promise<Departure[]> {
  const response = await import("../data/departures.json");
    // simulate server latency
  await new Promise(resolve => setTimeout(resolve, 3000));
  return response.departures as Departure[];
}

/**
 * Fetches departures filtered by the search params given as input.
 * @param filters 
 * @returns relevant departures and returns. If no return is requested, returns in empty.
 */
export async function fetchFilteredDepartures(filters: BookingSearchParams): Promise<{ departures: Departure[]; returns: Departure[] }> {
  const allDepartures = await fetchDepartures();
  const from = filters.from?.toLowerCase();
  const to = filters.to?.toLowerCase();
  const date = filters.date;
  const returnDate = filters.returnDate;

  // Filter departures
  const filteredDepartures = allDepartures.filter((departure: any) => {
    const matchesFrom = from ? departure.from.toLowerCase() === from : true;
    const matchesTo = to ? departure.to.toLowerCase() === to : true;
    const matchesDate = departure.departureTime.startsWith(date ?? "");
    
    return matchesFrom && matchesTo && matchesDate;
  });

  // Filter returns if returnDate is provided
  let filteredReturns: Departure[] = [];
  if (returnDate && from && to) {
    filteredReturns = allDepartures.filter((departure: any) => {
      const matchesFrom = departure.from.toLowerCase() === to; // reversed
      const matchesTo = departure.to.toLowerCase() === from;
      const matchesDate = departure.departureTime.startsWith(returnDate);
      
      return matchesFrom && matchesTo && matchesDate;
    });
  }

  return { departures: filteredDepartures, returns: filteredReturns };
}