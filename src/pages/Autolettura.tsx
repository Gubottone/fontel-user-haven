import { useState } from "react";
import { Zap, Flame, Send, Info } from "lucide-react";

export default function Autolettura() {
  const [tab, setTab] = useState<"energia" | "gas">("energia");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary">Autolettura</h2>
        <p className="mt-1 text-sm text-muted-foreground">Comunica qui in pochi click la lettura di Luce e Gas.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-card p-1 shadow-card" role="tablist" aria-label="Tipo autolettura">
        <button
          role="tab"
          aria-selected={tab === "energia"}
          onClick={() => setTab("energia")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
            tab === "energia"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-primary"
          }`}
        >
          <Zap className="h-4 w-4" aria-hidden="true" />
          Lettura Luce
        </button>
        <button
          role="tab"
          aria-selected={tab === "gas"}
          onClick={() => setTab("gas")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
            tab === "gas"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-primary"
          }`}
        >
          <Flame className="h-4 w-4" aria-hidden="true" />
          Lettura Gas
        </button>
      </div>

      {/* Info notice */}
      <div className="flex gap-3 rounded-xl border border-fontel-green/30 bg-fontel-green-light p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-fontel-green" aria-hidden="true" />
        <div className="text-sm text-card-foreground">
          <p className="font-semibold">Quando comunicare la lettura?</p>
          <p className="mt-1 text-muted-foreground">
            <strong>Privati:</strong> dal 1 al 10 del mese. <strong>Aziende:</strong> dal 1 al 5 del mese.<br />
            Es. I consumi di Gennaio devono essere comunicati dal 1 al 10 Febbraio.
          </p>
        </div>
      </div>

      {tab === "energia" ? <FormEnergia /> : <FormGas />}
    </div>
  );
}

function FormEnergia() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h3 className="mb-1 font-heading text-lg font-semibold text-primary">Comunica la Lettura della Luce</h3>
      <p className="mb-5 text-sm text-muted-foreground">Clicca il tasto fino a quando visualizzi sul display "Lettura Periodo Precedente" e inserisci i consumi.</p>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="fornitura-e" className="mb-1.5 block text-sm font-medium text-card-foreground">
            Punto di fornitura *
          </label>
          <select
            id="fornitura-e"
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>C0030504 - VICOLO 1° PORTAPICCOLA A MONTECALVARIO 8 NAPOLI (NA)</option>
          </select>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-card-foreground">Valori lettura</legend>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {["A1", "A2", "A3", "R1", "R2", "R3"].map((field) => (
              <div key={field}>
                <label htmlFor={`energia-${field}`} className="mb-1 block text-xs font-medium text-muted-foreground">{field}</label>
                <input
                  type="number"
                  id={`energia-${field}`}
                  placeholder="0"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground transition-colors hover:bg-fontel-green-hover focus-visible:outline-2 focus-visible:outline-primary"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Invia Lettura
        </button>
      </form>
    </div>
  );
}

function FormGas() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-1 font-heading text-lg font-semibold text-primary">Comunica la Lettura del Gas</h3>
        <p className="mb-5 text-sm text-muted-foreground">
          Inserire solo i numeri in nero visibili sul contatore (prima della virgola).
        </p>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="fornitura-g" className="mb-1.5 block text-sm font-medium text-card-foreground">
              Punto di fornitura *
            </label>
            <select
              id="fornitura-g"
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>G0002254 - VICO I PORTA PICCOLA A MONTECALVARIO 8 NAPOLI</option>
            </select>
          </div>

          <div className="max-w-xs">
            <label htmlFor="gas-lettura" className="mb-1 block text-sm font-medium text-card-foreground">Lettura *</label>
            <input
              type="number"
              id="gas-lettura"
              placeholder="0"
              min="0"
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground transition-colors hover:bg-fontel-green-hover focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Invia Lettura
          </button>
        </form>
      </div>

      {/* Tempistiche autolettura gas */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-4">
        <h4 className="font-heading text-base font-semibold text-primary">Quando comunicare la lettura del Gas?</h4>

        <div className="flex gap-3 items-start">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9h1"/><path d="M9 13h1"/><path d="M9 17h1"/></svg>
          </div>
          <p className="text-sm text-card-foreground">
            Le <strong className="text-primary">Aziende</strong> devono comunicare l'autolettura ogni mese dal 28 al 30/31.
          </p>
        </div>

        <div className="flex gap-3 items-start">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>
          </div>
          <div className="text-sm text-card-foreground">
            <p>
              I <strong className="text-primary">Privati</strong> devono inviare l'autolettura a marzo, giugno, settembre e dicembre, dal 25 fine mese corrente al 5 inizio mese successivo.
            </p>
            <p className="mt-1 text-muted-foreground">
              Es. Le letture dei consumi di Gennaio, Febbraio e Marzo vanno inviate dal 25 Marzo al 5 Aprile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
