export interface Departure {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  vessel: string;
  availableSeats: number;
  category: string;
  requiresCabin?: boolean;
}