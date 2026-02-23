import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { FormError } from "@/components/FormError";

export default function Contatti() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const nome = (form.elements.namedItem("c-nome") as HTMLInputElement).value.trim();
    const tel = (form.elements.namedItem("c-tel") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("c-email") as HTMLInputElement).value.trim();
    const msg = (form.elements.namedItem("c-msg") as HTMLTextAreaElement).value.trim();
    const privacy = (form.elements.namedItem("c-privacy") as HTMLInputElement).checked;

    if (!nome) errs["c-nome"] = "Il nominativo è obbligatorio.";
    if (!tel) errs["c-tel"] = "Il telefono è obbligatorio.";
    if (!email) errs["c-email"] = "L'email è obbligatoria.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs["c-email"] = "Inserisci un'email valida.";
    if (!msg) errs["c-msg"] = "Il messaggio è obbligatorio.";
    if (!privacy) errs["c-privacy"] = "Devi autorizzare il trattamento dei dati.";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(e.currentTarget);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary">Contatti</h2>
        <p className="mt-1 text-sm text-muted-foreground">Trova i nostri recapiti o inviaci un messaggio.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact info */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h3 className="mb-4 font-heading text-lg font-semibold text-primary">Informazioni di contatto</h3>
            <dl className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fontel-green-light">
                  <Phone className="h-4 w-4 text-fontel-green" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Numero verde</dt>
                  <dd className="font-heading text-lg font-semibold text-primary">800-920092</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fontel-green-light">
                  <MessageCircle className="h-4 w-4 text-fontel-green" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">WhatsApp</dt>
                  <dd className="font-semibold text-primary">371.0132810</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fontel-green-light">
                  <Mail className="h-4 w-4 text-fontel-green" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Email</dt>
                  <dd className="text-sm text-primary">fonti@fontel.it</dd>
                  <dd className="mt-1 text-xs text-muted-foreground">PEC Energia: energia@pec.fontel.it</dd>
                  <dd className="text-xs text-muted-foreground">PEC Gas: grossisti@pec.fontel.it</dd>
                  <dd className="text-xs text-muted-foreground">PEC Crediti: recuperocrediti@pec.fontel.it</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fontel-green-light">
                  <MapPin className="h-4 w-4 text-fontel-green" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Sede</dt>
                  <dd className="text-sm text-card-foreground">Fontel S.p.A.</dd>
                  <dd className="text-xs text-muted-foreground">Centro Direzionale Isola A2, 80143 Napoli</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>

        {/* Contact form */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-heading text-lg font-semibold text-primary">Inviaci un Messaggio</h3>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-nome" className="mb-1.5 block text-sm font-medium text-card-foreground">Nominativo *</label>
                <input id="c-nome" name="c-nome" type="text" defaultValue="Giovanni Taolacci"
                  aria-invalid={!!errors["c-nome"]} aria-describedby={errors["c-nome"] ? "err-c-nome" : undefined}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors["c-nome"] ? "border-status-unpaid bg-status-unpaid/5" : "border-input bg-background"}`} />
                <FormError id="err-c-nome" message={errors["c-nome"] || ""} />
              </div>
              <div>
                <label htmlFor="c-tel" className="mb-1.5 block text-sm font-medium text-card-foreground">Telefono *</label>
                <input id="c-tel" name="c-tel" type="tel" defaultValue="3391581906"
                  aria-invalid={!!errors["c-tel"]} aria-describedby={errors["c-tel"] ? "err-c-tel" : undefined}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors["c-tel"] ? "border-status-unpaid bg-status-unpaid/5" : "border-input bg-background"}`} />
                <FormError id="err-c-tel" message={errors["c-tel"] || ""} />
              </div>
            </div>
            <div>
              <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-card-foreground">Email *</label>
              <input id="c-email" name="c-email" type="email" defaultValue="luca1180@gmail.com"
                aria-invalid={!!errors["c-email"]} aria-describedby={errors["c-email"] ? "err-c-email" : undefined}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors["c-email"] ? "border-status-unpaid bg-status-unpaid/5" : "border-input bg-background"}`} />
              <FormError id="err-c-email" message={errors["c-email"] || ""} />
            </div>
            <div>
              <label htmlFor="c-msg" className="mb-1.5 block text-sm font-medium text-card-foreground">Messaggio *</label>
              <textarea id="c-msg" name="c-msg" rows={5} placeholder="Scrivi il tuo messaggio..."
                aria-invalid={!!errors["c-msg"]} aria-describedby={errors["c-msg"] ? "err-c-msg" : undefined}
                className={`w-full resize-y rounded-lg border px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary ${errors["c-msg"] ? "border-status-unpaid bg-status-unpaid/5" : "border-input bg-background"}`} />
              <FormError id="err-c-msg" message={errors["c-msg"] || ""} />
            </div>
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="c-privacy"
                  aria-invalid={!!errors["c-privacy"]} aria-describedby={errors["c-privacy"] ? "err-c-privacy" : undefined}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-input text-primary accent-primary focus:ring-primary" />
                <span className="text-sm text-card-foreground">
                  Autorizzo al trattamento dei dati – <a href="/trattamento-dati" className="font-semibold text-primary underline hover:no-underline">Leggi l'informativa della privacy</a>
                </span>
              </label>
              <FormError id="err-c-privacy" message={errors["c-privacy"] || ""} />
            </div>

            {submitted && (
              <p role="status" className="flex items-center gap-1.5 text-sm font-medium text-status-paid">
                ✓ Messaggio inviato con successo!
              </p>
            )}

            <button type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground transition-colors hover:bg-fontel-green-hover focus-visible:outline-2 focus-visible:outline-primary">
              <Send className="h-4 w-4" aria-hidden="true" />
              Invia Messaggio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
