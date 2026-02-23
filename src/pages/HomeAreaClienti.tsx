import { Link } from "react-router-dom";
import { Zap, Flame, Gauge, UserCog, TicketCheck, Phone, AlertCircle } from "lucide-react";

const quickActions = [
  { to: "/consultazione-energia", label: "Consultazione Energia", icon: Zap, desc: "Fatture luce" },
  { to: "/consultazione-gas", label: "Consultazione Gas", icon: Flame, desc: "Fatture gas" },
  { to: "/autolettura", label: "Autolettura", icon: Gauge, desc: "Comunica lettura" },
  { to: "/modifica-dati", label: "Modifica Dati", icon: UserCog, desc: "Account" },
  { to: "/ticket", label: "Apri Ticket", icon: TicketCheck, desc: "Segnalazione" },
  { to: "/contatti", label: "Contatti", icon: Phone, desc: "Assistenza" },
];

const alerts = [
  { tipo: "Energia", fattura: "14635", importo: "131,53 €", scadenza: "16/02/2026" },
  { tipo: "Gas", fattura: "17815", importo: "184,09 €", scadenza: "23/02/2026" },
];

export default function HomeAreaClienti() {
  return (
    <div className="space-y-6">
      {/* Unpaid invoices alert */}
      {alerts.length > 0 && (
        <div className="rounded-xl border border-status-unpaid/30 bg-status-unpaid-bg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-status-unpaid" aria-hidden="true" />
            <h3 className="font-heading font-semibold text-status-unpaid">Fatture da pagare</h3>
          </div>
          <div className="space-y-2">
            {alerts.map((a) => (
              <div key={a.fattura} className="flex items-center justify-between rounded-lg bg-card px-4 py-3 text-sm">
                <div>
                  <span className="font-medium text-card-foreground">{a.tipo} - Fattura {a.fattura}</span>
                  <span className="ml-2 text-muted-foreground">Scadenza: {a.scadenza}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-status-unpaid">{a.importo}</span>
                  <button className="rounded-lg bg-status-unpaid px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-status-unpaid/80 focus-visible:outline-2 focus-visible:outline-status-unpaid">
                    Paga ora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 font-heading text-xl font-semibold text-primary">Accesso rapido</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elevated hover:border-fontel-green/50 focus-visible:outline-2 focus-visible:outline-primary"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fontel-green-light transition-colors group-hover:bg-fontel-green/20">
                <action.icon className="h-6 w-6 text-fontel-green" aria-hidden="true" />
              </div>
              <div>
                <p className="font-heading font-semibold text-primary">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
