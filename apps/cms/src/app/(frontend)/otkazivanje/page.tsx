import type { Metadata } from 'next'
import { LegalPage } from '@/marketing/components/LegalPage'
import { BRAND, LEGAL, PRICING, formatPrice } from '@/marketing/config'

export const metadata: Metadata = {
  title: 'Otkazivanje i povrat',
  description: `Kako otkazati pretplatu na ${BRAND.name}, što se događa sa stranicom i kada se odobrava povrat novca.`,
  alternates: { canonical: '/otkazivanje' },
}

export default function CancellationPage() {
  return (
    <LegalPage
      title="Otkazivanje i povrat"
      intro="Pretplata nema ugovornu obvezu ni naknadu za otkazivanje. Ovdje piše kako se otkazuje i u kojim slučajevima vraćamo novac."
      updated="28. srpnja 2026."
    >
      <h2>1. Kako otkazati</h2>
      <p>
        Pošaljite poruku s naziva kluba na <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> s
        naznakom da otkazujete pretplatu. Otkazivanje potvrđujemo e-poštom u roku od dva radna dana.
        Nije potreban razlog, obrazac ni otkazni rok.
      </p>

      <h2>2. Što se događa nakon otkazivanja</h2>
      <ul>
        <li>Stranica ostaje uživo do kraja već plaćenog razdoblja.</li>
        <li>Nakon isteka razdoblja stranica se gasi, a pretplata se više ne obnavlja.</li>
        <li>
          Sadržaj kluba (tekstovi, fotografije, dokumenti) izvozimo vam na zahtjev unutar 30 dana od
          isteka.
        </li>
        <li>Ako je domena vaša, ostaje vaša. Ako je vodimo mi, prenosimo je na vas bez naknade.</li>
      </ul>

      <h2>3. Povrat novca</h2>
      <table>
        <thead>
          <tr>
            <th>Situacija</th>
            <th>Povrat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Otkazivanje unutar {PRICING.trialDays} dana od prve naplate</td>
            <td>Pun povrat prve uplate</td>
          </tr>
          <tr>
            <td>Otkazivanje mjesečne pretplate nakon tog roka</td>
            <td>Bez povrata za tekući mjesec; usluga traje do kraja razdoblja</td>
          </tr>
          <tr>
            <td>Otkazivanje godišnje pretplate</td>
            <td>Razmjerni povrat za pune neiskorištene mjesece</td>
          </tr>
          <tr>
            <td>Stranica nije dostupna dulje od 72 sata našom krivnjom</td>
            <td>Razmjerni povrat za dane nedostupnosti</td>
          </tr>
          <tr>
            <td>Pogrešna ili dvostruka naplata</td>
            <td>Pun povrat pogrešno naplaćenog iznosa</td>
          </tr>
        </tbody>
      </table>
      <p>
        Povrat se izvršava na istu karticu s koje je plaćeno, u roku od 14 dana od odobrenja
        zahtjeva. Trošak povrata snosimo mi.
      </p>

      <h2>4. Odustajanje prije objave</h2>
      <p>
        Do objave stranice ne postoji obveza plaćanja, pa nema ni povrata. Demo stranicu možete
        pogledati i odbiti bez ikakvog troška.
      </p>

      <h2>5. Kada mi možemo prekinuti uslugu</h2>
      <p>
        Uslugu možemo prekinuti ako plaćanje izostane dulje od 14 dana od dospijeća ili ako se preko
        stranice objavljuje protuzakonit sadržaj. U oba slučaja klub prethodno obavještavamo
        e-poštom i ostavljamo rok za ispravak.
      </p>

      <h2>6. Prigovor</h2>
      <p>
        Prigovor na naplatu ili uslugu šaljete na{' '}
        <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. Odgovor dostavljamo pisanim putem u
        roku od 15 dana od primitka prigovora.
      </p>
    </LegalPage>
  )
}
