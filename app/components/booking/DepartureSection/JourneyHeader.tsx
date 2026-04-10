import { Calendar } from "lucide-react";

/**
 * Journey Header
 */
export default function JourneyHeader({ title, date, step }: { title: string; date: string; step: number }) {
  return (
    <header className="flex flex-row items-center justify-between gap-3 border-b border-slate-100 pb-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-black text-lg">
          {step}
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <Calendar size={14} className="text-brand" />
        <span className="text-xs md:text-sm font-black text-slate-700 uppercase tracking-widest">
          {date}
        </span>
      </div>
    </header>
  );
}