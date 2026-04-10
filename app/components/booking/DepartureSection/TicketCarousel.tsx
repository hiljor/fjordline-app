import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import TicketCard from "./TicketCard";

/**
 * Carousel Component
 */
export default function TicketCarousel({ tickets, departureId, fieldName, register, setValue, watch }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentFormValue = watch(fieldName); // e.g. "IN123|Flex"
  const anySelected = !!currentFormValue;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <button 
        type="button"
        onClick={() => scroll('left')}
        className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl border border-slate-100 p-2 rounded-full text-slate-600 md:hidden"
      >
        <ChevronLeft size={20} />
      </button>

      <button 
        type="button"
        onClick={() => scroll('right')}
        className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl border border-slate-100 p-2 rounded-full text-slate-600 md:hidden"
      >
        <ChevronRight size={20} />
      </button>

      <div ref={scrollRef} className="flex overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
        {tickets.map((ticket: any) => {
          const combinedValue = `${departureId}|${ticket.type}`;
          return (
            <div key={ticket.type} className="min-w-[90%] md:min-w-0 snap-center">
              <TicketCard 
                ticket={ticket}
                departureId={departureId}
                fieldName={fieldName}
                register={register}
                setValue={setValue}
                watch={watch}
                // Check if this specific ticket is the one stored in form state
                isSelected={currentFormValue === combinedValue}
                anySelected={anySelected} 
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}