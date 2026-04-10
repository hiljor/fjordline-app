import { CalendarX } from "lucide-react";

/**
 * Component to display if there is no data for the BookingWizard
 * @param param0 
 * @returns 
 */
export default function MissingData({hasOutbound}: {hasOutbound: boolean;}) {
  return (
    <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-slate-200 text-center space-y-6 shadow-sm">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
        <CalendarX size={40} />
      </div>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-black text-slate-900 mb-2">
          Ingen ledige avganger
        </h2>
        <p className="text-slate-500 leading-relaxed">
          {!hasOutbound
            ? "Vi fant dessverre ingen avganger på din valgte utreisedato."
            : "Vi fant avganger for utreisen, men ingen ledige returreiser."}
        </p>
      </div>
    </div>
  );
}
