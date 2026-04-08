import Image from "next/image";
import SearchForm from "./../SearchForm";

export default function HeroHome() {
return (
    <main className="relative min-h-screen">
      {/* 1. Fast Bakgrunnsbilde-seksjon */}
      {/* Denne seksjonen står helt stille bak alt innhold */}
      <div className="fixed inset-0 z-0 h-screen w-full">
        <Image
          src="/images/hero-ferry.webp" // Stien til bildet ditt i public/
          alt="En Fjordline ferge på sjøen med kysten i bakgrunnen"
          fill // Fyller hele viewport
          priority // Prioriterer lasting
          className="object-cover object-center" // Fyller og sentrerer bildet
        />
        {/* Et svakt mørkt overlay for å sikre lesbarhet */}
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* 2. Scrollbart Innhold */}
      {/* Dette innholdet ligger FORAN bildet og scroller */}
      <div className="relative z-20 w-full min-h-screen">
        
        {/* Hero Tekst-seksjon */}
        <section className="container mx-auto px-4 py-32 md:py-48 text-center text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
            Din neste sjøreise starter her
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Bestill ferge mellom Norge og Danmark med de beste prisene og fleksible avganger.
          </p>
        </section>

        {/* Søke-container som "flyter" */}
        <section className="px-4 -mt-10 max-w-4xl mx-auto relative z-30">
          <SearchForm />
        </section>

        {/* Hovedinnhold-seksjon med hvit bakgrunn */}
        {/* Denne bakgrunnen gjør at bildet "forsvinner" under når man scroller */}
        <section className="bg-white text-slate-900 pt-32 pb-24 px-4 mt-[-10rem] relative z-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12">Populære ruter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Eksempel-kort for ruter */}
              {[
                { from: "Bergen", to: "Stavanger" },
                { from: "Bergen", to: "Hirtshals" },
                { from: "Stavanger", to: "Hirtshals" },
              ].map((route, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 p-6">
                  <p className="text-xs font-bold text-brand uppercase tracking-wider mb-2">Seiling</p>
                  <h3 className="font-bold text-xl">{route.from} – {route.to}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}