import { useState } from "react";

// Simplified logic for the new multi-step flow
export default function BookPage() {
  const [step, setStep] = useState(1);

  return (
    <main>
      <div className="stepper-indicator flex gap-4 mb-8">
        {['Avgang', 'Lugar', 'Kjøretøy', 'Utsjekk'].map((label, i) => (
          <div key={i} className={`step ${step === i + 1 ? 'text-brand font-bold' : 'text-slate-400'}`}>
            {i + 1}. {label}
          </div>
        ))}
      </div>

      <form action="/checkout" method="POST">
        {step === 1 && <DepartureSection onNext={() => setStep(2)} />}
        {step === 2 && <AccommodationSection onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <VehicleSection onNext={() => setStep(4)} onBack={() => setStep(2)} />}
        {step === 4 && <SummarySection onBack={() => setStep(3)} />}
        
        {/* Sticky footer only shows "Next" logic or "Complete" */}
      </form>
    </main>
  );
}