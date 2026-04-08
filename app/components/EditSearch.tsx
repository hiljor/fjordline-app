"use client";

import { useState } from "react";
import SearchForm from "./SearchForm";

interface EditSearchProps {
  from?: string;
  to?: string;
  date?: string;
  returnDate?: string;
}

export default function EditSearch({ from, to, date, returnDate}: EditSearchProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-8 overflow-hidden transition-all duration-300">
      {/* 1. Header-visning (når man ikke redigerer) */}
      {!isEditing ? (
        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              {from} <span className="text-brand">→</span> {to}
            </h1>
            <p className="text-slate-500 font-medium">{date}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-full font-bold transition-all text-sm"
          >
            Endre søk
          </button>
        </div>
      ) : (
        /* 2. Skjema-visning (når man trykker "Endre søk") */
        <div className="p-6 bg-slate-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-slate-800">Oppdater ditt søk</h2>
            <button 
              onClick={() => setIsEditing(false)}
              className="text-slate-400 hover:text-slate-600 text-sm font-medium"
            >
              Avbryt ✕
            </button>
          </div>
          
          {/* Her gjenbruker vi SearchForm. Den vil automatisk lese 
              URL-parametre og fylle ut feltene siden vi brukte defaultValue i den */}
          <SearchForm />
        </div>
      )}
    </div>
  );
}