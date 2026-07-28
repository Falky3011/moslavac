import type { Metadata } from 'next'
import { LegalPage } from '@/marketing/components/LegalPage'
import { BRAND, LEGAL, PRICING, formatPrice } from '@/marketing/config'

export const metadata: Metadata = {
  title: 'Uvjeti korištenja',
  description: `Uvjeti korištenja usluge ${BRAND.name} — izrada i održavanje web stranica za sportske klubove.`,
  alternates: { canonical: '/uvjeti' },
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Uvjeti korištenja"
      intro={`Ovi uvjeti uređuju odnos između pružatelja usluge ${LEGAL.entity} i kluba koji koristi uslugu ${BRAND.name}.`}
      updated="28. srpnja 2026."
    >
      <h2>1. Pružatelj usluge</h2>
      <p>
        Uslugu pruža <strong>{LEGAL.entity}</strong>, {LEGAL.address}, OIB {LEGAL.oib}, e-pošta{' '}
        <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> (dalje: „Pružatelj").
      </p>

      <h2>2. Opis usluge</h2>
      <p>
        Usluga obuhvaća izradu, objavu i održavanje web stranice sportskog kluba (dalje: „Korisnik")
        te pristup sustavu za uređivanje sadržaja. U održavanje su uključeni:
      </p>
      <ul>
        {PRICING.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        Rezultati, poredak i statistika natjecanja dohvaćaju se iz vanjskih izvora. Pružatelj ne
        odgovara za točnost, potpunost ni dostupnost podataka koje objavljuje treća strana.
      </p>

      <h2>3. Sklapanje ugovora</h2>
      <p>
        Ugovor nastaje kada Korisnik potvrdi ponudu i pokrene pretplatu. Postavljanje stranice ne
        naplaćuje se zasebno, nego ulazi u pretplatu. Naplata pretplate počinje danom objave
        stranice na javnoj adresi.
      </p>

      <h2>4. Cijena i plaćanje</h2>
      <p>
        {PRICING.showPrice
          ? `Cijena održavanja iznosi ${formatPrice(PRICING.monthly)} mjesečno, odnosno ${formatPrice(PRICING.yearly)} godišnje.`
          : `Cijena održavanja utvrđuje se ponudom prije sklapanja ugovora i iskazuje se u eurima (${PRICING.currency}). Ponuda vrijedi za razdoblje navedeno u njoj i ne mijenja se bez pisane obavijesti 30 dana unaprijed.`}{' '}
        {LEGAL.vatRegistered
          ? 'Na cijene se obračunava PDV prema važećim propisima.'
          : 'Pružatelj nije u sustavu PDV-a, pa je ugovorena cijena konačna.'}
      </p>
      <p>
        Plaćanje se obavlja karticom putem pružatelja platnih usluga Stripe. Pretplata se obnavlja
        automatski na kraju svakog razdoblja dok je Korisnik ne otkaže. Podaci o kartici obrađuju se
        isključivo kod Stripea; Pružatelj im nema pristup.
      </p>
      <p>
        Ako naplata ne uspije, Pružatelj obavještava Korisnika e-poštom. Ako plaćanje izostane 14
        dana od dospijeća, usluga se može privremeno obustaviti.
      </p>

      <h2>5. Obveze Korisnika</h2>
      <ul>
        <li>Dostaviti točne podatke o klubu i osobi ovlaštenoj za zastupanje.</li>
        <li>
          Osigurati da ima pravo objaviti sadržaj koji unosi (fotografije, tekstove, grb, logotipe
          sponzora).
        </li>
        <li>Čuvati pristupne podatke za sustav za uređivanje i ne dijeliti ih s trećima.</li>
        <li>
          Ne objavljivati sadržaj koji je protuzakonit, uvredljiv ili krši tuđa autorska prava.
        </li>
      </ul>

      <h2>6. Vlasništvo nad sadržajem</h2>
      <p>
        Sadržaj koji Korisnik unese (tekstovi, fotografije, dokumenti, grb) ostaje u vlasništvu
        Korisnika. Korisnik Pružatelju daje pravo objave tog sadržaja na stranici kluba za vrijeme
        trajanja ugovora. Programski kod, dizajn i platforma ostaju vlasništvo Pružatelja.
      </p>
      <p>
        Pružatelj smije navesti ime kluba i poveznicu na stranicu kao referencu, osim ako Korisnik
        to pisano odbije.
      </p>

      <h2>7. Domena</h2>
      <p>
        Domena se može voditi na Korisnika ili na Pružatelja, prema dogovoru. Ako je registrirana na
        Pružatelja, Korisnik u svakom trenutku može zatražiti prijenos na sebe.
      </p>

      <h2>8. Dostupnost i odgovornost</h2>
      <p>
        Pružatelj ulaže razumne napore da stranica bude dostupna neprekidno, ali ne jamči rad bez
        prekida. Planirani radovi najavljuju se unaprijed kad je to izvedivo.
      </p>
      <p>
        Odgovornost Pružatelja ograničena je na iznos koji je Korisnik platio u posljednjih dvanaest
        mjeseci. Pružatelj ne odgovara za izmaklu dobit ni neizravnu štetu.
      </p>

      <h2>9. Trajanje i raskid</h2>
      <p>
        Ugovor je sklopljen na neodređeno vrijeme. Obje strane mogu ga raskinuti u svakom trenutku;
        detalji su u <a href="/otkazivanje">pravilima otkazivanja i povrata</a>.
      </p>

      <h2>10. Izmjene uvjeta</h2>
      <p>
        Pružatelj može izmijeniti ove uvjete. O bitnim izmjenama Korisnik se obavještava e-poštom
        najmanje 30 dana unaprijed. Nastavak korištenja usluge nakon toga znači prihvat izmjena.
      </p>

      <h2>11. Mjerodavno pravo</h2>
      <p>
        Primjenjuje se pravo Republike Hrvatske. Sporove strane rješavaju dogovorom, a ako to nije
        moguće, nadležan je stvarno nadležni sud u Zagrebu.
      </p>

      <h2>12. Kontakt</h2>
      <p>
        Pitanja o ovim uvjetima šaljite na <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
      </p>
    </LegalPage>
  )
}
