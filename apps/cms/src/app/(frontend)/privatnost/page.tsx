import type { Metadata } from 'next'
import { LegalPage } from '@/marketing/components/LegalPage'
import { BRAND, LEGAL } from '@/marketing/config'

export const metadata: Metadata = {
  title: 'Politika privatnosti',
  description: `Kako ${BRAND.name} prikuplja i obrađuje osobne podatke, u skladu s GDPR-om.`,
  alternates: { canonical: '/privatnost' },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politika privatnosti"
      intro="Ovdje piše koje osobne podatke prikupljamo, zašto ih prikupljamo, koliko ih čuvamo i koja su vaša prava."
      updated="28. srpnja 2026."
    >
      <h2>1. Voditelj obrade</h2>
      <p>
        Voditelj obrade je <strong>{LEGAL.entity}</strong>, {LEGAL.address}, OIB {LEGAL.oib}. Za sva
        pitanja o zaštiti podataka pišite na <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
      </p>

      <h2>2. Koje podatke prikupljamo</h2>
      <table>
        <thead>
          <tr>
            <th>Podatak</th>
            <th>Svrha</th>
            <th>Pravna osnova</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ime, e-pošta, telefon osobe iz kluba</td>
            <td>Komunikacija, izrada demo stranice, podrška</td>
            <td>Izvršavanje ugovora</td>
          </tr>
          <tr>
            <td>Naziv kluba, adresa, OIB</td>
            <td>Izdavanje računa i vođenje pretplate</td>
            <td>Zakonska obveza</td>
          </tr>
          <tr>
            <td>Podaci o plaćanju</td>
            <td>Naplata pretplate — obrađuje ih Stripe</td>
            <td>Izvršavanje ugovora</td>
          </tr>
          <tr>
            <td>Pristupni podaci za sustav za uređivanje</td>
            <td>Prijava korisnika kluba</td>
            <td>Izvršavanje ugovora</td>
          </tr>
          <tr>
            <td>Tehnički zapisi poslužitelja (IP adresa, vrijeme zahtjeva)</td>
            <td>Sigurnost i otklanjanje kvarova</td>
            <td>Legitimni interes</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Kolačići</h2>
      <p>
        Ova stranica ne koristi kolačiće za oglašavanje ni praćenje između stranica. Kolačić se
        postavlja samo pri prijavi u sustav za uređivanje sadržaja i nužan je za rad prijave.
      </p>

      <h2>4. S kim dijelimo podatke</h2>
      <ul>
        <li>
          <strong>Stripe Payments Europe, Ltd.</strong> — obrada plaćanja.
        </li>
        <li>
          <strong>Pružatelji poslužiteljske infrastrukture i pohrane</strong> — smještaj aplikacije,
          baze i datoteka unutar EU-a.
        </li>
        <li>
          <strong>Nadležna tijela</strong> — samo kada to nalaže zakon.
        </li>
      </ul>
      <p>Podatke ne prodajemo i ne ustupamo trećima za marketinške svrhe.</p>

      <h2>5. Koliko dugo čuvamo podatke</h2>
      <ul>
        <li>Podaci o pretplati i računi: 11 godina, prema poreznim propisima.</li>
        <li>Kontaktni podaci i prepiska: do godine dana nakon prestanka usluge.</li>
        <li>Tehnički zapisi poslužitelja: do 90 dana.</li>
      </ul>

      <h2>6. Vaša prava</h2>
      <p>
        Imate pravo na pristup podacima, ispravak, brisanje, ograničenje obrade, prijenos podataka i
        prigovor na obradu. Zahtjev šaljete na{' '}
        <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>, a odgovor dobivate u roku od 30 dana.
      </p>
      <p>
        Ako smatrate da su vam prava povrijeđena, možete se obratiti Agenciji za zaštitu osobnih
        podataka (AZOP), Selska cesta 136, 10000 Zagreb.
      </p>

      <h2>7. Sigurnost</h2>
      <p>
        Promet je zaštićen SSL certifikatom, pristup podacima ograničen je na nužne osobe, a
        sigurnosne kopije rade se redovito. Nijedna mjera ne jamči apsolutnu sigurnost, ali o svakom
        incidentu koji vas se tiče obavijestit ćemo vas bez odgode.
      </p>

      <h2>8. Podaci koje klub objavljuje</h2>
      <p>
        Za sadržaj koji klub sam objavi na svojoj stranici (fotografije igrača, imena, dokumenti)
        voditelj obrade je klub. Mi u tom dijelu djelujemo kao izvršitelj obrade i podatke koristimo
        isključivo za pružanje usluge.
      </p>
    </LegalPage>
  )
}
