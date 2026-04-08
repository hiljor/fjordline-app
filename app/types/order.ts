export interface Order {
  id: string;
  departureId: string;
  customerName: string;
  customerEmail: string;
  ticketType: string;
  quantity: number;
  totalPrice: number;
  orderDate: string;
}