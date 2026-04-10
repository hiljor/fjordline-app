export interface Departure {
  /** The id of the departure */
  id: string;
  /** Where the departure is going from */
  from: string;
  /** Where the departure is going to */
  to: string;
  /** The time of departure */
  departureTime: string;
  /** The time of arrival */
  arrivalTime: string;
  /** Ticket types available for this departure */
  ticketTypes: TicketType[];
  /** Which vessel is servicing this departure */
  vessel: string;
  /** How many tickets are available */
  availableTickets: number;
  /** Whether the departure requires a cabin booking */
  requiresCabin: boolean;
}

export interface TicketType {
  /** Type of ticket */
  type: "club" | "standard" | "flex";
  /** Price of ticket */
  price: number;
}