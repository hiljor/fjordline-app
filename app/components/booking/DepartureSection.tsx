"use client";

import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { Departure } from "@/app/types/departure";
import { Check, Ship } from "lucide-react";

interface DepartureSectionProps {
  outboundItems: Departure[];
  returnItems?: Departure[];
}

export default function DepartureSection({ outboundItems, returnItems }: DepartureSectionProps) {
  const { register, setValue, watch } = useFormContext();
  
  // Watch values to highlight selected state
  const selectedOutbound = watch("outboundDepartureId");
  const selectedReturn = watch("returnDepartureId");

  // Logic: If only one departure exists, auto-select it for the user
  useEffect(() => {
    if (outboundItems.length === 1) {
      setValue("outboundDepartureId", outboundItems[0].id);
    }
    if (returnItems?.length === 1) {
      setValue("returnDepartureId", returnItems[0].id);
    }
  }, [outboundItems, returnItems, setValue]);

  return (
    <div className="space-y-10">
      {/* 1. Outbound Section */}
      <section>
        <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm">1</span>
          Velg utreise
        </h2>
        <div className="grid gap-4">
          {outboundItems.map((dep) => (
            <SelectionCard 
              key={dep.id} 
              departure={dep} 
              isSelected={selectedOutbound === dep.id}
              register={register("outboundDepartureId")}
            />
          ))}
        </div>
      </section>

      {/* 2. Return Section (Conditional) */}
      {returnItems && returnItems.length > 0 && (
        <section>
          <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
             <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm">2</span>
            Velg hjemreise
          </h2>
          <div className="grid gap-4">
            {returnItems.map((dep) => (
              <SelectionCard 
                key={dep.id} 
                departure={dep} 
                isSelected={selectedReturn === dep.id}
                register={register("returnDepartureId")}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SelectionCard({ departure, isSelected, register }: { departure: Departure, isSelected: boolean, register: any }) {
  return (
    <label className={`
      relative flex items-center p-6 bg-white border-2 rounded-3xl cursor-pointer transition-all
      ${isSelected ? 'border-brand ring-4 ring-brand/10 shadow-md' : 'border-slate-100 hover:border-slate-300'}
    `}>
      <input type="radio" {...register} value={departure.id} className="hidden" />
      
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="bg-slate-50 p-3 rounded-2xl text-brand">
            <Ship size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">
              {new Date(departure.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{departure.vessel}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           {isSelected && (
            <div className="bg-brand text-white p-1 rounded-full">
              <Check size={16} strokeWidth={4} />
            </div>
          )}
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Fra</p>
            <p className="text-xl font-black text-brand">
               {Math.min(...departure.ticketTypes.map(t => t.price))},-
            </p>
          </div>
        </div>
      </div>
    </label>
  );
}