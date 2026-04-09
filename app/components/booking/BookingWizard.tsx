"use client";

import { useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import DepartureSection from "./DepartureSection";
import {
  AlertCircle,
  CalendarX,
  Car,
  CheckCircle,
  Ship,
  Ticket,
} from "lucide-react";
// import VehicleSection from "./VehicleSection"; // Next step!

export default function BookingWizard({
  outboundItems,
  returnItems,
  isRoundTripRequested,
}: any) {
  const [step, setStep] = useState(1);

  const methods = useForm({
    defaultValues: {
      outboundDepartureId: "",
      returnDepartureId: "",
      outboundCabin: "",
      returnCabin: "",
      hasVehicle: false,
      vehiclePlate: "",
    },
    mode: "onChange",
  });

  const { watch, handleSubmit } = methods;

  // --- 1. DATA VALIDATION CHECK ---
  const hasOutbound = outboundItems && outboundItems.length > 0;
  const hasReturn = returnItems && returnItems.length > 0;

  // If user asked for return, but none found OR no outbound found at all
  const isDataMissing = !hasOutbound || (isRoundTripRequested && !hasReturn);

  if (isDataMissing) {
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
              ? "Vi fant dessverre ingen avganger på din valgte utreisedato. Prøv å velge en annen dag i søkefeltet ovenfor."
              : "Vi fant avganger for utreisen, men dessverre ingen ledige returreiser på valgt dato."}
          </p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-brand font-bold hover:underline inline-flex items-center gap-2"
        >
          <AlertCircle size={18} /> Endre søket ditt ovenfor
        </button>
      </div>
    );
  }

  // --- 2. EXISTING FORM LOGIC ---
  const canProgress = () => {
    const values = watch();
    switch (step) {
      case 1:
        // Now checks both departure AND ticket selection
        const hasOutbound = values.outboundDepartureId && values.outboundCabin;
        const hasReturn = values.returnDepartureId && values.returnCabin;
        return isRoundTripRequested ? hasOutbound && hasReturn : !!hasOutbound;
      case 2:
        // Room logic
        return true;
      case 3: 
        // Vehicle logic
        return true;
      default:
        return true;
    }
  };

  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const handleNext = () => {
    if (canProgress()) {
      setStep((s) => s + 1);
      // Wait for render, then move focus
      setTimeout(() => {
        stepHeadingRef.current?.focus();
      }, 100);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="pb-32">
        {" "}
        {/* Padding for sticky footer */}
        {/* Progress Header */}
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                    isActive
                      ? "bg-brand text-white scale-110 shadow-lg shadow-brand/20"
                      : isCompleted
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {<Icon size={16} />}
                </span>
                <span
                  className={`hidden md:block font-bold text-sm ${
                    isActive ? "text-slate-800" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </nav>
        {/* Step Views */}
        <div className="min-h-[400px]">
          {step === 1 && (
            <DepartureSection
              outboundItems={outboundItems}
              returnItems={returnItems}
            />
          )}

          {step === 2 && (
            <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 font-bold">
                Lugar-seksjon kommer her...
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 font-bold">
                Kjøretøy-seksjon kommer her...
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black mb-4">Oppsummering</h2>
              <pre className="bg-slate-50 p-4 rounded-xl text-xs overflow-auto">
                {JSON.stringify(watch(), null, 2)}
              </pre>
            </div>
          )}
        </div>
        {/* Footer Navigation */}
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
      </div>
    </FormProvider>
  );
}
