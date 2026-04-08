import SearchForm from "./../SearchForm";

export default function SimpleHome() {
  return (
        <div className="relative">
          {/* Hero Seksjon */}
          <section className="bg-brand pt-20 pb-32 px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Din neste reise starter her
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Reis komfortabelt mellom Bergen, Stavanger, Kristiansand og Hirtshals.
            </p>
          </section>
    
          {/* Søke-container som "flyter" over heroen */}
          <section className="px-4 -mt-16">
            <SearchForm />
          </section>
    
          {/* Fordeler eller destinasjoner under */}
          <section className="container mx-auto py-20 px-4">
            <h2 className="text-2xl font-bold mb-8 text-slate-800">Populære ruter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="h-40 bg-slate-200 rounded-2xl flex items-end p-6 font-bold text-xl">Bergen – Stavanger</div>
              <div className="h-40 bg-slate-200 rounded-2xl flex items-end p-6 font-bold text-xl">Bergen – Hirtshals</div>
            </div>
          </section>
        </div>
  );
}