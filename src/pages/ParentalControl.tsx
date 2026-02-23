import { useState } from "react";
import { ShieldAlert, ShieldCheck, Send, Info } from "lucide-react";

export default function ParentalControl() {
  const [active, setActive] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary">Parental Control</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Gestisci il servizio di controllo parentale sulla tua linea internet.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-start gap-3 mb-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm text-card-foreground leading-relaxed">
            In ottemperanza a quanto previsto dalla Delibera AGCom 9/23/CoNS, Fontel mette a
            disposizione dei propri clienti un sistema di controllo parentale (Parental Control)
            per il servizio di accesso a internet che consente di bloccare contenuti inappropriati
            per i minori o riservati ad un pubblico di età superiore ai 18 anni.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {active ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-status-paid-bg">
                  <ShieldCheck className="h-6 w-6 text-status-paid" aria-hidden="true" />
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <ShieldAlert className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                </div>
              )}
              <div>
                <p className="font-heading text-lg font-semibold text-primary">
                  Attivazione servizio
                </p>
                <p className="text-sm text-muted-foreground">
                  {active ? "Il servizio è attualmente attivo" : "Il servizio non è attivo"}
                </p>
              </div>
            </div>

            {/* Toggle */}
            <button
              role="switch"
              aria-checked={active}
              onClick={() => setActive(!active)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                active ? "bg-status-paid" : "bg-muted-foreground/30"
              }`}
            >
              <span className={`inline-block h-5 w-5 rounded-full bg-card shadow-sm transition-transform ${active ? "translate-x-6" : "translate-x-1"}`} />
              <span className="sr-only">{active ? "Disattiva" : "Attiva"} parental control</span>
            </button>
          </div>
        </div>

        <div className="mt-5">
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground transition-colors hover:bg-fontel-green-hover focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Invia richiesta
          </button>
        </div>
      </div>
    </div>
  );
}
