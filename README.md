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
- /departures: Siden som viser avgangsinformasjon basert på søkeargumentet
- /checkout: Siden for å fullføre bestilling gitt søkeparameterne
- /api/departures: API rute for å hente avgangsinformasjon basert på søkeargumentet

### Søkeparametere
Jeg bruker URL-søkeparametere for å lagre søkeargumentene, som gjør det mulig å enkelt dele og gjenbruke søk.

### Data
Jeg valgte å bruke ID som inkludererer "IN" eller "UT" for å enkelt skille mellom innenriks og utenlands. Jeg satt "ticket" opp slik at ulike typer kan defineres og skilles mellom. Det er også en parameter for "cabinRequired" for å indikere at en avgang krever kabin, for å vise utvidingsmulighet for funksjonalitet.

## Ekstra funksjonalitet jeg kanskje legger til:
- Språkstøtte
- Dark mode