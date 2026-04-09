"use client";

import { useState } from "react";
import { Departure } from "@/app/types/departure";
import { Moon, ChevronDown, Check, Info } from "lucide-react";
import Link from "next/link";
// Oppdatert import til den nye React-pakken
import { motion, AnimatePresence, Variants } from "motion/react";

const dropdownVariants: Variants = {
  open: { 
    height: "auto", 
    opacity: 1,
    transition: {
      height: { type: "spring", stiffness: 100, damping: 20 },
      opacity: { duration: 0.2, delay: 0.1 }
    }
  },
  collapsed: { 
    height: 0, 
    opacity: 0,
    transition: {
      height: { type: "spring", stiffness: 100, damping: 20 },
      opacity: { duration: 0.15 }
    }
  }
};

export default function DepartureCard({ 
  departure, 
  accentColor = "brand" ,
  type,
}: { 
  departure: Departure, 
  accentColor?: string,
  type: string
}) {
  const [isOpen, setIsOpen] = useState(false);
  const lowestPrice = Math.min(...departure.ticketTypes.map(t => t.price));

  return (
    <motion.div 
      layout
      className={`bg-white rounded-3xl border transition-colors duration-300 overflow-hidden ${
        isOpen ? 'ring-2 ring-brand border-transparent shadow-2xl' : 'border-slate-200 hover:border-brand/40 shadow-sm'
      }`}
    >
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 md:p-7 flex flex-col md:flex-row gap-6 items-center cursor-pointer select-none"
      >
        <JourneyInfo departure={departure} />

        <div className="flex-1 hidden md:block border-b border-dashed border-slate-200" />

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Fra</p>
            <p className={`text-3xl font-black text-${accentColor}`}>
              {lowestPrice},-
            </p>
          </div>
          
          <div className={`p-2 rounded-full bg-slate-50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className="text-slate-400" size={20} />
          </div>
        </div>
      </div>

      {/* Bruker AnimatePresence for tryggere fjerning/legging til av elementer i DOM */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={dropdownVariants}
            className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
          >
            <div className="p-6 md:p-8">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Velg billettype</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {departure.ticketTypes.map((ticket) => (
                  <TicketOption 
                    key={ticket.type} 
                    ticket={ticket} 
                    departureId={departure.id}
                    type={type}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TicketOption({ 
  ticket, 
  departureId, 
  type // 'outbound' | 'return'
}: { 
  ticket: any, 
  departureId: string, 
  type: string 
}) {
  const isFlex = ticket.type.toLowerCase().includes("flex");
  const inputId = `${type}-${departureId}-${ticket.type}`;
  
  return (
    <label htmlFor={inputId} className="cursor-pointer group">
      {/* Hidden native radio button */}
      <input 
        type="radio" 
        id={inputId}
        name={type === 'outbound' ? 'outboundTicket' : 'returnTicket'} 
        value={`${departureId}|${ticket.type}`}
        className="peer hidden"
        required // Browser enforces selection before "Next" works
      />
      
      <div className="h-full bg-white border-2 border-slate-200 rounded-2xl p-5 flex flex-col transition-all peer-checked:border-brand peer-checked:ring-2 peer-checked:ring-brand/20 peer-checked:bg-brand/5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-black text-xl text-slate-900">{ticket.type}</h4>
            <p className="text-2xl font-black text-brand mt-1">{ticket.price},-</p>
          </div>
          {/* Visual indicator of selection */}
          <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center peer-checked:bg-brand peer-checked:border-brand">
            <Check size={14} className="text-white opacity-0 peer-checked:opacity-100" />
          </div>
        </div>

        <ul className="space-y-2 mb-8 flex-1">
          <Feature text="Standard sete inkludert" active={true} />
          <Feature text="Refunderbar" active={isFlex} />
        </ul>

        <div className="w-full text-center py-3 rounded-xl font-black transition-all bg-slate-100 text-slate-600 group-hover:bg-slate-200 peer-checked:bg-brand peer-checked:text-white">
          Velg {ticket.type}
        </div>
      </div>
    </label>
  );
}

function Feature({ text, active }: { text: string; active: boolean }) {
  return (
    <li className={`flex items-center gap-2 text-xs font-medium ${active ? 'text-slate-700' : 'text-slate-300 line-through'}`}>
      {active ? <Check size={14} className="text-emerald-500" /> : <Info size={14} />}
      {text}
    </li>
  );
}

function JourneyInfo({departure}: { departure: Departure }) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  return (
    <div className="flex flex-col items-center md:items-start min-w-[150px]">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black text-slate-900 tracking-tighter">
          {formatTime(departure.departureTime)} – {formatTime(departure.arrivalTime)}
        </span>
        {departure.requiresCabin && <Moon size={18} className="text-brand" />}
      </div>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
        {departure.vessel}
      </span>
    </div>
  );
}