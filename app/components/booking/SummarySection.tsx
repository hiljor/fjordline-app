import { formatTime } from "@/app/lib/utils";
import { Ship, Clock } from "lucide-react";

/**
 * Props for the SummarySection component
 */
type SummarySectionProps = {
  /** Watch function from react-hook-form to get form values */
  watch: () => any;
  /** Array of outbound departure items with ticket types */
  outboundItems: any[];
  /** Array of return departure items with ticket types */
  returnItems: any[];
};

/**
 * SummarySection - Displays a booking summary with outbound/return trips and total price
 * Shows selected routes, times, ticket types, and calculates the total amount.
 */
export default function SummarySection({
  watch,
  outboundItems,
  returnItems,
}: SummarySectionProps) {
  const values = watch();

  // 1. Helper to extract data from the combined string "depId|ticketType"
  const getSelectedData = (combinedValue: string, items: any[]) => {
    if (!combinedValue || typeof combinedValue !== "string") return null;

    const [depId, ticketType] = combinedValue.split("|");
    const departure = items.find((d) => d.id === depId);
    const ticket = departure?.ticketTypes.find(
      (t: any) => t.type === ticketType,
    );

    return { departure, ticket, ticketType };
  };

  const outboundData = getSelectedData(values.outboundTicket, outboundItems);
  const returnData = getSelectedData(values.returnTicket, returnItems);

  // 2. Calculate totals
  const outboundPrice = outboundData?.ticket?.price || 0;
  const returnPrice = returnData?.ticket?.price || 0;
  const totalPrice = outboundPrice + returnPrice;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">
        Sammendrag
      </h2>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        {/* Spreadsheet Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 bg-slate-50/80 px-8 py-4 border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <div className="col-span-5">Reisevei</div>
          <div className="col-span-3">Tidspunkt</div>
          <div className="col-span-2">Billettype</div>
          <div className="col-span-2 text-right">Pris</div>
        </div>

        <div className="divide-y divide-slate-100">
          {/* Outbound Row */}
          {outboundData && (
            <SummaryRow
              label="Utreise"
              from={outboundData.departure.from}
              to={outboundData.departure.to}
              time={`${formatTime(outboundData.departure.departureTime)} - ${formatTime(outboundData.departure.arrivalTime)}`}
              ticketType={outboundData.ticketType}
              price={outboundPrice}
            />
          )}

          {/* Return Row */}
          {returnData && (
            <SummaryRow
              label="Hjemreise"
              from={returnData.departure.from}
              to={returnData.departure.to}
              time={`${formatTime(returnData.departure.departureTime)} - ${formatTime(returnData.departure.arrivalTime)}`}
              ticketType={returnData.ticketType}
              price={returnPrice}
            />
          )}
        </div>

        {/* Grand Total Footer */}
        <div className="bg-slate-900 text-white px-6 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Totalbeløp
          </p>

          <div className="flex items-center gap-4">
            <div className="text-xl md:text-2xl font-black italic tracking-tighter text-white">
              {totalPrice},-
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function SummaryRow({ label, from, to, time, ticketType, price }: any) {
  const fromCity = from.charAt(0).toUpperCase() + from.slice(1);
  const toCity = to.charAt(0).toUpperCase() + to.slice(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-4 px-6 md:px-8 py-6 items-center hover:bg-slate-50/50 transition-colors">
      {/* 1. Route Info: Always at the top */}
      <div className="col-span-1 md:col-span-5 flex items-center gap-4">
        <div className="bg-brand/10 p-3 md:p-2 rounded-2xl md:rounded-xl text-brand shrink-0">
          <Ship className={"size-6 md:size-8"} />
        </div>
        <div>
          <p className="text-[10px] font-black text-brand uppercase tracking-widest">
            {label}
          </p>
          <p className="font-bold text-slate-900 text-lg md:text-base leading-tight">
            {fromCity} <span className="text-slate-300 mx-1">→</span> {toCity}
          </p>
        </div>
      </div>

      {/* 2. Middle Section: Stacked on mobile, side-by-side on desktop */}
      <div className="col-span-1 md:col-span-5 grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Time Column */}
        <div className="md:col-span-3">
          <span className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
            Tidspunkt
          </span>
          <div className="flex items-center gap-2 font-bold text-slate-700 text-lg md:text-base">
            <Clock size={14} className="text-slate-400 shrink-0" />
            {time}
          </div>
        </div>

        {/* Ticket Type Column */}
        <div className="md:col-span-2 md:text-left text-right">
          <span className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
            Billett
          </span>
          <span className="inline-flex px-2 py-1 md:py-0.5 rounded-lg text-[10px] font-black uppercase bg-slate-100 text-slate-600 border border-slate-200">
            {ticketType}
          </span>
        </div>
      </div>

      {/* 3. Price: Right-aligned on desktop, bottom-border separated on mobile */}
      <div className="col-span-1 md:col-span-2 text-right pt-4 md:pt-0 border-t border-slate-100 md:border-none">
        <span className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest float-left mt-2">
          Delsum
        </span>
        <p className="text-2xl md:text-xl font-black text-slate-900">
          {price},-
        </p>
      </div>
    </div>
  );
}
