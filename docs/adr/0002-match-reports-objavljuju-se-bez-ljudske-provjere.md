---
Status: accepted
---

# MatchReport se objavljuje bez ljudske provjere

Klub želi da se izvještaji s utakmica objavljuju sami, bez da itko išta klikne.
Zato MatchReport ide izravno u objavu — nema skice, nema pregleda prije nego tekst
osvane na javnom webu. Posljedica je da provjera točnosti mora živjeti u kodu, jer
u procesu nema čovjeka koji bi grešku uhvatio.

## Razmotrene opcije

- **Skica pa ručna objava.** Odbačeno: klub bi svejedno morao svaki put ući u admin,
  a to je isti trud kao pisati tekst. Automatizacija koja traži klik nije automatizacija.
- **Samo šablona, bez modela.** Odbačeno kao jedina opcija, zadržano kao rezerva.
  Šablona je točna ali kruta; model piše prirodnije. Šablona ostaje zadani pisac na
  koji se pada kad provjera padne.

## Posljedice

- **MatchReportWriter je šav s dva adaptera.** Model piše, šablona je rezerva.
  Zamjena modela (ili davatelja) je nova datoteka koja zadovoljava isto sučelje.
- **Tekst se provjerava prije spremanja.** Rezultat i minute iz teksta moraju se
  poklapati s MatchFacts. Ako se ne poklapaju, objavljuje se šablonski tekst.
  Model nikad ne odlučuje što je istina — samo kako je izreći.
- **Model ne smije komentirati.** Bez ocjena igre, bez objašnjenja poraza, bez
  navijačkih fraza. Sve što nije u MatchFacts je izmišljotina, a nema urednika
  koji bi je uklonio.
- **Naslov piše šablona, ne model.** Naslov ide u SEO i na naslovnicu, pa je
  najizloženiji dio teksta; od modela nema što dobiti.
- **Duplikat se sprječava kroz `sourceMatchId` na News.** Svjesno ne rješavamo
  slučaj u kojem HNS naknadno ispravi podatke — pretpostavljamo da su točni.
