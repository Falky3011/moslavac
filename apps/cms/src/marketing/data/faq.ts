export type FaqItem = { question: string; answer: string }

export const FAQ: FaqItem[] = [
  {
    question: 'Tko unosi rezultate i tablicu?',
    answer:
      'Nitko iz kluba. Rezultati, poredak, raspored i strijelci dohvaćaju se automatski iz službenog izvora natjecanja i osvježavaju se sami. Klub po želji unosi samo novosti, slike i dokumente.',
  },
  {
    question: 'Moramo li znati raditi s web stranicama?',
    answer:
      'Ne. Za novosti i galeriju postoji jednostavan uređivač u koji se prijavljujete e-poštom i lozinkom. Ako ni to ne želite, stranica radi i bez ijednog vašeg unosa.',
  },
  {
    question: 'Koliko traje izrada?',
    answer:
      'Demo s grbom i bojama kluba obično je gotov u nekoliko dana. Objava uživo ovisi o tome koliko brzo dobijemo domenu i sadržaj o klubu.',
  },
  {
    question: 'Postoji li zaseban trošak postavljanja?',
    answer:
      'Ne. Platforma je zajednička za sve klubove, pa je postavljanje nove stranice brzo i ulazi u mjesečnu pretplatu. Nema jednokratne naknade na početku.',
  },
  {
    question: 'Čija je domena i sadržaj?',
    answer:
      'Klubovi. Domena se vodi na klub ako je klub kupi, a sve fotografije, tekstovi i dokumenti ostaju vlasništvo kluba. Na zahtjev vam izvozimo sadržaj.',
  },
  {
    question: 'Što se događa ako otkažemo pretplatu?',
    answer:
      'Stranica radi do kraja plaćenog razdoblja. Nakon toga se gasi, a sadržaj vam na zahtjev izvozimo. Nema naknade za otkazivanje.',
  },
  {
    question: 'Možemo li dobiti webshop ili prodaju ulaznica?',
    answer:
      'To nije dio osnovne pretplate. Javite se s konkretnom potrebom pa ćemo procijeniti je li izvedivo i po kojoj cijeni.',
  },
  {
    question: 'Radi li ovo i za druge sportove?',
    answer:
      'Da, ako natjecanje ima izvor podataka koji možemo dohvatiti. Bez toga se rezultati unose ručno kroz uređivač, a sve ostalo radi jednako.',
  },
]
