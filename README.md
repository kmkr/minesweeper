# Minesveiper

Mål: Finn de trygge rutene og unngå å tråkke på miner.

## Oppgaver

1. Tegn opp et rutenett med fast størrelse.
1. Bak hver rute kan det være en mine. La applikasjonen sette ut miner - uten å avsløre hvilke ruter som skjuler en mine. Foreløpig kan antall miner være fohåndsbestemt.
    * Velg selv om minene skal legges på forhåndsbestemte ruter eller om det skal være tilfeldig hvor de legges ut.
1. Hver rute i rutenettet skal kunne trykkes på.
   * Dersom ruta man trykker på skjuler en mine er spillet over. Vis i så fall hva som ligger bak alle rutene.
   * Tell ellers opp hvor mange naboruter som inneholder ei mine, og vis dette tallet i ruta som ble trykket på.
   * **Valgfritt:** La brukeren slippe å trykke på alle naborutene i det tilfellet ingen naboruter inneholder miner.

### Ekstra

1. Gjør størrelsen på rutenettet konfigurerbart fra grensesnittet.
1. Gjør antall miner konfigurerbart fra grensesnittet.
1. Gi mulighet for å markere/flagge trygge ruter med et høyreklikk.
1. Implementer en tidsteller som starter ved første trykk og stopper når spillet er over.
1. Tegn opp brettet med HTML5-Canvas i stedet for HTML-tags.

## Forslag til konfigureringsverdier

* Lett: 81 ruter, 10 miner
* Middels: 256 ruter, 40 miner
* Vanskelig: 480 ruter, 99 miner
