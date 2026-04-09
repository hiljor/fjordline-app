"use client";

import { useState } from "react";
import { Departure } from "@/app/types/departure";
import { Moon, ChevronDown, Check, Info } from "lucide-react";
import Link from "next/link";
// Oppdatert import til den nye React-pakken
import { motion, AnimatePresence, type Variants } from "motion/react";

const dropdownVariants: Variants = {
  open: { 
    height: "auto", 
    opacity: 1,
    transition: {
      height: { type: "spring" as const, stiffness: 100, damping: 20 },
      opacity: { duration: 0.2, delay: 0.1 }
    }
  },
  collapsed: { 
    height: 0, 
    opacity: 0,
    transition: {
      height: { type: "spring" as const, stiffness: 100, damping: 20 },
      opacity: { duration: 0.15 }
    }
  }
};

export default function DepartureCard({ 
  departure, 
  accentColor = "brand" 
}: { 
  departure: Departure, 
  accentColor?: string
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
            <p className={`text-3xl font-black text-${accentColor === 'brand' ? 'brand' : 'emerald-600'}`}>
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
                    accentColor={accentColor}
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

function TicketOption({ ticket, departureId, accentColor }: { ticket: any, departureId: string, accentColor: string }) {
  const isFlex = ticket.type.toLowerCase().includes("flex");
  
  return (
    <motion.div 
      whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
      className="bg-white border-2 border-slate-200 rounded-2xl p-5 flex flex-col h-full hover:border-brand/70 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-black text-xl text-slate-900">{ticket.type}</h4>
          <p className="text-2xl font-black text-brand mt-1">{ticket.price},-</p>
        </div>
        {isFlex && <span className="bg-brand/10 text-brand text-[10px] px-2 py-1 rounded-md font-black uppercase">Anbefalt</span>}
      </div>

      <ul className="space-y-2 mb-8 flex-1">
        <Feature text="Standard sete inkludert" active={true} />
        <Feature text="Refunderbar" active={isFlex} />
        <Feature text="Endre dato" active={isFlex} />
        <Feature text="Lunsjbuffet" active={ticket.type.includes("Premium")} />
      </ul>

      <Link 
        href={`/checkout?departureId=${departureId}&type=${ticket.type}`}
        className={`w-full text-center py-3 rounded-xl font-black transition-all ${
          isFlex 
          ? 'bg-brand text-white shadow-lg shadow-brand/20' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
      >
        Velg {ticket.type}
      </Link>
    </motion.div>
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