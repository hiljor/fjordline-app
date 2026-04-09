"use client";

import { useFormContext } from "react-hook-form";
import { Departure } from "@/app/types/departure";
import { Check, Ship, Moon, ArrowRight, Info } from "lucide-react";
import { motion } from "motion/react"; // Assuming you have motion/react installed

export default function DepartureSection({ outboundItems, returnItems }: any) {
  const { register, watch, setValue } = useFormContext();
  const formatTime = (dateStr: string) => 
    new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-12 pb-10">
      {/* OUTBOUND */}
      <div className="space-y-6">
        <JourneyHeader title="Utreise" step={1} />
        {outboundItems.map((dep: Departure) => (
          <div key={dep.id} className="space-y-4">
            <ScheduleBar departure={dep} formatTime={formatTime} />
            
            {/* Horizontal Scroll Wrapper */}
            <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:snap-none">
              {dep.ticketTypes.map((ticket) => (
                <div key={ticket.type} className="min-w-[85%] md:min-w-0 snap-center">
                  <TicketCard 
                    ticket={ticket}
                    departureId={dep.id}
                    fieldName="outboundCabin"
                    register={register}
                    setValue={setValue}
                    isSelected={watch("outboundCabin") === ticket.type}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* RETURN */}
      {returnItems && returnItems.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <JourneyHeader title="Hjemreise" step={2} />
          {returnItems.map((dep: Departure) => (
            <div key={dep.id} className="space-y-4">
              <ScheduleBar departure={dep} formatTime={formatTime} />
              <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:snap-none">
                {dep.ticketTypes.map((ticket) => (
                  <div key={ticket.type} className="min-w-[85%] md:min-w-0 snap-center">
                    <TicketCard 
                      ticket={ticket}
                      departureId={dep.id}
                      fieldName="returnCabin"
                      register={register}
                      setValue={setValue}
                      isSelected={watch("returnCabin") === ticket.type}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TicketCard({ ticket, departureId, fieldName, register, isSelected, setValue }: any) {
  const handleClick = () => {
    setValue(fieldName, ticket.type, { shouldValidate: true });
    const idField = fieldName.includes("outbound") ? "outboundDepartureId" : "returnDepartureId";
    setValue(idField, departureId, { shouldValidate: true });
  };

  const isFlex = ticket.type.toLowerCase().includes("flex");

  return (
    <motion.div 
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
      animate={{ 
        borderColor: isSelected ? "#0066FF" : "#f1f5f9", // Replace #0066FF with your brand color
        backgroundColor: isSelected ? "#ffffff" : "#ffffff",
        y: isSelected ? -4 : 0
      }}
      className={`
        relative h-full flex flex-col p-4 rounded-[1.5rem] cursor-pointer border-2 transition-shadow
        ${isSelected ? 'shadow-lg ring-4 ring-brand/5' : 'shadow-sm'}
      `}
    >
      <input type="radio" {...register(fieldName)} value={ticket.type} className="sr-only" />
      
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-black text-sm text-slate-500 uppercase tracking-wider">{ticket.type}</h3>
          <div className="text-xl font-black text-slate-900">{ticket.price},-</div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected ? 'bg-brand border-brand text-white' : 'border-slate-200 text-transparent'
        }`}>
          <Check size={14} strokeWidth={4} />
        </div>
      </div>

      <div className="space-y-1 pt-3 border-t border-slate-50">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
          <Check size={12} className="text-emerald-500" /> 
          <span>Standard sete</span>
        </div>
        <div className={`flex items-center gap-2 text-[11px] font-bold ${isFlex ? 'text-slate-600' : 'text-slate-300'}`}>
          {isFlex ? <Check size={12} className="text-emerald-500" /> : <Info size={12} />}
          <span>{isFlex ? "Full fleks" : "Ingen ref."}</span>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Clean Journey Header (Replaces the dark header)
 */
function JourneyHeader({ title, step }: { title: string; step: number }) {
  return (
    <header className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-black text-lg">
        {step}
      </div>
      <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
    </header>
  );
}

/**
 * The info bar showing Time, Vessel and Arrival
 */
/**
 * The info bar showing Time, Vessel and Arrival
 * Updated with clearer journey flow and overnight detection
 */
function ScheduleBar({ departure, formatTime }: any) {
  // Logic to detect if a journey is overnight
  // (Either if arrival is earlier in the clock than departure, or explicit flag)
  const isOvernight = new Date(departure.arrivalTime) < new Date(departure.departureTime);

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-[2rem] flex flex-wrap justify-between items-center gap-6 shadow-sm">
      <div className="flex items-center gap-10">
        
        {/* The Timeline Flow */}
        <div className="flex items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avgang</p>
            <p className="text-2xl font-black text-slate-900">{formatTime(departure.departureTime)}</p>
          </div>
          
          {/* Enhanced Visual Arrow / Path */}
          <div className="flex flex-col items-center gap-1 min-w-[60px]">
            {isOvernight && (
               <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-500 uppercase tracking-tighter animate-pulse">
                 <Moon size={12} fill="currentColor" /> 
                 <span>Natt</span>
               </div>
            )}
            <div className="h-[2px] w-full bg-slate-100 relative">
              <div className="absolute right-0 -top-[4px] w-2 h-2 border-t-2 border-r-2 border-slate-300 rotate-45" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ankomst</p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-black text-slate-900">{formatTime(departure.arrivalTime)}</p>
              {isOvernight && (
                <span className="text-xs font-bold text-indigo-500">+1</span>
              )}
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block h-10 w-px bg-slate-100" />

        {/* Vessel Info */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 p-2 rounded-xl text-brand">
            <Ship size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Fartøy</p>
            <p className="font-black text-slate-700 leading-none">{departure.vessel}</p>
          </div>
        </div>
      </div>
    
    </div>
  );
}