# Area Clienti Fontel — Frontend Prototype

> Prototipo frontend dell'Area Clienti per Fontel S.p.A., costruito in React + TypeScript con conformità WCAG 2.2 AA.

## 🔗 Live Preview

**👉 [https://fontel-user-haven.lovable.app](https://fontel-user-haven.lovable.app)**

### Come navigare il prototipo

- Il portale si apre sulla **Home** con accesso rapido a tutte le sezioni.
- Per vedere le pagine di **Login e Registrazione**, clicca su **"Esci"** nella sidebar in basso.
- Nella pagina di Login puoi inserire **qualsiasi nome utente e password** per rientrare nel portale.

---

## 🛠 Stack Tecnologico

| Tecnologia | Versione | Scopo |
|---|---|---|
| React | 18.3 | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool e dev server |
| Tailwind CSS | 3.x | Utility-first styling |
| shadcn/ui | latest | Componenti UI base (Radix UI) |
| React Router DOM | 6.30 | Routing SPA |
| Lucide React | 0.462 | Icone SVG |

---

## 📁 Struttura del Progetto

```
src/
├── components/
│   ├── ui/                  # Componenti shadcn/ui (button, dialog, tabs, ecc.)
│   ├── FormError.tsx        # Componente errore form accessibile (role="alert")
│   ├── NavLink.tsx          # Wrapper NavLink con classi attive
│   ├── PortalLayout.tsx     # Layout principale con sidebar + main content
│   └── PortalSidebar.tsx    # Sidebar navigazione con selettore utenze
├── hooks/
│   ├── use-mobile.tsx       # Hook per rilevare viewport mobile
│   └── use-toast.ts         # Hook per notifiche toast
├── lib/
│   └── utils.ts             # Utility (cn per class merging)
├── pages/
│   ├── Login.tsx            # Pagina di accesso
│   ├── Registrazione.tsx    # Pagina di registrazione con password strength
│   ├── HomeAreaClienti.tsx  # Dashboard con avvisi fatture e accessi rapidi
│   ├── ConsultazioneEnergia.tsx  # Tabella fatture energia con filtri
│   ├── ConsultazioneGas.tsx      # Tabella fatture gas
│   ├── Autolettura.tsx      # Form autolettura luce/gas con tab
│   ├── ModificaDati.tsx     # Modifica dati account e password
│   ├── Ticket.tsx           # Sistema ticket con stepper e lista
│   ├── Contatti.tsx         # Contatti + form comunicazioni unificato
│   ├── IdCliente.tsx        # Dati cliente
│   ├── ContrattiVendita.tsx # Contratti di vendita
│   ├── ParentalControl.tsx  # Parental control
│   ├── PlaceholderPage.tsx  # Pagina segnaposto per sezioni future
│   └── NotFound.tsx         # Pagina 404 in italiano
├── index.css                # Design tokens CSS (colori, ombre, tipografia)
├── App.tsx                  # Router principale
└── main.tsx                 # Entry point
```

---

## 🎨 Design System

### Palette colori (token CSS in `index.css`)

| Token | Valore HSL | Uso |
|---|---|---|
| `--primary` | `212 100% 26%` | Blu Fontel — testi, heading, link, sidebar |
| `--secondary` | `72 88% 42%` | Verde Fontel — CTA, accenti, badge |
| `--background` | `0 0% 96%` | Sfondo pagine |
| `--card` | `0 0% 100%` | Sfondo card |
| `--muted-foreground` | `212 30% 40%` | Testi secondari |
| `--status-paid` | `142 72% 40%` | Verde "pagata" |
| `--status-unpaid` | `25 95% 53%` | Arancione "da pagare" |
| `--status-overdue` | `0 84% 60%` | Rosso scaduto |

### Tipografia

- **Heading**: Barlow Semi Condensed (600/700)
- **Body**: Geist Sans (400/500)

### Regole importanti

- ⚠️ **Non usare il verde `#aec90b` come sfondo per testo bianco** — contrasto insufficiente. Usare testo scuro (blu/nero) su sfondo verde.
- Tutti i colori nei componenti devono usare i **token semantici** (`text-primary`, `bg-card`, ecc.), mai colori diretti.

---

## ♿ Accessibilità — WCAG 2.2 AA

Il progetto è stato sviluppato in conformità con i requisiti dell'**European Accessibility Act** (Legge Stanca italiana). Ecco le implementazioni principali:

### Struttura e Semantica
- ✅ `<html lang="it">` — lingua della pagina dichiarata
- ✅ HTML semantico: `<header>`, `<nav>`, `<main>`, `<aside>` con `aria-label`
- ✅ Gerarchia heading corretta: un solo `<h1>` per pagina, `<h2>`-`<h3>` annidati
- ✅ Skip link "Vai al contenuto principale" (visibile al focus con Tab)

### Navigazione
- ✅ Tutti gli elementi interattivi raggiungibili da tastiera
- ✅ Focus visibile con outline blu 2px (`focus-visible`)
- ✅ Tab con attributi ARIA completi (`role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`, `aria-labelledby`)

### Form e Validazione
- ✅ Ogni campo ha `<label>` associata esplicitamente
- ✅ Errori con `role="alert"` per annuncio immediato da screen reader
- ✅ `aria-invalid` + `aria-describedby` per collegare errore al campo
- ✅ Componente `FormError` riutilizzabile in tutti i form
- ✅ Indicatore forza password con `role="img"` + `aria-label` descrittivo

### Contrasto e Colori
- ✅ Rapporto contrasto testi ≥ 4.5:1 (primario blu su bianco = 8.5:1)
- ✅ Informazioni non veicolate solo tramite colore (icone + testo negli stati)
- ✅ Focus outline con contrasto sufficiente

### Contenuti
- ✅ Icone decorative con `aria-hidden="true"`
- ✅ Pulsanti icona con `aria-label` descrittivo
- ✅ Tabelle con `<caption>` (sr-only), `<th scope="col">`
- ✅ Link con scopo chiaro nel contesto
- ✅ Messaggi di successo con `role="status"`

---

## 🗺 Routing

| Path | Pagina | Descrizione |
|---|---|---|
| `/login` | Login | Accesso con account e password |
| `/registrazione` | Registrazione | Registrazione nuovo account |
| `/` | Home | Dashboard con avvisi e accessi rapidi |
| `/consultazione-energia` | Energia | Tabella fatture energia |
| `/consultazione-gas` | Gas | Tabella fatture gas |
| `/autolettura` | Autolettura | Form lettura luce e gas |
| `/modifica-dati` | Modifica Dati | Modifica profilo e password |
| `/ticket` | Ticket | Lista ticket e nuovo ticket (stepper) |
| `/contatti` | Contatti | Recapiti + form contatto |
| `/id-cliente` | ID Cliente | Informazioni cliente |
| `/contratti-vendita` | Contratti | Contratti di vendita |
| `/parental-control` | Parental Control | Gestione parental control |
| `/trattamento-dati` | Trattamento Dati | Placeholder |
| `/diritti-recesso` | Diritti Recesso | Placeholder |
| `/curve-prelievo` | Curve Prelievo | Placeholder |

---

## 🚀 Setup Locale

```bash
# Clona il repository
git clone <url-repository>
cd <nome-progetto>

# Installa le dipendenze
npm install

# Avvia il dev server
npm run dev

# Build di produzione
npm run build
```

Il dev server sarà disponibile su `http://localhost:5173`.

---

## 📋 Note per lo Sviluppatore

### Dati mock
Tutti i dati (fatture, ticket, utenze, dati utente) sono attualmente **mock statici** nei componenti. Vanno sostituiti con chiamate API al backend.

### Autenticazione
Il flusso di login/registrazione è **simulato** — non c'è un backend di autenticazione. Il form accetta qualsiasi credenziale e reindirizza alla home.

### Pagine placeholder
Le pagine `Trattamento dati`, `Diritti di recesso` e `Curve di prelievo` usano un componente `PlaceholderPage` da sostituire con i contenuti reali.

### Integrazione backend
Il progetto è predisposto per integrarsi con API REST. I punti di integrazione principali sono:
- **Login/Registrazione** → autenticazione reale
- **Fatture** → endpoint per lista fatture con paginazione e filtri
- **Autolettura** → endpoint per invio letture
- **Ticket** → CRUD ticket con conversazione
- **Contatti** → endpoint invio messaggi con allegati
- **Profilo** → endpoint modifica dati utente

---

## 📄 Licenza

Progetto proprietario — Fontel S.p.A. Tutti i diritti riservati.
