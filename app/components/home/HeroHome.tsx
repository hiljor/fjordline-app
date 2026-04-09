import Image from "next/image";
import SearchForm from "./../SearchForm";

export default function HeroHome() {
  return (
    <main className="relative min-h-screen">
      {/* 1. Fast Bakgrunnsbilde-seksjon */}
      <div className="fixed inset-0 z-0 h-screen w-full">
        <Image
          src="/images/hero.webp"
          alt="En Fjordline ferge på sjøen med kysten i bakgrunnen"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* 2. Scrollbart Innhold */}
      <div className="relative z-20 w-full min-h-screen">
        
        {/* Hero Tekst-seksjon */}
        <section className="container mx-auto px-4 py-32 md:py-48 text-center text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Din vei til Danmark
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Bestill behagelig ferge mellom Norge og Danmark.
          </p>
        </section>

        {/* Søke-container: Increased z-index to stay above the white section */}
        <section className="px-4 -mt-10 max-w-4xl mx-auto relative z-40">
          <SearchForm />
        </section>

        {/* Hovedinnhold-seksjon: Reduced negative margin and adjusted z-index */}
        <section className="bg-white text-slate-900 pt-24 pb-24 px-4 mt-[-4rem] relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-t-[3rem]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-black mb-12 tracking-tight text-center md:text-left">Byer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {["Bergen", "Stavanger"].map((city, index) => (
                <div key={index} className="group rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 bg-slate-50 hover:shadow-xl transition-all duration-300">
                  <div className="h-48 bg-slate-200 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                     <div className="absolute bottom-4 left-6 z-20 text-white">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Rute</p>
                        <p className="text-xl font-black">{city}</p>
                     </div>
                  </div>
                  <div className="p-6">
                    <button className="w-full py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-600 group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all">
                      Utforsk
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}