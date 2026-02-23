import { useState } from "react";
import { Link2, CheckCircle2 } from "lucide-react";
import { FormError } from "@/components/FormError";

const pdAbbinati = [
  { pd: "IT001E00012345", tipo: "Energia", indirizzo: "Via Roma 12, Milano", stato: "attivo" },
  { pd: "IT003P00067890", tipo: "Gas", indirizzo: "Via Roma 12, Milano", stato: "attivo" },
];

export default function IdCliente() {
  const [cf, setCf] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleAbbina = () => {
    if (!cf.trim()) {
      setError("Inserisci il Codice Fiscale o la P.IVA.");
      return;
    }
    if (cf.trim().length < 11) {
      setError("Il Codice Fiscale deve avere almeno 16 caratteri o la P.IVA 11 caratteri.");
      return;
    }
    setError("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary">ID Cliente</h2>
        <p className="mt-1 text-sm text-muted-foreground">Gestisci il tuo ID Cliente e abbina i punti di fornitura.</p>
      </div>

      {/* PD già abbinati */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
        <h3 className="font-heading text-lg font-semibold text-primary">Punti di Fornitura abbinati</h3>
        {pdAbbinati.length > 0 ? (
          <div className="space-y-3">
            {pdAbbinati.map((pd) => (
              <div key={pd.pd} className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-card-foreground">{pd.pd}</p>
                  <p className="text-xs text-muted-foreground">{pd.tipo} · {pd.indirizzo}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-status-paid/15 px-2.5 py-1 text-xs font-semibold text-status-paid">
                  <CheckCircle2 className="h-3 w-3" />
                  Attivo
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nessun punto di fornitura abbinato.</p>
        )}
      </div>

      {/* Form Abbina Account */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-5">
        <h3 className="font-heading text-lg font-semibold text-primary">Abbina Account con PD Fornitura</h3>
        <p className="text-sm text-muted-foreground">Inserisci i dati per abbinare un nuovo punto di fornitura al tuo account.</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="id-cliente" className="mb-1.5 block text-sm font-medium text-card-foreground">ID Cliente</label>
            <input
              id="id-cliente"
              type="text"
              defaultValue="9504"
              readOnly
              className="w-full rounded-lg border border-input bg-muted px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="cf-piva" className="mb-1.5 block text-sm font-medium text-card-foreground">Codice Fiscale / P.IVA *</label>
            <input
              id="cf-piva"
              type="text"
              value={cf}
              onChange={(e) => { setCf(e.target.value); if (error) setError(""); }}
              placeholder="Inserisci CF o P.IVA"
              aria-invalid={!!error}
              aria-describedby={error ? "err-cf" : undefined}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary ${error ? "border-status-unpaid bg-status-unpaid/5" : "border-input bg-background"}`}
            />
            <FormError id="err-cf" message={error} />
          </div>
        </div>

        {submitted && (
          <p role="status" className="flex items-center gap-1.5 text-sm font-medium text-status-paid">
            <CheckCircle2 className="h-4 w-4" />
            Richiesta di abbinamento inviata con successo!
          </p>
        )}

        <button
          onClick={handleAbbina}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Link2 className="h-4 w-4" />
          Abbina Account
        </button>
      </div>
    </div>
  );
}
