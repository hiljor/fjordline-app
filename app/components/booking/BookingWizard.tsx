"use client";

import { useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import DepartureSection from "./DepartureSection";
import SummarySection from "./SummarySection";
import {
  AlertCircle,
  CalendarX,
  Car,
  CheckCircle,
  Ship,
  Ticket,
} from "lucide-react";

export default function BookingWizard({
  outboundItems,
  returnItems,
  isRoundTripRequested,
  outboundDate,
  returnDate,
}: any) {
  const [step, setStep] = useState(1);

  const methods = useForm({
    defaultValues: {
      outboundDepartureId: "",
      returnDepartureId: "",
      outboundTicket: "",
      returnTicket: "",
      hasVehicle: false,
      vehiclePlate: "",
    },
    mode: "onChange",
  });

  const { watch, handleSubmit } = methods;

  // --- 1. DATA VALIDATION ---
  const hasOutbound = outboundItems && outboundItems.length > 0;
  const hasReturn = returnItems && returnItems.length > 0;
  const isDataMissing = !hasOutbound || (isRoundTripRequested && !hasReturn);

  // --- 2. PROGRESS LOGIC ---
  const canProgress = () => {
    if (isDataMissing) return false; // Cannot progress if there's no data
    const values = watch();
    switch (step) {
      case 1:
        const outboundOk = values.outboundDepartureId && values.outboundTicket;
        const returnOk = values.returnDepartureId && values.returnTicket;
        return isRoundTripRequested ? outboundOk && returnOk : !!outboundOk;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProgress()) setStep((s) => s + 1);
  };

  return (
    <FormProvider {...methods}>
      <div className="pb-32">
        {/* Step Navigation - Always render this so hooks stay consistent */}
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
                        ? "bg-emerald-500 text-white"
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

        {/* Step Views */}
        <div className="min-h-[400px]">
          {/* CRITICAL FIX: Check for missing data INSIDE the step render logic 
             rather than as an early return at the top of the file.
          */}
          {isDataMissing ? (
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
          ) : (
            <>
              {step === 1 && (
                <DepartureSection
                  outboundItems={outboundItems}
                  returnItems={returnItems}
                  outboundDate={outboundDate}
                  returnDate={returnDate}
                />
              )}

              {step === 2 && (
                <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-500 font-bold">
                  Lugar-seksjon kommer her...
                </div>
              )}

              {step === 3 && (
                <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-500 font-bold">
                  Kjøretøy-seksjon kommer her...
                </div>
              )}

              {step === 4 && (
                <SummarySection
                  watch={watch}
                  outboundItems={outboundItems}
                  returnItems={returnItems}
                />
              )}
            </>
          )}
        </div>

        {/* Footer Navigation */}
        {!isDataMissing && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t p-4 z-50">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className={`px-8 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-all ${step === 1 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              >
                Tilbake
              </button>

              <button
                type="button"
                disabled={!canProgress()}
                onClick={handleNext}
                className="bg-brand text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-brand-dark transition-all shadow-lg disabled:opacity-30 disabled:grayscale"
              >
                Neste steg →
              </button>
            </div>
          </div>
        )}
      </div>
    </FormProvider>
  );
}
