import { Departure } from "../types/departure";

export async function fetchDepartures(): Promise<Departure[]> {
  const response = await import("../data/departures.json");
  return response.departures;
}

export async function getFilteredDepartures(filters: { from: string; to: string; date: string, returnDate?: string }): Promise<{ departures: Departure[]; returns: Departure[] }> {
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