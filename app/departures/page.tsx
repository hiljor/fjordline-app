import type { Departure } from '../types/departure';
import { getFilteredDepartures } from '../lib/db';

export default async function DeparturesPage({
  searchParams,
}: {
  searchParams: Promise<{ from: string; to: string; date: string; returnDate?: string }>;
}) {
  const params = await searchParams;
  const departuresData = await getFilteredDepartures(params);
}