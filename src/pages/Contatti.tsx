import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle, Paperclip, MessageSquare } from "lucide-react";
import { FormError } from "@/components/FormError";

export default function Contatti() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const cat = (form.elements.namedItem("com-category") as HTMLSelectElement).value;
    const oggetto = (form.elements.namedItem("com-oggetto") as HTMLInputElement).value.trim();
    const msg = (form.elements.namedItem("com-message") as HTMLTextAreaElement).value.trim();
    const privacy = (form.elements.namedItem("c-privacy") as HTMLInputElement).checked;

    if (!cat) errs["com-category"] = "Seleziona una categoria.";
    if (!oggetto) errs["com-oggetto"] = "L'oggetto è obbligatorio.";
    if (!msg) errs["com-message"] = "Il messaggio è obbligatorio.";
    else if (msg.length > 2000) errs["com-message"] = "Il messaggio non può superare 2000 caratteri.";
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

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors[field] ? "border-status-unpaid bg-status-unpaid/5" : "border-input bg-background"}`;

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
                  <dd>
                    <a href="tel:800920092" className="font-heading text-lg font-semibold text-primary underline decoration-primary/30 hover:decoration-primary transition-colors">
                      800-920092
                    </a>
                  </dd>
                  <dd className="mt-0.5 text-xs text-muted-foreground">Attivo dal Lunedì al Venerdì dalle 9:00 alle 18:00</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fontel-green-light">
                  <MessageCircle className="h-4 w-4 text-fontel-green" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">WhatsApp</dt>
                  <dd>
                    <a href="https://wa.me/393710132810" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline decoration-primary/30 hover:decoration-primary transition-colors">
                      371.0132810
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fontel-green-light">
                  <Mail className="h-4 w-4 text-fontel-green" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Email</dt>
                  <dd><a href="mailto:fonti@fontel.it" className="text-sm text-primary underline decoration-primary/30 hover:decoration-primary">fonti@fontel.it</a></dd>
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
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fontel-green-light">
              <MessageSquare className="h-5 w-5 text-fontel-green" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-primary">Inviaci un Messaggio</h3>
              <p className="text-xs text-muted-foreground">Compila il modulo per contattarci direttamente.</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="com-category" className="mb-1.5 block text-sm font-medium text-card-foreground">Categoria *</label>
              <select
                id="com-category"
                name="com-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-invalid={!!errors["com-category"]}
                aria-describedby={errors["com-category"] ? "err-com-category" : undefined}
                className={inputClass("com-category")}
              >
                <option value="">Seleziona una categoria</option>
                <option value="fatturazione">Fatturazione</option>
                <option value="contratto">Contratto</option>
                <option value="fornitura">Fornitura</option>
                <option value="pagamenti">Pagamenti</option>
                <option value="altro">Altro</option>
              </select>
              <FormError id="err-com-category" message={errors["com-category"] || ""} />
            </div>

            <div>
              <label htmlFor="com-oggetto" className="mb-1.5 block text-sm font-medium text-card-foreground">Oggetto *</label>
              <input
                id="com-oggetto"
                name="com-oggetto"
                type="text"
                placeholder="Inserisci l'oggetto del messaggio"
                aria-invalid={!!errors["com-oggetto"]}
                aria-describedby={errors["com-oggetto"] ? "err-com-oggetto" : undefined}
                className={inputClass("com-oggetto") + " placeholder:text-muted-foreground/50"}
              />
              <FormError id="err-com-oggetto" message={errors["com-oggetto"] || ""} />
            </div>

            <div>
              <label htmlFor="com-message" className="mb-1.5 block text-sm font-medium text-card-foreground">Messaggio *</label>
              <textarea
                id="com-message"
                name="com-message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Scrivi il tuo messaggio..."
                aria-invalid={!!errors["com-message"]}
                aria-describedby={errors["com-message"] ? "err-com-message" : undefined}
                className={`resize-y ${inputClass("com-message")} placeholder:text-muted-foreground/50`}
              />
              <div className="mt-1 flex items-center justify-between">
                <FormError id="err-com-message" message={errors["com-message"] || ""} />
                <p className="text-xs text-muted-foreground">{message.length}/2000 caratteri</p>
              </div>
            </div>

            <div>
              <label htmlFor="com-attachment" className="mb-1.5 block text-sm font-medium text-card-foreground">Allegato (opzionale)</label>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="com-attachment"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-input bg-background px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Paperclip className="h-4 w-4" aria-hidden="true" />
                  Scegli file
                </label>
                <input id="com-attachment" type="file" className="sr-only" accept=".pdf,.jpg,.png,.doc,.docx" />
                <span className="text-xs text-muted-foreground">PDF, JPG, PNG, DOC (max 5MB)</span>
              </div>
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="c-privacy"
                  aria-invalid={!!errors["c-privacy"]}
                  aria-describedby={errors["c-privacy"] ? "err-c-privacy" : undefined}
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
