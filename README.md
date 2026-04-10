# fjordline-booking-app

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Nextjs

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Mål og fokus
Jeg ønsker å fokusere på å skape en app som er enkel å bruke. Jeg skaper derfor en app som følger tilgjengelighet, er rask og responsiv og har et enkelt og intuitivt grensesnitt. God SEO vil også være i bakhodet.

### Eksisterende applikasjon hos Fjord Line
Deres eksisterende applikasjon er moderne, intuitiv og mobil-vennlig, og derfor prøver jeg å ta inspirasjon uten å kopiere den. Det ene jeg merker meg er at søkeargumentet ikke er lagret i URL, og at det ikke er mulig å dele søk. Det er noe jeg vil gjøre annerledes for å gjøre det enklere å dele og gjenbruke søk, selv om det også er gunstig å bruke en session av andre grunner.

## Prøblemløsning og valg

### App router vs pages router
Er mest kjent med app router, og valgte det også fordi Nextjs selv anbefaler det for nye prosjekter. Bruker også Nextjs defaults i initiering for å gjøre det enklere å komme i gang.

### Backend
Har selv bare gjort alt i ett prosjekt, og selv om jeg gjerne vil lære å sette opp separat REST-API er ikke det noe jeg tar meg tid til her, men kunne gjort med mer tid. Velger derfor å gjøre alt i ett prosjekt.

### Ruting
- /: Hovedsiden som viser søkefelt
- /booking: Siden som viser den detaljerte bookingportalen
- /api/departures: API rute for å hente avgangsinformasjon basert på søkeargumentet

### Imports
Jeg opplevde problemere med å importere ved hjelp av "@/seksjon/fil", og valgte derfor å bruke relative imports. Jeg ville helst fikset dette problemet gitt at det gjør det enklere å flytte filer, men fikser ikke det nå.

### Søkeparametere
Jeg bruker URL-søkeparametere for å lagre søkeargumentene, som gjør det mulig å enkelt dele og gjenbruke søk. Ved mer tid kunne jeg også lagt flere parametere inn fra BookingWizard slik at man kan dele et ferdig utfylt skjema.

### Opphavsrettighet
Jeg har brukt et bilde fra Fjordline jeg fant på Google av et av skipene deres (og bilder av Bergen og Stavanger), og realistisk sett trenger ikke dere annet enn egne bilder. Men i en ekte applikasjon ville jeg sjekket ordentlig opp i rettigheter og absolutt unngått å bruke det uten tillatelse.

### Data fetching
Jeg simulerer data fetching ved å ha en lib/db.ts som leser data fra en lokal JSON-fil. Jeg gjør dette for at det senere skal være enkelt å bytte ut med en ekte database uten å endre større deler av koden.

### Listing av avganger
Jeg laget først et oppsett med en liste over DepartureCards, slik man har for flyselskaper og Vy for eksempel. Men etter å ha merket at Fjordline ikke har mange avganger om dagen, og dessuten trenger informasjon slik som en hotellbooking gjør, snudde jeg om designet på det tidspunktet og fokuserte på å fremheve de få avgangene som finnes.
Tidligere visning:
![Tidligere valg av avganger](log/image.png)

Løsningen jeg valgte er rettet mot en oversiktlig booking. Den er inspirert av Fjordline sin booking, men simplifisert, gjort for å være oversiktelig og mobilvennlig. Jeg valgte å bruke react-hook-form for å gjøre det enkelt å samle inn informasjonen gitt all informasjonen som må samles (lugar/bil/kundeinfo)og for at endringer enkelt kan reflekteres i UI.

### Håndtering av villspor
Jeg la inn en not-found.tsx fil for å gjøre det mindre forvirrende ved 404 error, og dessuten rutet tilbake til hovedsiden fra booking dersom feil parametere blir brukt i /booking url'en.

## Videre utvikling
Her er et raskt overblikk over de viktigste forbedringene jeg ville gjort videre:

- **Gjenbrukt Tailwind-styling og basiskomponenter**
  - Lag universelle knapper, input-felt og andre UI-komponenter.
  - Gjenbruk Tailwind-styling strings for et mer sammenhengende og pålitelig design.

- **React Hook Form + Zod for data validation**
  - Bytt ut dagens prototype-validering med `zod` for streng datastruktur.
  - Utnytt mer av `react-hook-form` sin funksjonalitet, inkludert `trigger` og bedre feilhåndtering.

- **Når ingen avganger er funnet**
  - Åpne søkeskjemaet automatisk ved null treff.
  - Vurder å vise en kalender eller tilgjengelige reisedager og priser.

- **Tydeligere skille mellom avganger**
  - Forsterk `JourneyHeader` slik at hver avgang skiller seg tydelig fra billettkortene.
  - Gjør starten på hver avgang mer visuelt distinkt.

- **Aktivere "neste steg ->" knappen**
  - Gjør knappen hover-aktiv og visuelt tydelig som klikkbar for mer intuitiv knapp.

## Kjente bugs
Med hvordan bilettene har blitt implementert er det noe kluss i fokuset som gjør at man ikke kan bekrefte en billett med mellomrom eller enter, som er manglende tilgjengelighet. Med mer tid hadde jeg satt meg inn i dette, og dessuten startet med en mer grundig dataflow logikk med zod og react-hook-form som nevnt.

