"use client";

import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Departure } from "@/app/types/departure";
import { Check, Ship, Moon, ArrowRight, Info, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { motion } from "motion/react";

export default function DepartureSection({ outboundItems, returnItems, outboundDate, returnDate }: any) {
  
  const { register, watch, setValue } = useFormContext();
  const formatTime = (dateStr: string) => 
    new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const selectedOutbound = watch("outboundCabin");
  const selectedReturn = watch("returnCabin");

  return (
    <div className="space-y-12 pb-10">
      {/* OUTBOUND */}
      <div className="space-y-6">
        <JourneyHeader title="Utreise" date={outboundDate} step={1} />
        {outboundItems.map((dep: Departure) => (
          <div key={dep.id} className="space-y-4 bg-red-100 p-6 rounded-[2.5rem]">
            <ScheduleBar departure={dep} formatTime={formatTime} />
            <TicketCarousel 
              tickets={dep.ticketTypes}
              departureId={dep.id}
              fieldName="outboundCabin"
              register={register}
              setValue={setValue}
              watch={watch}
            />
          </div>
        ))}
      </div>

      {/* RETURN */}
      {returnItems && returnItems.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <JourneyHeader title="Hjemreise" date={returnDate} step={2} />
          {returnItems.map((dep: Departure) => (
            <div key={dep.id} className="space-y-4 bg-red-100 p-6 rounded-[2.5rem]">
              <ScheduleBar departure={dep} formatTime={formatTime} />
              <TicketCarousel 
                tickets={dep.ticketTypes}
                departureId={dep.id}
                fieldName="returnCabin"
                register={register}
                setValue={setValue}
                watch={watch}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * New Carousel Component with Arrows
 */
function TicketCarousel({ tickets, departureId, fieldName, register, setValue, watch }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Determine if a ticket has been picked for this journey leg
  const selectedTicketType = watch(fieldName);
  const anySelected = !!selectedTicketType;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {/* Navigation Arrows */}
      <button 
        type="button"
        onClick={() => scroll('left')}
        className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl border border-slate-100 p-2 rounded-full text-slate-600 hover:text-brand transition-all md:hidden"
        aria-label="Forrige billett"
      >
        <ChevronLeft size={20} />
      </button>

      <button 
        type="button"
        onClick={() => scroll('right')}
        className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl border border-slate-100 p-2 rounded-full text-slate-600 hover:text-brand transition-all md:hidden"
        aria-label="Neste billett"
      >
        <ChevronRight size={20} />
      </button>

      {/* The Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tickets.map((ticket: any) => (
          <div key={ticket.type} className="min-w-[90%] md:min-w-0 snap-center first:pl-0">
            <TicketCard 
              ticket={ticket}
              departureId={departureId}
              fieldName={fieldName}
              register={register}
              setValue={setValue}
              // 2. Pass selection states to the card
              isSelected={selectedTicketType === ticket.type}
              anySelected={anySelected} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function TicketCard({ ticket, departureId, fieldName, register, isSelected, anySelected, setValue }: any) {
  const handleClick = () => {
    setValue(fieldName, ticket.type, { shouldValidate: true });
    const idField = fieldName.includes("outbound") ? "outboundDepartureId" : "returnDepartureId";
    setValue(idField, departureId, { shouldValidate: true });
  };

  const isFlex = ticket.type.toLowerCase().includes("flex");
  const isDimmed = anySelected && !isSelected;

  return (
    <motion.div 
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
      animate={{ 
        // 3. Apply the "Faded & Gray" effect
        opacity: isDimmed ? 0.4 : 1,
        filter: isDimmed ? "grayscale(100%) brightness(0.9)" : "grayscale(0%) brightness(1)",
        scale: isDimmed ? 0.97 : 1,
        borderColor: isSelected ? "#0066FF" : "#f1f5f9" 
      }}
      transition={{ duration: 0.2, ease: "circOut" }}
      className={`
        relative flex flex-col p-4 rounded-[1.5rem] cursor-pointer border-2 h-full transition-shadow
        ${isSelected ? 'bg-white shadow-lg ring-4 ring-brand/5' : 'bg-white shadow-sm'}
      `}
    >
      <input type="radio" {...register(fieldName)} value={ticket.type} className="sr-only" />
      
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-black text-[10px] text-slate-400 uppercase tracking-widest">{ticket.type}</h3>
          <div className={`text-xl font-black transition-colors ${isSelected ? 'text-brand' : 'text-slate-900'}`}>
            {ticket.price},-
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected ? 'bg-brand border-brand text-white' : 'border-slate-200 text-transparent'
        }`}>
          <Check size={14} strokeWidth={4} />
        </div>
      </div>

      <div className="space-y-1 pt-3 border-t border-slate-50">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
          <Check size={12} className={isSelected ? "text-emerald-500" : "text-slate-300"} /> 
          <span>Standard sete</span>
        </div>
        <div className={`flex items-center gap-2 text-[11px] font-bold ${isFlex ? 'text-slate-600' : 'text-slate-300'}`}>
          {isFlex ? <Check size={12} className={isSelected ? "text-emerald-500" : "text-slate-300"} /> : <Info size={12} />}
          <span>{isFlex ? "Full fleks" : "Ingen ref."}</span>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Clean Journey Header (Replaces the dark header)
 */
function JourneyHeader({ title, date, step }: { title: string; date: string; step: number }) {
  return (
    <header className="flex flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-black text-lg">
          {step}
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
      </div>

      {/* Date displayed beside/below the title */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm self-start sm:self-auto">
        <Calendar size={14} className="text-brand" />
        <span className="text-l font-black text-slate-700 uppercase tracking-widest">
          {date}
        </span>
      </div>
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
  const isOvernight = new Date(departure.arrivalTime) < new Date(departure.departureTime);

  return (
    <div className="bg-white border border-slate-200 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm">
      <div className="grid grid-cols-1 gap-y-4 md:flex md:items-center md:justify-between md:gap-8">
        
        {/* 1. Time & Flow Section */}
        <div className="flex items-center justify-between md:justify-start gap-4 md:gap-10">
          <div className="flex items-center gap-4 md:gap-8">
            {/* Departure */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Avgang</p>
              <p className="text-xl md:text-2xl font-black text-slate-900">{formatTime(departure.departureTime)}</p>
            </div>
            
            {/* The Timeline Arrow */}
            <div className="flex flex-col items-center gap-1 min-w-[50px] md:min-w-[80px]">
              {isOvernight && (
                <div className="flex items-center gap-1 text-[9px] font-bold text-indigo-500 uppercase tracking-tighter">
                  <Moon size={10} fill="currentColor" /> 
                  <span>Natt</span>
                </div>
              )}
              <div className="h-[2px] w-full bg-slate-200 relative">
                <div className="absolute right-0 -top-[3px] w-2 h-2 border-t-2 border-r-2 border-slate-300 rotate-45" />
              </div>
            </div>

            {/* Arrival */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Ankomst</p>
              <div className="flex items-baseline gap-1">
                <p className="text-xl md:text-2xl font-black text-slate-900">{formatTime(departure.arrivalTime)}</p>
                {isOvernight && <span className="text-xs font-bold text-indigo-500">+1</span>}
              </div>
            </div>
          </div>

          {/* Status Light (visible on mobile next to times) */}
          <div className="md:hidden flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rute</span>
          </div>
        </div>

        {/* 2. Vessel Section - Now wraps or stays aside */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-50 md:pt-0 md:border-none">
          <div className="bg-slate-50 p-2 rounded-xl text-brand shrink-0">
            <Ship size={18} />
          </div>
          <div className="min-w-0"> {/* min-w-0 allows text-truncate to work if needed */}
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Fartøy</p>
            <p className="font-bold text-slate-700 leading-tight truncate">
              {departure.vessel}
            </p>
          </div>
        </div>

        {/* Status Light (Desktop only) */}
        <div className="hidden md:flex items-center gap-2 text-slate-400">
           <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
           <span className="text-xs font-bold uppercase tracking-widest">I rute</span>
        </div>
      </div>
    </div>
  );
}