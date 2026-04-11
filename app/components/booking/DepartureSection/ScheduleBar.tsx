import { formatTime } from "@/app/lib/utils";
import { Departure } from "@/app/types/departure";
import { Moon, Ship } from "lucide-react";

/**
 * Displays a schedule bar for the given departure
 * @param param0 
 * @returns 
 */
export default function ScheduleBar({ departure }: { departure: Departure;}) {
  // Check if the departure is overnight
  const isOvernight = new Date(departure.departureTime) < new Date(departure.arrivalTime);
  const duration = Math.round((new Date(departure.arrivalTime).getTime() - new Date(departure.departureTime).getTime()) / 60000 / 60 * 10) / 10

  return (
    <div className="bg-white border border-slate-200 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm">
      <div className="grid grid-cols-1 gap-y-4 md:flex md:items-center md:justify-between md:gap-8">
        <div className="flex items-center justify-between md:justify-start gap-4 md:gap-10">
          <div className="flex items-center gap-4 md:gap-8">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Avgang</p>
              <p className="text-xl md:text-2xl font-black text-slate-900">{formatTime(departure.departureTime)}</p>
            </div>
            <div className="flex flex-col items-center gap-1 min-w-[50px] md:min-w-[80px]">
              <p className="text-xs font-bold text-slate-400 tracking-widest">{duration}h</p>
              <div className="h-[2px] w-full bg-slate-200 relative">
                <div className="absolute right-0 -top-[3px] w-2 h-2 border-t-2 border-r-2 border-slate-300 rotate-45" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Ankomst</p>
              <div className="flex items-baseline gap-1">
                <p className="text-xl md:text-2xl font-black text-slate-900">{formatTime(departure.arrivalTime)}</p>
                {isOvernight && <span className="text-m font-bold text-brand cursor-help" title="Denne avgangen ankommer destinasjonen neste dag">+1</span>}
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rute</span>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-slate-50 md:pt-0 md:border-none">
          <div className="bg-slate-50 p-2 rounded-xl text-brand shrink-0">
            <Ship size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Fartøy</p>
            <p className="font-bold text-slate-700 leading-tight truncate">{departure.vessel}</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-slate-400">
           <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
           <span className="text-xs font-bold uppercase tracking-widest">I rute</span>
        </div>
      </div>
    </div>
  );
}