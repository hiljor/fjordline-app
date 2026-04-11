# fjordline-booking-app

## Kjør

Kjør ``pnpm i`` etterfulgt av ``pnpm dev`` for å få opp siden på localhost:3000.

Bergen-Stavanger har utreise 10.04.2026 og retur 13.04.2026.
Bergen-Hirtshals har utreise 10.04.2026 og viser UI for at fergen går over natten.


## Mål og fokus
Jeg ønsker å fokusere på å skape en app som er enkel å bruke. Jeg skaper derfor en app som følger tilgjengelighet, er rask og responsiv og har et enkelt og intuitivt grensesnitt. God SEO vil også være i bakhodet.

### Eksisterende applikasjon hos Fjord Line
Deres eksisterende applikasjon er moderne, intuitiv og mobil-vennlig, og derfor prøver jeg å ta inspirasjon uten å kopiere den. Det ene jeg merker meg er at søkeargumentet ikke er lagret i URL, og at det ikke er mulig å dele søk. Det er noe jeg vil gjøre annerledes for å gjøre det enklere å dele og gjenbruke søk, selv om det også er gunstig å bruke en session av andre grunner.

## Prøblemløsning og valg

- **App router vs pages router**
  - Er mest kjent med app router, og valgte det også fordi Nextjs selv anbefaler det for nye prosjekter. Bruker også Nextjs defaults i initiering for å gjøre det enklere å komme i gang.

- **Backend**
  - Alt i ett prosjekt fordi det er det jeg er mest kjent med per nå.

- **Ruting**
  - /: Hovedsiden som viser søkefelt
  - /booking: Siden som viser den detaljerte bookingportalen
  - /api/departures: API rute for å hente avgangsinformasjon basert på søkeargumentet

- **Søkeparametere**
  - Jeg bruker URL-søkeparametere for å lagre søkeargumentene, som gjør det mulig å enkelt dele og gjenbruke søk. Ved mer tid kunne jeg også lagt flere parametere inn fra BookingWizard slik at man kan dele et ferdig utfylt skjema.

- **Opphavsrettighet**
  - Jeg har brukt et bilde fra Fjordline jeg fant på Google av et av skipene deres (og bilder av Bergen og Stavanger), og realistisk sett trenger ikke dere annet enn egne bilder. Men i en ekte applikasjon ville jeg sjekket ordentlig opp i rettigheter og absolutt unngått å bruke det uten tillatelse.

- **Data fetching**
  - Jeg simulerer data fetching ved å ha en lib/db.ts som leser data fra en lokal JSON-fil. Jeg gjør dette for at det senere skal være enkelt å bytte ut med en ekte database eller api kall uten å endre større deler av koden.

- **Listing av avganger**
  - Jeg samlet litt domene informasjon ved å se på Fjordline sin eksisterende bookingside.
  - Løsningen jeg valgte er rettet mot en oversiktlig booking. Den er inspirert av eksisterende side, men simplifisert og gjort for å oppleves som lite slitsom og mobilvennlig. 
  - Jeg valgte å bruke react-hook-form for å gjøre det enkelt å samle inn informasjonen gitt all informasjonen som må samles (lugar/bil/kundeinfo) og for at endringer enkelt kan reflekteres i UI.

- **Håndtering av villspor**
  - Jeg la inn en not-found.tsx fil for å gjøre det mindre forvirrende ved 404 error, og dessuten rutet tilbake til hovedsiden fra booking dersom feil parametere blir brukt i /booking url'en.*

- **UI for overnattingsreise**
  - Jeg endret fra å ha et månesymbol til å bruke "+1" med hover-over tekst for å gjøre nattereiser tydelige.

- **Cursor-hover**
  - Dette var noe jeg raskt satt på til slutt og gjorde vondt i sjelen og gjøre manuelt. Jeg ville lagt dette inn i en egen button component for god gjenbruk ellers.

## Videre utvikling
Her er et raskt overblikk over de viktigste forbedringene jeg ville gjort videre:

- **Legge til seksjon for kundeinfo**
  - Samle inn informasjon som kundens navn, epost, eller fylle inn dersom de er logget inn

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

- **Commit språk**
  - Jeg forsøkte å bruke norsk i commitene mine, men etter vane snek det seg inn mye engelsk. Engelsk hadde dessuten vert mer naturlig når jeg skriver dokumentasjonen på engelsk, så jeg ville heller bare brukt engelsk.

- **Klikke på steg i booking portal**
  - Jeg ville gjort det mulig å trykke på ikonene (båt, billett, bil etc) for å gå tilbake til disse stegene i portalen.

## Kjente bugs
- Med hvordan bilettene har blitt implementert er det noe kluss i fokuset som gjør at man ikke kan bekrefte en billett med mellomrom eller enter, som er manglende tilgjengelighet. Med mer tid hadde jeg satt meg inn i dette, og dessuten startet med en mer grundig dataflow logikk med zod og react-hook-form som nevnt.
- Jeg opplevde problemere med å importere ved hjelp av "@/seksjon/fil", og valgte derfor å bruke relative imports. Jeg ville helst fikset dette problemet gitt at det gjør det enklere å flytte filer.
- Man kan gi tullete parametere til bookingportalen, som /booking?from=Bergen&to=Stavanger&date=hei, og visen rendres fortsatt. Dette ville vert fikset ved ordentlig valideringsverktøy som zod.

TODO:
Legg til måne ved overnattingsbookinger