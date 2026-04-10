import { Ship, Ticket, Car, CheckCircle } from "lucide-react";

/**
 * Skeleton component for the BookingWizard.
 * @returns 
 */
export default function BookingWizardSkeleton() {
  return (
    <div className="pt-24 pb-32 max-w-6xl mx-auto px-4 animate-pulse">
      {/* 1. Navigation Skeleton */}
      <nav className="flex justify-between mb-12 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        {["Avgang", "Lugar", "Kjøretøy", "Sammendrag"].map((label, i) => {
          const icons = [Ship, Ticket, Car, CheckCircle];
          const Icon = icons[i];
          return (
            <div key={label} className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                <Icon size={16} />
              </span>
              <div className="hidden md:block h-4 w-16 bg-slate-100 rounded-md" />
            </div>
          );
        })}
      </nav>

      {/* 2. Content Area Skeleton */}
      <div className="min-h-[400px] space-y-6">
        {/* Simulating Departure Cards */}
        <div className="h-8 w-48 bg-slate-200 rounded-lg mb-8" /> {/* Section Title */}
        
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="w-full md:w-1/4 space-y-2">
              <div className="h-6 w-24 bg-slate-100 rounded" />
              <div className="h-4 w-32 bg-slate-50 rounded" />
            </div>
            <div className="flex-1 w-full space-y-2">
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>
            <div className="w-full md:w-1/4 h-12 bg-slate-100 rounded-xl" />
          </div>
        ))}
      </div>

      {/* 3. Footer Navigation Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-[100]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="h-12 w-32 bg-slate-100 rounded-2xl" />
          <div className="h-14 w-48 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}