"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowRightLeft, Calendar, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SearchFormProps {
  collapsible?: boolean;
}

export default function SearchForm({ collapsible = false }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. In collapsible mode, we start closed. Otherwise, always open.
  const [isEditing, setIsEditing] = useState(!collapsible);

  const urlFrom = searchParams.get("from") || "";
  const urlTo = searchParams.get("to") || "";
  const urlDate = searchParams.get("date") || "";
  const urlReturnDate = searchParams.get("returnDate") || "";

  const [isRoundTrip, setIsRoundTrip] = useState(!!urlReturnDate);

  useEffect(() => {
    setIsRoundTrip(!!urlReturnDate);
  }, [urlReturnDate]);

  async function handleSearch(formData: FormData) {
    const from = formData.get("from");
    const to = formData.get("to");
    const departureDate = formData.get("departureDate");
    const returnDate = formData.get("returnDate");

    let url = `/booking?from=${from}&to=${to}&date=${departureDate}`;
    if (isRoundTrip && returnDate) url += `&returnDate=${returnDate}`;

    router.push(url);
    if (collapsible) setIsEditing(false);
  }

  const getCityImage = (city: string) => {
    if (!city) return "/images/placeholder.png";
    return `/images/${city.toLowerCase()}.png`;
  };

  return (
    <div className="relative w-full z-[100]">
      {/* --- COLLAPSED SUMMARY HEADER --- */}
      {collapsible && (
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`w-full text-left group relative p-6 md:p-10 transition-all rounded-[2.5rem] ${
            isEditing ? "bg-slate-50 shadow-inner" : "hover:bg-slate-50/50 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">
            {/* FROM */}
            <div className="flex flex-col items-start gap-4 flex-1">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-[1.8rem] md:rounded-[2.2rem] overflow-hidden shadow-md border-2 border-white transition-transform group-hover:scale-105">
                <img src={getCityImage(urlFrom)} alt={urlFrom} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avreise</p>
                <p className="text-xl md:text-2xl font-black text-slate-900 leading-none">{urlFrom}</p>
              </div>
            </div>

            {/* ICON TOGGLE */}
            <div className="flex-shrink-0 px-4 flex flex-col items-center gap-1">
              {isRoundTrip ? (
                <ArrowRightLeft className="text-slate-200 group-hover:text-brand transition-colors" size={34} />
              ) : (
                <ArrowRight className="text-slate-200 group-hover:text-brand transition-colors" size={34} />
              )}
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest group-hover:text-brand/50">
                {isRoundTrip ? "Tur/Retur" : "En vei"}
              </span>
            </div>

            {/* TO */}
            <div className="flex flex-col items-end gap-4 flex-1 text-right">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-[1.8rem] md:rounded-[2.2rem] overflow-hidden shadow-md border-2 border-white transition-transform group-hover:scale-105">
                <img src={getCityImage(urlTo)} alt={urlTo} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Destinasjon</p>
                <p className="text-xl md:text-2xl font-black text-slate-900 leading-none">{urlTo}</p>
              </div>
            </div>
          </div>
        </button>
      )}

      {/* --- POP-DOWN FORM MENU --- */}
      <AnimatePresence>
        {isEditing && (
<motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden" // Removed 'absolute', 'top-full', etc.
        >
          <div className={`${collapsible ? "mt-6 mb-8" : ""} p-1`}>
            <div className={`w-full bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 ${!collapsible && "max-w-4xl mx-auto shadow-xl"}`}>
              {/* Tabs */}
              <div className="flex gap-6 mb-8 border-b border-slate-100">
                {["En vei", "Tur/Retur"].map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setIsRoundTrip(idx === 1)}
                    className={`pb-3 px-1 text-xs font-black uppercase tracking-widest transition-all ${
                      (idx === 1) === isRoundTrip ? "text-brand border-b-2 border-brand" : "text-slate-400"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <form action={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* SELECTS & INPUTS */}
                {[
                  { label: "Fra", name: "from", val: urlFrom, options: ["Bergen", "Stavanger", "Hirtshals"] },
                  { label: "Til", name: "to", val: urlTo, options: ["Stavanger", "Hirtshals", "Bergen"] }
                ].map((field) => (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{field.label}</label>
                    <select
                      name={field.name}
                      defaultValue={field.val}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none font-bold text-slate-700"
                      required
                    >
                      {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Utreise</label>
                  <input
                    type="date"
                    name="departureDate"
                    defaultValue={urlDate}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none font-bold text-slate-700"
                    required
                  />
                </div>

                <div className={`flex flex-col gap-2 transition-opacity ${!isRoundTrip ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Retur</label>
                  <input
                    type="date"
                    name="returnDate"
                    defaultValue={urlReturnDate}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none font-bold text-slate-700"
                    required={isRoundTrip}
                  />
                </div>

                <div className="md:col-span-4 mt-2">
                  <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-white font-black py-5 rounded-[1.5rem] transition-all shadow-lg shadow-brand/20 active:scale-[0.98]">
                    {collapsible ? "OPPDATER SØK" : "FINN AVGANGER"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}