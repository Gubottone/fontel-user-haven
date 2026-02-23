import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, Send, Upload, CheckCircle2, Eye, Clock, AlertCircle, CheckCircle, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FormError } from "@/components/FormError";

/* ── Mock tickets ── */
const mockTickets = [
  {
    id: "TK-2024-0012",
    oggetto: "Errore importo fattura di Gennaio",
    area: "Amministrativo",
    categoria: "Reclamo",
    priorita: "Alta",
    stato: "aperto",
    data: "18/02/2026",
    ultimoAggiornamento: "20/02/2026",
    messaggi: 3,
  },
  {
    id: "TK-2024-0009",
    oggetto: "Richiesta cambio piano tariffario",
    area: "Commerciale",
    categoria: "Informazioni",
    priorita: "Media",
    stato: "in_lavorazione",
    data: "05/02/2026",
    ultimoAggiornamento: "12/02/2026",
    messaggi: 5,
  },
  {
    id: "TK-2024-0005",
    oggetto: "Guasto contatore luce",
    area: "Tecnico",
    categoria: "Guasto",
    priorita: "Alta",
    stato: "chiuso",
    data: "10/01/2026",
    ultimoAggiornamento: "15/01/2026",
    messaggi: 7,
  },
  {
    id: "TK-2023-0041",
    oggetto: "Voltura contratto gas",
    area: "Amministrativo",
    categoria: "Informazioni",
    priorita: "Bassa",
    stato: "chiuso",
    data: "20/11/2025",
    ultimoAggiornamento: "28/11/2025",
    messaggi: 4,
  },
];

const statoConfig: Record<string, { label: string; icon: React.ElementType; className: string }> = {
  aperto: { label: "Aperto", icon: AlertCircle, className: "bg-status-unpaid/15 text-status-unpaid border-status-unpaid/30" },
  in_lavorazione: { label: "In lavorazione", icon: Clock, className: "bg-amber-500/15 text-amber-600 border-amber-500/30" },
  chiuso: { label: "Chiuso", icon: CheckCircle, className: "bg-status-paid/15 text-status-paid border-status-paid/30" },
};

const prioritaConfig: Record<string, string> = {
  Alta: "bg-status-unpaid/10 text-status-unpaid",
  Media: "bg-amber-500/10 text-amber-600",
  Bassa: "bg-muted text-muted-foreground",
};

/* ── Steps for new ticket ── */
const steps = ["Informazioni Ticket", "Messaggio", "Allega Immagine"];

