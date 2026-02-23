import { Save, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FormError } from "@/components/FormError";

export default function ModificaDati() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdConfirm, setShowPwdConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const nome = (form.elements.namedItem("nome") as HTMLInputElement).value.trim();
    const cognome = (form.elements.namedItem("cognome") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const telefono = (form.elements.namedItem("telefono") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const passwordConfirm = (form.elements.namedItem("password-confirm") as HTMLInputElement).value;
    const privacy = (form.elements.namedItem("privacy-info") as HTMLInputElement).checked;

    if (!nome) errs.nome = "Il nome è obbligatorio.";
    if (!cognome) errs.cognome = "Il cognome è obbligatorio.";
    if (!email) errs.email = "L'email è obbligatoria.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Inserisci un'email valida.";
    if (!telefono) errs.telefono = "Il telefono è obbligatorio.";
    if (password && password.length < 8) errs.password = "La password deve avere almeno 8 caratteri.";
    if (password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) errs.password = "Serve almeno una maiuscola, una minuscola e un numero.";
    if (password && password !== passwordConfirm) errs["password-confirm"] = "Le password non corrispondono.";
    if (!privacy) errs["privacy-info"] = "Devi accettare l'informativa sulla privacy.";
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
        <h2 className="font-heading text-2xl font-semibold text-primary">Modifica Dati Account</h2>
        <p className="mt-1 text-sm text-muted-foreground">Aggiorna le tue informazioni personali e la password.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-5 font-heading text-lg font-semibold text-primary">Dati personali</h3>
          <p className="mb-4 text-xs text-muted-foreground">I campi contrassegnati con * sono obbligatori.</p>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-card-foreground">Nome *</label>
              <input id="nome" name="nome" type="text" defaultValue="Giovanni"
                aria-invalid={!!errors.nome} aria-describedby={errors.nome ? "err-nome" : undefined}
                className={inputClass("nome")} />
              <FormError id="err-nome" message={errors.nome || ""} />
            </div>
            <div>
              <label htmlFor="cognome" className="mb-1.5 block text-sm font-medium text-card-foreground">Cognome *</label>
              <input id="cognome" name="cognome" type="text" defaultValue="Taolacci"
                aria-invalid={!!errors.cognome} aria-describedby={errors.cognome ? "err-cognome" : undefined}
                className={inputClass("cognome")} />
              <FormError id="err-cognome" message={errors.cognome || ""} />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-card-foreground">Email *</label>
              <input id="email" name="email" type="email" defaultValue="luca1180@gmail.com"
                aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined}
                className={inputClass("email")} />
              <FormError id="err-email" message={errors.email || ""} />
            </div>
            <div>
              <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium text-card-foreground">Telefono *</label>
              <input id="telefono" name="telefono" type="tel" defaultValue="3391581906"
                aria-invalid={!!errors.telefono} aria-describedby={errors.telefono ? "err-telefono" : undefined}
                className={inputClass("telefono")} />
              <FormError id="err-telefono" message={errors.telefono || ""} />
            </div>
            <div>
              <label htmlFor="cellulare" className="mb-1.5 block text-sm font-medium text-card-foreground">Cellulare</label>
              <input id="cellulare" name="cellulare" type="tel"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="idcliente" className="mb-1.5 block text-sm font-medium text-card-foreground">ID Cliente</label>
              <input id="idcliente" type="text" defaultValue="9504" readOnly
                className="w-full rounded-lg border border-input bg-muted px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-5 font-heading text-lg font-semibold text-primary">Modifica password</h3>
          <p className="mb-4 text-xs text-muted-foreground">Almeno 8 caratteri, un carattere maiuscolo, una minuscola e un numero.</p>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="relative">
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-card-foreground">Password *</label>
              <input id="password" name="password" type={showPwd ? "text" : "password"}
                aria-invalid={!!errors.password} aria-describedby={errors.password ? "err-password" : undefined}
                className={`${inputClass("password")} pr-12`} />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute bottom-2.5 right-3 text-muted-foreground hover:text-primary"
                aria-label={showPwd ? "Nascondi password" : "Mostra password"}>
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <FormError id="err-password" message={errors.password || ""} />
            </div>
            <div className="relative">
              <label htmlFor="password-confirm" className="mb-1.5 block text-sm font-medium text-card-foreground">Conferma password *</label>
              <input id="password-confirm" name="password-confirm" type={showPwdConfirm ? "text" : "password"}
                aria-invalid={!!errors["password-confirm"]} aria-describedby={errors["password-confirm"] ? "err-password-confirm" : undefined}
                className={`${inputClass("password-confirm")} pr-12`} />
              <button type="button" onClick={() => setShowPwdConfirm(!showPwdConfirm)}
                className="absolute bottom-2.5 right-3 text-muted-foreground hover:text-primary"
                aria-label={showPwdConfirm ? "Nascondi password" : "Mostra password"}>
                {showPwdConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <FormError id="err-password-confirm" message={errors["password-confirm"] || ""} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
          <h3 className="mb-1 font-heading text-lg font-semibold text-primary">Trattamento dati personali</h3>
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="privacy-info"
                aria-invalid={!!errors["privacy-info"]} aria-describedby={errors["privacy-info"] ? "err-privacy-info" : undefined}
                className="mt-1 h-4 w-4 shrink-0 rounded border-input text-primary accent-primary focus:ring-primary" />
              <span className="text-sm text-card-foreground">
                Dichiaro di aver preso visione e di aver accettato l'informativa ai sensi dell'art. 13 del Codice ed ai sensi degli articoli 23 e 26.
              </span>
            </label>
            <FormError id="err-privacy-info" message={errors["privacy-info"] || ""} />
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" name="privacy-marketing"
              className="mt-1 h-4 w-4 shrink-0 rounded border-input text-primary accent-primary focus:ring-primary" />
            <span className="text-sm text-card-foreground">
              Esprimo il consenso al trattamento dei miei dati personali per attività di marketing ad esempio newsletter via e-mail, contenenti offerte esclusive e novità promozionali riservate agli iscritti.
            </span>
          </label>
        </div>

        {submitted && (
          <p role="status" className="flex items-center gap-1.5 text-sm font-medium text-status-paid">
            ✓ Modifiche salvate con successo!
          </p>
        )}

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground transition-colors hover:bg-fontel-green-hover focus-visible:outline-2 focus-visible:outline-primary"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Salva le modifiche
        </button>
      </form>
    </div>
  );
}
