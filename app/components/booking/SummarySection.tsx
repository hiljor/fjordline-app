import { ArrowRight, Car } from "lucide-react";

export default function SummarySection({ watch, outboundItems, returnItems }: any) {
  const values = watch();

  // Helper to find the specific departure data from the ID
  const getDeparture = (id: string, items: any[]) => items.find(d => d.id === id);

  const outbound = getDeparture(values.outboundDepartureId, outboundItems);
  const returnLeg = getDeparture(values.returnDepartureId, returnItems);

  // Simple Price Calculation
  const outboundPrice = outbound?.ticketTypes.find((t: any) => t.type === values.outboundTicket)?.price || 0;
  const returnPrice = returnLeg?.ticketTypes.find((t: any) => t.type === values.returnTicket)?.price || 0;
  const totalPrice = outboundPrice + returnPrice;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: ITINERARY DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Din Reise</h2>
          
          {/* Outbound Summary */}
          {outbound && (
            <SummaryCard 
              title="Utreise"
              departure={outbound}
              ticketType={values.outboundTicket}
              price={outboundPrice}
              date={values.outboundDate}
            />
          )}

          {/* Return Summary */}
          {returnLeg && (
            <SummaryCard 
              title="Hjemreise"
              departure={returnLeg}
              ticketType={values.returnTicket}
              price={returnPrice}
              date={values.returnDate}
            />
          )}
          
          {/* Vehicle Info (Placeholder for next step) */}
          {values.hasVehicle && (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                <Car size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Kjøretøy registrert</p>
                <p className="text-lg font-black text-slate-900 uppercase">{values.vehiclePlate}</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: PRICE BREAKDOWN */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] sticky top-8 shadow-2xl shadow-slate-200">
            <h3 className="text-xl font-black mb-6">Prisoversikt</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400 text-sm font-bold">
                <span>Utreise ({values.outboundTicket})</span>
                <span className="text-white">{outboundPrice},-</span>
              </div>
              {returnLeg && (
                <div className="flex justify-between text-slate-400 text-sm font-bold">
                  <span>Hjemreise ({values.returnTicket})</span>
                  <span className="text-white">{returnPrice},-</span>
                </div>
              )}
              <div className="h-px bg-slate-800 my-4" />
              <div className="flex justify-between items-end">
                <span className="text-slate-400 font-bold">Totalpris</span>
                <span className="text-4xl font-black text-brand-light">{totalPrice},-</span>
              </div>
            </div>

            <button className="w-full bg-brand text-white py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all shadow-lg shadow-brand/20">
              Bekreft og betal
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-4 font-bold uppercase tracking-widest">
              Sikker betaling med BankID
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, departure, ticketType, price, date }: any) {
  return (
    <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row gap-6 items-center">
      <label className="sr-only">{title} Detaljer</label>
      <div className="flex-1 w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
            {title}
          </div>
          <span className="text-sm font-bold text-slate-400">{departure.vessel}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-black text-slate-900">
              {new Date(departure.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avgang</p>
          </div>
          
          <div className="flex flex-col items-center px-4">
            <ArrowRight className="text-slate-200" size={20} />
          </div>

          <div className="text-right">
            <p className="text-3xl font-black text-slate-900">
              {new Date(departure.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ankomst</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-px md:h-16 bg-slate-100" />

      <div className="w-full md:w-auto text-center md:text-right">
        <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-1">{ticketType}</p>
        <p className="text-2xl font-black text-slate-900">{price},-</p>
      </div>
    </div>
  );
}