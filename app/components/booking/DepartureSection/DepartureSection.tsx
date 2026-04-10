
import { useFormContext } from "react-hook-form";
import { Departure } from "@/app/types/departure";
import TicketCarousel from "./TicketCarousel";
import ScheduleBar from "./ScheduleBar";
import JourneyHeader from "./JourneyHeader";

export default function DepartureSection({ outboundItems = [], returnItems = [], outboundDate, returnDate }: any) {
  
  const { register, watch, setValue } = useFormContext();
  return (
    <div className="space-y-12 pb-10">
      {/* OUTBOUND */}
      <div className="space-y-6">
        <JourneyHeader title="Utreise" date={outboundDate} step={1} />
        
        {outboundItems.length > 0 ? (
          outboundItems.map((dep: Departure) => (
            <div key={dep.id} className="space-y-4 bg-slate-50/50 p-4 md:p-6 rounded-[2.5rem] border border-slate-100">
              <ScheduleBar departure={dep} />
              <TicketCarousel 
                tickets={dep.ticketTypes}
                departureId={dep.id}
                fieldName="outboundTicket"
                register={register}
                setValue={setValue}
                watch={watch}
              />
            </div>
          ))
        ) : (
          <div className="p-10 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
            <p className="text-slate-500 font-bold">Ingen avganger funnet for denne datoen.</p>
          </div>
        )}
      </div>

      {/* RETURN */}
      {/* We only show this section if a return date was actually picked in the search */}
      {returnDate && (
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <JourneyHeader title="Hjemreise" date={returnDate} step={2} />
          
          {returnItems.length > 0 ? (
            returnItems.map((dep: Departure) => (
              <div key={dep.id} className="space-y-4 bg-slate-50/50 p-4 md:p-6 rounded-[2.5rem] border border-slate-100">
                <ScheduleBar departure={dep} />
                <TicketCarousel 
                  tickets={dep.ticketTypes}
                  departureId={dep.id}
                  fieldName="returnTicket"
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
              </div>
            ))
          ) : (
            <div className="p-10 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <p className="text-slate-500 font-bold">Ingen returreiser funnet for denne datoen.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}