# Area Login Clienti Fontel — G1 / C1

Pagina di accesso **standalone** per i clienti con codice SIC che inizia con **G1** o **C1**.

> Questa cartella è completamente indipendente dal portale principale. Può essere consegnata da sola e pubblicata su qualsiasi web server senza build.

## Contenuto

```
area-login-clienti-G1-C1/
├── index.html              # Pagina di login
├── assets/
│   ├── fontel-logo.svg     # Logo ufficiale
│   └── styles.css          # Stili (palette + tipografia Fontel)
└── README.md
```

## Come usarla

1. Carica l'intera cartella sul web server (es. `/login/` o radice del dominio).
2. Apri `index.html` nel browser. Nessuna dipendenza, nessun passaggio di build.

## Comportamento

- Form con campi **Account** e **Password**.
- Submit → mostra messaggio inline **"Accesso effettuato con successo."** (nessun redirect: il portale per questa azienda non è incluso).
- Validazione lato client con messaggi accessibili (`role="alert"`, `aria-invalid`, `aria-describedby`).
- Toggle mostra/nascondi password con `aria-label` e `aria-pressed`.

## Conformità

- **WCAG 2.2 AA** / Legge Stanca / European Accessibility Act:
  - `lang="it"`, struttura semantica (`<main>`, `<header>`, `<h1>`, `<label>`).
  - Skip link "Vai al contenuto principale".
  - Contrasti ≥ 4.5:1. Il verde `#aec90b` non è mai usato come sfondo per testo bianco.
  - Focus visibile (outline blu 2px), navigazione completa da tastiera.
  - Messaggi di errore annunciati da screen reader.

## Design System

| Token | Valore | Uso |
|---|---|---|
| Blu Fontel | `#004387` | testi, pulsante primario, focus |
| Verde Fontel | `#aec90b` | accento sul titolo |
| Sfondo | `#f5f5f5` | background pagina |
| Card | `#ffffff` | container form |

Tipografia: **Barlow Semi Condensed** (heading), **Geist** (body) — caricate da Google Fonts.

## Integrazione backend (per lo sviluppatore)

Sostituire il blocco `form.addEventListener('submit', ...)` in `index.html` con la chiamata al proprio endpoint di autenticazione. Mantenere la logica di validazione e i messaggi accessibili esistenti.
