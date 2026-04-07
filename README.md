# fjordline-booking-app

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Prøblemløsning og valg

### App router vs pages router
Er mest kjent med app router, og valgte det også fordi Nextjs selv anbefaler det for nye prosjekter. Bruker også Nextjs defaults i initiering for å gjøre det enklere å komme i gang.

### Backend
Har selv bare gjort alt i ett prosjekt, og selv om jeg gjerne vil lære å sette opp separat REST-API er ikke det noe jeg tar meg tid til her, men kunne gjort med mer tid. Velger derfor å gjøre alt i ett prosjekt.

### Brukervennlighet
Jeg ønsker å fokusere på å skape en app som er enkel å bruke, og som har et rent og intuitivt design. Den skal også følge tilgjengelighetsstandarder.

## Ruting
- /api/avganger: API rute for å hente avgangsinformasjon
- /: Hovedsiden som viser søkefelt
- /avganger: Siden som viser avgangsinformasjon basert på søkeargumentet

## Eksisterende applikasjon hos Fjord Line
Deres eksisterende applikasjon er moderne, intuitiv og mobil-vennlig, og derfor prøver jeg å ta inspirasjon uten å kopiere den. Disse få tingene er det jeg selv ville forbedret/endret:
- Søkeargumentet er ikke lagret ved refresh, og kan ikke deles via URL, som er noe jeg ville gjort for å gjøre det enklere å dele og gjenbruke søk.


## Ekstra funksjonalitet jeg kanskje legger til:
- Språkstøtte
- Mobil-vennlighet