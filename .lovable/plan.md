## Obiettivo
Creare un secondo login standalone per l'azienda B (codici SIC G1/C1), consegnabile come cartella separata all'interno della stessa repo.

## Struttura

```
/area-login-clienti-G1-C1/
  index.html
  README.md
  assets/
    fontel-logo.svg
    styles.css
```

Pagina HTML statica autonoma (no React, no build). Replica fedele del design del Login attuale ma:
- Sottotitolo: "Codice SIC che inizia con G1 o con C1"
- Submit → mostra messaggio di conferma inline ("Accesso effettuato con successo.") con `role="status"`. Nessun redirect, nessun portale.
- Stessi colori, font, struttura semantica, validazione accessibile (WCAG 2.2 AA): label esplicite, `aria-invalid`, `aria-describedby`, focus visibile, skip link non necessario (pagina singola), contrasti conformi.
- Logo SVG copiato in `assets/`.
- Toggle mostra/nascondi password con `aria-label`.
- Font Barlow Semi Condensed + Geist caricati via @fontsource CDN-free? In statico useremo Google Fonts `<link>` (consentito in HTML statico fuori dal progetto React).

## File del progetto principale
Nessuna modifica al portale React esistente né alla pagina `/login` attuale (resta G0/C0 per azienda A).

## README della cartella B
Breve nota per lo sviluppatore: pagina HTML standalone, basta aprirla/servirla. Nessuna dipendenza, nessun build step.

## Consegna
Tu mandi all'azienda A l'intera repo (portale + login G0/C0). All'azienda B mandi solo la cartella `area-login-clienti-G1-C1/`.