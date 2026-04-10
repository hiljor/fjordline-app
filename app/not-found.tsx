"use client"
import Link from "next/link";
import { Ship, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-8 bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        {/* Visual Element */}
        <div className="relative mx-auto w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center">
          <Ship size={60} className="text-slate-200" />
          <div className="absolute top-0 right-0 bg-brand text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
            404
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Oops! Vi er på villspor.
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed font-medium">
            Siden du leter etter finnes ikke, eller har blitt flyttet til en annen havn.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-brand/20 active:scale-[0.98]"
          >
            <Home size={18} />
            HJEM
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-8 py-4 rounded-2xl transition-all border border-slate-200"
          >
            <ArrowLeft size={18} />
            GÅ TILBAKE
          </button>
        </div>
      </div>
    </div>
  );
}