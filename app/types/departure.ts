export interface Departure {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  ticketTypes: {
    type: string;
    price: number;
  }[];
  vessel: string;
  availableTickets: number;
  requiresCabin: boolean;
}
