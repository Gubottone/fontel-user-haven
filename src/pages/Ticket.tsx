import { useState } from "react";
import { ChevronRight, ChevronLeft, Send, Upload, CheckCircle2 } from "lucide-react";

const steps = ["Informazioni Ticket", "Messaggio", "Allega Immagine"];

export default function Ticket() {
  const [step, setStep] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary">Apri un nuovo Ticket</h2>
        <p className="mt-1 text-sm text-muted-foreground">Compila i dati per aprire una segnalazione.</p>
      </div>

      {/* Stepper */}
      <nav aria-label="Avanzamento ticket" className="rounded-xl border border-border bg-card p-4 shadow-card">
        <ol className="flex items-center gap-2" role="list">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`hidden text-xs font-medium sm:inline ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
                {s}
              </span>
              {i < steps.length - 1 && <div className={`ml-auto h-px flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </li>
          ))}
        </ol>
      </nav>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        {step === 0 && <StepInfo />}
        {step === 1 && <StepMessage />}
        {step === 2 && <StepAttach />}

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <button
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-2 rounded-lg border border-input px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Indietro
          </button>
          {step < 2 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Avanti
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground transition-colors hover:bg-fontel-green-hover"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Invia Ticket
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepInfo() {
  return (
    <div className="space-y-5">
      <h3 className="font-heading text-lg font-semibold text-primary">1. Informazioni Ticket</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="t-codice" className="mb-1.5 block text-sm font-medium text-card-foreground">Codice cliente</label>
          <input id="t-codice" type="text" defaultValue="9504" readOnly className="w-full rounded-lg border border-input bg-muted px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed" />
        </div>
        <div>
          <label htmlFor="t-email" className="mb-1.5 block text-sm font-medium text-card-foreground">Email cliente</label>
          <input id="t-email" type="email" defaultValue="luca1180@gmail.com" readOnly className="w-full rounded-lg border border-input bg-muted px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed" />
        </div>
        <div>
          <label htmlFor="t-telefono" className="mb-1.5 block text-sm font-medium text-card-foreground">Telefono</label>
          <input id="t-telefono" type="tel" defaultValue="3391581906" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="t-tipo" className="mb-1.5 block text-sm font-medium text-card-foreground">Tipologia ticket</label>
          <input id="t-tipo" type="text" defaultValue="Ticket inserito da web" readOnly className="w-full rounded-lg border border-input bg-muted px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed" />
        </div>
        <div>
          <label htmlFor="t-area" className="mb-1.5 block text-sm font-medium text-card-foreground">Area ticket *</label>
          <select id="t-area" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary" required>
            <option value="">Seleziona l'area del ticket</option>
            <option value="commerciale">Commerciale</option>
            <option value="tecnico">Tecnico</option>
            <option value="amministrativo">Amministrativo</option>
          </select>
        </div>
        <div>
          <label htmlFor="t-cat" className="mb-1.5 block text-sm font-medium text-card-foreground">Categoria ticket *</label>
          <select id="t-cat" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary" required>
            <option value="">Seleziona la categoria</option>
            <option value="info">Informazioni</option>
            <option value="reclamo">Reclamo</option>
            <option value="guasto">Guasto</option>
          </select>
        </div>
        <div>
          <label htmlFor="t-priorita" className="mb-1.5 block text-sm font-medium text-card-foreground">Priorità</label>
          <select id="t-priorita" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="bassa">Bassa</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function StepMessage() {
  return (
    <div className="space-y-5">
      <h3 className="font-heading text-lg font-semibold text-primary">2. Messaggio</h3>
      <div>
        <label htmlFor="t-oggetto" className="mb-1.5 block text-sm font-medium text-card-foreground">Oggetto *</label>
        <input id="t-oggetto" type="text" placeholder="Descrivi brevemente il problema" required
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label htmlFor="t-messaggio" className="mb-1.5 block text-sm font-medium text-card-foreground">Descrizione dettagliata *</label>
        <textarea id="t-messaggio" rows={6} placeholder="Descrivi il problema in dettaglio..." required
          className="w-full resize-y rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
    </div>
  );
}

function StepAttach() {
  return (
    <div className="space-y-5">
      <h3 className="font-heading text-lg font-semibold text-primary">3. Allega Immagine</h3>
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-input p-12 text-center transition-colors hover:border-primary">
        <Upload className="mb-3 h-10 w-10 text-muted-foreground" aria-hidden="true" />
        <p className="mb-1 text-sm font-medium text-card-foreground">Trascina un file qui oppure</p>
        <label htmlFor="t-file" className="cursor-pointer text-sm font-semibold text-primary underline hover:no-underline">
          seleziona dal computer
        </label>
        <input id="t-file" type="file" className="sr-only" accept="image/*,.pdf" />
        <p className="mt-2 text-xs text-muted-foreground">JPG, PNG o PDF (max 10MB)</p>
      </div>
    </div>
  );
}
