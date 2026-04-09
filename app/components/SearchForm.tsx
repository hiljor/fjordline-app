"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRightLeft, Calendar, Search } from "lucide-react";

interface SearchFormProps {
  collapsible?: boolean;
}

/**
 * A flexible search form component that can either be a full form or a collapsible header depending on the "collapsible" prop.
 * When collapsible is true, it shows a summary of the current search and an "Edit Search" button. Clicking the button expands the full form.
 * When collapsible is false (default), it always shows the full form.
 * @param param0
 * @returns
 */
export default function SearchForm({ collapsible = false }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Manage the expanded/collapsed state
  // If not collapsible, we default to "editing" mode (true)
  const [isEditing, setIsEditing] = useState(!collapsible);

  // 2. Sync values from URL
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

    if (isRoundTrip && returnDate) {
      url += `&returnDate=${returnDate}`;
    }

    router.push(url);

    // Close the form if it's in collapsible mode
    if (collapsible) {
      setIsEditing(false);
    }
  }

  // Helper to get the image path
  const getCityImage = (city: string) => {
    if (!city) return "/images/placeholder.png";
    return `/images/${city.toLowerCase()}.png`;
  };

  // --- VIEW A: Collapsed Header (Summary) ---
  if (collapsible && !isEditing) {
    return (
        <div className="relative p-6 md:p-10">
          
          <div className="flex items-start justify-between">
            
            {/* COLUMN LEFT: DEPARTURE */}
            <div className="flex flex-col items-start gap-4 flex-1">
              <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-[1.8rem] md:rounded-[2.2rem] overflow-hidden shadow-lg border-2 border-white">
                <img 
                  src={getCityImage(urlFrom)} 
                  alt={urlFrom}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/images/placeholder.webp")}
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avreise</p>
                <p className="text-xl md:text-2xl font-black text-slate-900 leading-none mb-2">{urlFrom}</p>
              </div>
            </div>

            {/* CENTER PILLAR: THE BUTTON */}
            <div className="flex flex-col items-center justify-center pt-6 md:pt-10 px-2 min-w-[80px]">
              {/* Decorative vertical line */}
              <div className="w-px h-8 bg-slate-100 mb-2 hidden md:block" />
              
              <button 
                onClick={() => setIsEditing(true)}
                className="group relative flex flex-col items-center gap-2"
              >
                {/* Circular Action Button */}
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm group-hover:border-brand group-hover:text-brand transition-all group-active:scale-90">
                  <Search size={18} className="group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-xl font-black text-slate-400 uppercase tracking-tighter group-hover:text-brand transition-colors">
                  Endre
                </span>
              </button>

              <div className="w-px h-8 bg-slate-100 mt-2 hidden md:block" />
            </div>

            {/* COLUMN RIGHT: DESTINATION */}
            <div className="flex flex-col items-end gap-4 flex-1 text-right">
              <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-[1.8rem] md:rounded-[2.2rem] overflow-hidden shadow-lg border-2 border-white">
                <img 
                  src={getCityImage(urlTo)} 
                  alt={urlTo}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/images/placeholder.webp")}
                />
              </div>
              <div className="space-y-1 flex flex-col items-end">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Destinasjon</p>
                <p className="text-xl md:text-2xl font-black text-slate-900 leading-none mb-2">{urlTo}</p>
              
              </div>
            </div>

          </div>
        </div>
    );
  }

  // --- VIEW B: The Full Form ---
  return (
    <div
      className={`w-full mx-auto bg-white rounded-2xl border border-slate-100 transition-all duration-300 
      ${
        collapsible
          ? "p-6 bg-slate-50 animate-in fade-in slide-in-from-top-4 mb-8 shadow-sm"
          : "max-w-4xl shadow-xl p-6"
      }`}
    >
      {/* Header for editing mode */}
      {collapsible && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-slate-800">Oppdater ditt søk</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="text-slate-400 hover:text-slate-600 text-sm font-medium"
          >
            Avbryt ✕
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => setIsRoundTrip(false)}
          className={`pb-2 px-1 text-sm font-semibold transition-all ${!isRoundTrip ? "text-brand border-b-2 border-brand" : "text-slate-500"}`}
        >
          En vei
        </button>
        <button
          type="button"
          onClick={() => setIsRoundTrip(true)}
          className={`pb-2 px-1 text-sm font-semibold transition-all ${isRoundTrip ? "text-brand border-b-2 border-brand" : "text-slate-500"}`}
        >
          Tur/Retur
        </button>
      </div>

      <form
        action={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {/* From */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            Fra
          </label>
          <select
            name="from"
            key={`from-${urlFrom}`}
            defaultValue={urlFrom}
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand outline-none"
            required
          >
            <option value="" disabled>
              Velg sted
            </option>
            <option value="Bergen">Bergen</option>
            <option value="Stavanger">Stavanger</option>
            <option value="Hirtshals">Hirtshals</option>
          </select>
        </div>

        {/* To */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            Til
          </label>
          <select
            name="to"
            key={`to-${urlTo}`}
            defaultValue={urlTo}
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand outline-none"
            required
          >
            <option value="" disabled>
              Velg sted
            </option>
            <option value="Stavanger">Stavanger</option>
            <option value="Hirtshals">Hirtshals</option>
            <option value="Bergen">Bergen</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            Utreise
          </label>
          <input
            type="date"
            name="departureDate"
            defaultValue={urlDate}
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand outline-none text-slate-900"
            required
          />
        </div>

        {/* Return Date */}
        <div
          className={`flex flex-col gap-1 transition-opacity ${!isRoundTrip ? "opacity-30 pointer-events-none" : "opacity-100"}`}
        >
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            Retur
          </label>
          <input
            type="date"
            name="returnDate"
            defaultValue={urlReturnDate}
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand outline-none text-slate-900"
            required={isRoundTrip}
          />
        </div>

        <div className="md:col-span-4 mt-2">
          <button
            type="submit"
            className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand/20 active:scale-[0.98]"
          >
            {collapsible ? "Oppdater søk" : "Finn avganger"}
          </button>
        </div>
      </form>
    </div>
  );
}
