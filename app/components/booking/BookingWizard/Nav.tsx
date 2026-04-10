import { Ship, Ticket, Car, CheckCircle } from "lucide-react";

interface NavProps {
  /** Which step we are on */
  step: number;
}

/**
 * 
 * @param props The props for navbar of BookingWizard
 */
export default function Nav({ step }: NavProps) {
  return (
    <nav className="flex justify-between mb-12 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      {["Avgang", "Lugar", "Kjøretøy", "Sammendrag"].map((label, i) => {
        const stepNum = i + 1;
        const isActive = step === stepNum;
        const isCompleted = step > stepNum;
        const icons = [Ship, Ticket, Car, CheckCircle];
        const Icon = icons[i];
        return (
          <div key={label} className="flex items-center gap-3">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                isActive
                  ? "bg-brand text-white scale-110 shadow-lg shadow-brand/20"
                  : isCompleted
                    ? "bg-brand text-white"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              <Icon size={16} />
            </span>
            <span
              className={`hidden md:block font-bold text-sm ${isActive ? "text-slate-800" : "text-slate-400"}`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}