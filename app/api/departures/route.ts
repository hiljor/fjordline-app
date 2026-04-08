import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Departure } from "../../types/departure";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  
  const from = searchParams.get("from")?.toLowerCase();
  const to = searchParams.get("to")?.toLowerCase();
  const date = searchParams.get("date");
  const returnDate = searchParams.get("returnDate");

  // get data from JSON
  const data = await import("../../data/departures.json");
  const allDepartures: Departure[] = data.departures;

  // Filter departures
  const filteredDepartures = allDepartures.filter((departure: any) => {
    const matchesFrom = departure.from.toLowerCase() === from;
    const matchesTo = departure.to.toLowerCase() === to;
    const matchesDate = departure.departureTime.startsWith(date ?? "");
    
    return matchesFrom && matchesTo && matchesDate;
  });

  // Filtrer returns if returnDate is provided
  let filteredReturns: Departure[] = [];
  if (returnDate) {
    filteredReturns = allDepartures.filter((departure: any) => {
      const matchesFrom = departure.from.toLowerCase() === to; // reversed
      const matchesTo = departure.to.toLowerCase() === from;
      const matchesDate = departure.departureTime.startsWith(returnDate);
      
      return matchesFrom && matchesTo && matchesDate;
    });
  }

  return NextResponse.json({
    departures: filteredDepartures,
    returns: filteredReturns,
  });
}