"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Search form for finding departures.
 * @returns 
 */
export default function SearchForm() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const router = useRouter();

  async function handleSearch(formData: FormData) {

    const from = formData.get("from");
    const to = formData.get("to");
    const departureDate = formData.get("departureDate");
    const returnDate = formData.get("returnDate");

    let url = `/departures?from=${from}&to=${to}&date=${departureDate}`;
    
    if (isRoundTrip && returnDate) {
      url += `&returnDate=${returnDate}`;
    }

    router.push(url);
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
      {/* Set one-way or round trip */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setIsRoundTrip(false)}
          className={`pb-2 px-1 text-sm font-semibold transition-all ${!isRoundTrip ? 'text-brand border-b-2 border-brand' : 'text-slate-500'}`}
        >
          En vei
        </button>
        <button 
          onClick={() => setIsRoundTrip(true)}
          className={`pb-2 px-1 text-sm font-semibold transition-all ${isRoundTrip ? 'text-brand border-b-2 border-brand' : 'text-slate-500'}`}
        >
          Tur/Retur
        </button>
      </div>

      <form action={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* From */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Fra</label>
          <select name="from" className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" required>
            <option value="Bergen">Bergen</option>
            <option value="Stavanger">Stavanger</option>
            <option value="Hirtshals">Hirtshals</option>
          </select>
        </div>

        {/* To */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Til</label>
          <select name="to" className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" required>
            <option value="Stavanger">Stavanger</option>
            <option value="Hirtshals">Hirtshals</option>
            <option value="Bergen">Bergen</option>
          </select>
        </div>

        {/* Departure date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Utreise</label>
          <input 
            type="date" 
            name="departureDate" 
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" 
            required 
          />
        </div>

        {/* Return date */}
        <div className={`flex flex-col gap-1 transition-opacity ${!isRoundTrip ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Retur</label>
          <input 
            type="date" 
            name="returnDate" 
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" 
            required={isRoundTrip}
          />
        </div>

        {/* Search button */}
        <div className="md:col-span-4 mt-2">
          <button 
            type="submit" 
            className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand/20 active:scale-[0.98]"
          >
            Finn avganger
          </button>
        </div>
      </form>
    </div>
  );
}