export default function Ticket() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("nuovo") ? "nuovo" : "lista");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-primary">Ticket</h2>
          <p className="mt-1 text-sm text-muted-foreground">Gestisci le tue segnalazioni o aprine una nuova.</p>
        </div>
        {activeTab === "lista" && (
          <button 
            onClick={() => setActiveTab("nuovo")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground shadow-lg transition-all hover:bg-fontel-green-hover hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="h-5 w-5" />
            Apri Nuovo Ticket
          </button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="sm:w-auto sm:inline-flex">
          <TabsTrigger value="lista">I miei Ticket</TabsTrigger>
        </TabsList>

        <TabsContent value="lista">
          <TicketList />
        </TabsContent>

        <TabsContent value="nuovo">
          <NewTicketForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ══════════════════════════════════════
   TICKET LIST
   ══════════════════════════════════════ */
function TicketList() {
  const [selected, setSelected] = useState<string | null>(null);
  const ticket = selected ? mockTickets.find((t) => t.id === selected) : null;

  if (ticket) {
    return <TicketDetail ticket={ticket} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="space-y-3">
      {mockTickets.map((t) => {
        const stato = statoConfig[t.stato];
        const StatoIcon = stato.icon;
        return (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className="w-full rounded-xl border border-border bg-card p-4 text-left shadow-card transition-colors hover:border-primary/30 hover:bg-muted/40"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">{t.id}</span>
                  <Badge variant="outline" className={`text-[10px] ${prioritaConfig[t.priorita]}`}>
                    {t.priorita}
                  </Badge>
                </div>
                <p className="truncate font-medium text-card-foreground">{t.oggetto}</p>
                <p className="text-xs text-muted-foreground">{t.area} · {t.categoria} · Aperto il {t.data}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${stato.className}`}>
                  <StatoIcon className="h-3 w-3" />
                  {stato.label}
                </span>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════
   TICKET DETAIL
   ══════════════════════════════════════ */
function TicketDetail({ ticket, onBack }: { ticket: (typeof mockTickets)[0]; onBack: () => void }) {
  const stato = statoConfig[ticket.stato];
  const StatoIcon = stato.icon;

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
        <ChevronLeft className="h-4 w-4" /> Torna alla lista
      </button>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">{ticket.id}</p>
            <h3 className="font-heading text-lg font-semibold text-primary">{ticket.oggetto}</h3>
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${stato.className}`}>
            <StatoIcon className="h-3.5 w-3.5" />
            {stato.label}
          </span>
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-3">
          <div><span className="text-muted-foreground">Area:</span> <strong className="text-card-foreground">{ticket.area}</strong></div>
          <div><span className="text-muted-foreground">Categoria:</span> <strong className="text-card-foreground">{ticket.categoria}</strong></div>
          <div><span className="text-muted-foreground">Priorità:</span> <Badge variant="outline" className={`ml-1 text-[10px] ${prioritaConfig[ticket.priorita]}`}>{ticket.priorita}</Badge></div>
          <div><span className="text-muted-foreground">Aperto il:</span> <strong className="text-card-foreground">{ticket.data}</strong></div>
          <div><span className="text-muted-foreground">Ultimo aggiornamento:</span> <strong className="text-card-foreground">{ticket.ultimoAggiornamento}</strong></div>
          <div><span className="text-muted-foreground">Messaggi:</span> <strong className="text-card-foreground">{ticket.messaggi}</strong></div>
        </div>
      </div>

      {/* Fake conversation */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
        <h4 className="font-heading text-sm font-semibold text-primary">Conversazione</h4>
        <div className="space-y-3">
          <div className="rounded-lg bg-primary/5 p-3 text-sm">
            <p className="mb-1 text-xs font-semibold text-primary">Tu · {ticket.data}</p>
            <p className="text-card-foreground">Buongiorno, scrivo per segnalare un problema riguardante: {ticket.oggetto.toLowerCase()}. Attendo un vostro riscontro. Grazie.</p>
          </div>
          <div className="rounded-lg bg-muted p-3 text-sm">
            <p className="mb-1 text-xs font-semibold text-muted-foreground">Operatore · {ticket.ultimoAggiornamento}</p>
            <p className="text-card-foreground">Buongiorno, abbiamo preso in carico la sua segnalazione. Provvederemo a verificare e la aggiorneremo al più presto.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   NEW TICKET FORM (unchanged logic)
   ══════════════════════════════════════ */
function NewTicketForm() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateStep = (currentStep: number): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 0) {
      const area = (document.getElementById("t-area") as HTMLSelectElement)?.value;
      const cat = (document.getElementById("t-cat") as HTMLSelectElement)?.value;
      if (!area) errs["t-area"] = "Seleziona un'area.";
      if (!cat) errs["t-cat"] = "Seleziona una categoria.";
    }

    if (currentStep === 1) {
      const oggetto = (document.getElementById("t-oggetto") as HTMLInputElement)?.value.trim();
      const messaggio = (document.getElementById("t-messaggio") as HTMLTextAreaElement)?.value.trim();
      if (!oggetto) errs["t-oggetto"] = "L'oggetto è obbligatorio.";
      if (!messaggio) errs["t-messaggio"] = "La descrizione è obbligatoria.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmitTicket = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(0);
    }, 3000);
  };

  return (
    <div className="space-y-6">
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
        {step === 0 && <StepInfo errors={errors} />}
        {step === 1 && <StepMessage errors={errors} />}
        {step === 2 && <StepAttach />}

        {submitted && (
          <p role="status" className="mt-4 flex items-center gap-1.5 text-sm font-medium text-status-paid">
            ✓ Ticket inviato con successo!
          </p>
        )}

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
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Avanti
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitTicket}
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

function StepInfo({ errors }: { errors: Record<string, string> }) {
  const inputErrClass = (field: string) =>
    errors[field] ? "border-status-unpaid bg-status-unpaid/5" : "border-input bg-background";

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
          <select id="t-area"
            aria-invalid={!!errors["t-area"]}
            aria-describedby={errors["t-area"] ? "err-t-area" : undefined}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary ${inputErrClass("t-area")}`}>
            <option value="">Seleziona l'area del ticket</option>
            <option value="commerciale">Commerciale</option>
            <option value="tecnico">Tecnico</option>
            <option value="amministrativo">Amministrativo</option>
          </select>
          <FormError id="err-t-area" message={errors["t-area"] || ""} />
        </div>
        <div>
          <label htmlFor="t-cat" className="mb-1.5 block text-sm font-medium text-card-foreground">Categoria ticket *</label>
          <select id="t-cat"
            aria-invalid={!!errors["t-cat"]}
            aria-describedby={errors["t-cat"] ? "err-t-cat" : undefined}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary ${inputErrClass("t-cat")}`}>
            <option value="">Seleziona la categoria</option>
            <option value="info">Informazioni</option>
            <option value="reclamo">Reclamo</option>
            <option value="guasto">Guasto</option>
          </select>
          <FormError id="err-t-cat" message={errors["t-cat"] || ""} />
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

function StepMessage({ errors }: { errors: Record<string, string> }) {
  const inputErrClass = (field: string) =>
    errors[field] ? "border-status-unpaid bg-status-unpaid/5" : "border-input bg-background";

  return (
    <div className="space-y-5">
      <h3 className="font-heading text-lg font-semibold text-primary">2. Messaggio</h3>
      <div>
        <label htmlFor="t-oggetto" className="mb-1.5 block text-sm font-medium text-card-foreground">Oggetto *</label>
        <input id="t-oggetto" type="text" placeholder="Descrivi brevemente il problema"
          aria-invalid={!!errors["t-oggetto"]}
          aria-describedby={errors["t-oggetto"] ? "err-t-oggetto" : undefined}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary ${inputErrClass("t-oggetto")}`} />
        <FormError id="err-t-oggetto" message={errors["t-oggetto"] || ""} />
      </div>
      <div>
        <label htmlFor="t-messaggio" className="mb-1.5 block text-sm font-medium text-card-foreground">Descrizione dettagliata *</label>
        <textarea id="t-messaggio" rows={6} placeholder="Descrivi il problema in dettaglio..."
          aria-invalid={!!errors["t-messaggio"]}
          aria-describedby={errors["t-messaggio"] ? "err-t-messaggio" : undefined}
          className={`w-full resize-y rounded-lg border px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary ${inputErrClass("t-messaggio")}`} />
        <FormError id="err-t-messaggio" message={errors["t-messaggio"] || ""} />
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
