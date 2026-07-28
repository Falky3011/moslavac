/**
 * Sve što se mijenja bez diranja dizajna: ime, domena, cijena, pravni podaci.
 *
 * Stripe pri verifikaciji poslovanja traži da su na javnom URL-u vidljivi:
 * opis usluge, cijena, kontakt, uvjeti korištenja i pravila otkazivanja.
 * Zato su ti podaci ovdje na jednom mjestu — dopuni ih prije slanja Stripeu.
 */

export const BRAND = {
  name: 'MojKlub',
  tagline: 'Web stranica za sportske klubove',
  domain: 'mojklub.hr',
  /** Bez završne kose crte. Na Vercelu prepiši preko NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mojklub.hr',
} as const

/** TODO: dopuni prije Stripe verifikacije. */
export const LEGAL = {
  entity: 'Adriano Faletar, obrt za usluge', // TODO
  address: 'Ulica i broj, 10000 Zagreb', // TODO
  oib: '00000000000', // TODO
  email: 'kontakt@mojklub.hr', // TODO
  phone: '+385 91 000 0000', // TODO
  /** Prikazuje se u uvjetima; paušalni obrt nije u sustavu PDV-a. */
  vatRegistered: false,
} as const

export const PRICING = {
  /**
   * Stripe ne traži da iznos bude javan — traži samo jasnu valutu, opis usluge,
   * kontakt i pravila otkazivanja. Postavi na `true` ako ipak želiš iznos na
   * stranici; sve sekcije se same prilagode.
   */
  showPrice: false,
  monthly: 50,
  yearly: 500,
  currency: 'EUR',
  trialDays: 30,
  includes: [
    'Izrada i dizajn stranice s grbom i bojama kluba',
    'Automatski rezultati, tablica, raspored i strijelci',
    'Hosting, domena, SSL certifikat i sigurnosne kopije',
    'Pristup CMS-u za novosti, galeriju i dokumente',
    'Ažuriranja, popravci i podrška e-poštom',
  ],
} as const

/**
 * Klubovi koji već koriste platformu — referencije na naslovnici.
 * `image` je snimka naslovnice iz `public/klubovi/`.
 */
export const CLUBS = [
  {
    name: 'HNK Sloga Mravince',
    url: 'https://www.hnkslogamravince.com',
    image: '/klubovi/sloga-mravince.webp',
  },
  {
    name: 'SNK Moslavac',
    url: 'https://snk-moslavac.hr',
    image: '/klubovi/snk-moslavac.webp',
  },
] as const

/**
 * Obrazac za upit. Preporuka je Tally (besplatno, neograničen broj odgovora)
 * ili Typeform (besplatni plan: 10 odgovora mjesečno).
 *
 * Kad napraviš obrazac, zalijepi ovdje adresu za ugradnju:
 *   Tally    → https://tally.so/embed/<id>?transparentBackground=1
 *   Typeform → https://form.typeform.com/to/<id>
 *
 * Dok je `embedUrl` prazan, stranica prikazuje kontakt e-poštom.
 */
export const DEMO_FORM = {
  embedUrl: '',
  height: 620,
} as const

export const NAV = [
  { label: 'Što dobivate', href: '/#znacajke' },
  { label: 'Kako radi', href: '/#kako-radi' },
  { label: 'Klubovi', href: '/#klubovi' },
  { label: 'Uključeno', href: '/#ukljuceno' },
  { label: 'Pitanja', href: '/#pitanja' },
] as const

/** Payload admin je ujedno prijava za klub — ista domena, ruta /admin. */
export const ADMIN_PATH = '/admin'

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: PRICING.currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
