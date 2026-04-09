"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import DepartureSection from "./DepartureSection";
import type { Departure } from "@/app/types/departure";
// import AccommodationSection from "./AccommodationSection"; // To be created
// import VehicleSection from "./VehicleSection"; // To be created

export default function BookingWizard({ outboundItems, returnItems }: { outboundItems: Departure[], returnItems?: Departure[] }) {
  const [step, setStep] = useState(1);

  // Initialize React Hook Form
  const methods = useForm({
    defaultValues: {
      outboundDepartureId: "",
      returnDepartureId: "",
      cabinType: "",
      hasVehicle: false,
      vehiclePlate: "",
    },
    mode: "onChange"
  });

  const { watch } = methods;
  const isRoundTrip = !!returnItems?.length;

  // Logic to determine if "Next" should be enabled
  const canProgress = () => {
    if (step === 1) {
      const outbound = watch("outboundDepartureId");
      const inbound = watch("returnDepartureId");
      return isRoundTrip ? (outbound && inbound) : outbound;
    }
    return true; 
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        {/* Step Indicator */}
        <nav className="flex justify-between mb-12 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          {["Avgang", "Lugar", "Kjøretøy", "Sammendrag"].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step >= i + 1 ? "bg-brand text-white" : "bg-slate-100 text-slate-400"
              }`}>
                {i + 1}
              </span>
              <span className={`hidden md:block font-bold text-sm ${
                step >= i + 1 ? "text-slate-800" : "text-slate-400"
              }`}>
                {label}
              </span>
            </div>
          ))}
        </nav>

        {/* Step Rendering */}
        <div className="min-h-[400px]">
          {step === 1 && (
            <DepartureSection 
              outboundItems={outboundItems} 
              returnItems={returnItems} 
            />
          )}
          {step === 2 && <div>{/* AccommodationSection Component here */}</div>}
          {step === 3 && <div>{/* VehicleSection Component here */}</div>}
          {step === 4 && <div>{/* SummarySection Component here */}</div>}
        </div>

        {/* Multi-step Navigation Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-2xl z-50">
          <div className="max-w-4xl mx-auto flex justify-between gap-4">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(s => s - 1)}
              className="px-8 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 disabled:opacity-0 transition-all"
            >
              Tilbake
            </button>
            
            <button
              type="button"
              disabled={!canProgress()}
              onClick={() => step < 4 ? setStep(s => s + 1) : methods.handleSubmit(d => console.log(d))()}
              className="bg-brand text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-brand-dark transition-all shadow-lg disabled:grayscale disabled:opacity-50 active:scale-95"
            >
              {step === 4 ? "Fullfør bestilling" : "Neste steg →"}
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}