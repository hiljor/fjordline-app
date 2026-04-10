"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import DepartureSection from "../DepartureSection/DepartureSection";
import SummarySection from "../SummarySection";
import Nav from "./Nav";
import MissingData from "./MissingData";

interface BookingWizardProps {
  /** Array of outbound departure options */
  outboundItems: any[];
  /** Array of return departure options */
  returnItems: any[];
  /** Whether a round trip was requested */
  isRoundTripRequested: boolean;
  /** Outbound departure date */
  outboundDate: string;
  /** Return departure date */
  returnDate: string;
}

/**
 * BookingWizard component that manages the multi-step booking process.
 * Handles form state with React Hook Form and step navigation logic.
 * Is a Client Component that receives pre-fetched data as props from the server.
 * @param props - The booking wizard props
 */
export default function BookingWizard({
  outboundItems,
  returnItems,
  isRoundTripRequested,
  outboundDate,
  returnDate,
}: BookingWizardProps) {
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

  // --- data validation
  const hasOutbound = outboundItems && outboundItems.length > 0;
  const hasReturn = returnItems && returnItems.length > 0;
  const isDataMissing = !hasOutbound || (isRoundTripRequested && !hasReturn);

  // --- progress logic
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
      <div className="pt-24 pb-32 max-w-6xl mx-auto px-4">
        {/* Step Navigation*/}
        <Nav step={step}/>

        {/* Step Views */}
        <div className="min-h-[400px]">
          {isDataMissing ? (
            < MissingData hasOutbound={hasOutbound}/>
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
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-[100] shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
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
