export interface Order {
  id: string;
  departureId: string;
  customerName: string;
  customerEmail: string;
  tickets: {
    type: string; // club, standard, flex etc
    price: number; // price of ticket at time of order
  }[];
  amount: number;
  orderDate: string;
}
