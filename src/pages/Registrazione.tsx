import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Zap, ChevronRight } from "lucide-react";
import { FormError } from "@/components/FormError";

/* ── Password strength ── */
function getPasswordStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;

  if (score <= 1) return { score, label: "Molto debole", color: "bg-red-500" };
  if (score === 2) return { score, label: "Debole", color: "bg-orange-500" };
  if (score === 3) return { score, label: "Discreta", color: "bg-amber-500" };
  if (score === 4) return { score, label: "Buona", color: "bg-lime-500" };
  return { score, label: "Forte", color: "bg-status-paid" };
}

const strengthColors = [
  "bg-red-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-lime-500",
  "bg-status-paid",
];

export default function Registrazione() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdConfirm, setShowPwdConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value.trim();

    if (!get("account")) errs.account = "L'account è obbligatorio.";
    if (!get("nome")) errs.nome = "Il nome è obbligatorio.";
    if (!get("cognome")) errs.cognome = "Il cognome è obbligatorio.";
    if (!get("email")) errs.email = "L'email è obbligatoria.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) errs.email = "Inserisci un'email valida.";

    const pwd = (form.elements.namedItem("password") as HTMLInputElement).value;
    const pwdConfirm = (form.elements.namedItem("password-confirm") as HTMLInputElement).value;
    if (!pwd) errs.password = "La password è obbligatoria.";
    else if (pwd.length < 8) errs.password = "Almeno 8 caratteri.";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pwd)) errs.password = "Serve almeno una maiuscola, una minuscola e un numero.";
    if (pwd !== pwdConfirm) errs["password-confirm"] = "Le password non corrispondono.";

    const privacy = (form.elements.namedItem("privacy") as HTMLInputElement).checked;
    if (!privacy) errs.privacy = "Devi accettare l'informativa sulla privacy.";

    return errs;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(e.currentTarget);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors[field] ? "border-status-unpaid bg-status-unpaid/5" : "border-input bg-background"}`;

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20">
            <svg className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="font-heading text-2xl font-bold text-primary">
            Controlla la tua E-Mail per confermare la tua registrazione!
          </h2>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Torna al Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <Zap className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-primary">Registrazione</h1>
            <p className="mt-1 text-sm text-muted-foreground">Crea il tuo account per accedere all'Area Clienti</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-border bg-card p-6 shadow-card space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="account" className="mb-1.5 block text-sm font-semibold text-primary">Account *</label>
              <input id="account" name="account" type="text" placeholder="Scegli un nome account"
                aria-invalid={!!errors.account} aria-describedby={errors.account ? "err-account" : undefined}
                className={inputClass("account") + " placeholder:text-muted-foreground/50"} />
              <FormError id="err-account" message={errors.account || ""} />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-primary">Email account *</label>
              <input id="email" name="email" type="email" placeholder="La tua email"
                aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined}
                className={inputClass("email") + " placeholder:text-muted-foreground/50"} />
              <FormError id="err-email" message={errors.email || ""} />
            </div>
            <div>
              <label htmlFor="nome" className="mb-1.5 block text-sm font-semibold text-primary">Nome *</label>
              <input id="nome" name="nome" type="text" placeholder="Il tuo nome"
                aria-invalid={!!errors.nome} aria-describedby={errors.nome ? "err-nome" : undefined}
                className={inputClass("nome") + " placeholder:text-muted-foreground/50"} />
              <FormError id="err-nome" message={errors.nome || ""} />
            </div>
            <div>
              <label htmlFor="cellulare" className="mb-1.5 block text-sm font-medium text-card-foreground">Cellulare</label>
              <input id="cellulare" name="cellulare" type="tel" placeholder="Cellulare"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="cognome" className="mb-1.5 block text-sm font-semibold text-primary">Cognome *</label>
              <input id="cognome" name="cognome" type="text" placeholder="Il tuo cognome"
                aria-invalid={!!errors.cognome} aria-describedby={errors.cognome ? "err-cognome" : undefined}
                className={inputClass("cognome") + " placeholder:text-muted-foreground/50"} />
              <FormError id="err-cognome" message={errors.cognome || ""} />
            </div>
            <div>
              <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium text-card-foreground">Telefono</label>
              <input id="telefono" name="telefono" type="tel" placeholder="Telefono"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          {/* Password section */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-primary">Password **</label>
              <div className="relative">
                <input id="password" name="password" type={showPwd ? "text" : "password"}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Scegli una password sicura" autoComplete="new-password"
                  aria-invalid={!!errors.password} aria-describedby="pwd-strength err-password"
                  className={inputClass("password") + " pr-12 placeholder:text-muted-foreground/50"} />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  aria-label={showPwd ? "Nascondi password" : "Mostra password"}>
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <FormError id="err-password" message={errors.password || ""} />

              {/* Strength meter */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1" role="img" aria-label={`Sicurezza password: ${strength.label}`}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength.score - 1 ? strengthColors[strength.score] : "bg-muted"}`}
                      />
                    ))}
                  </div>
                  <p id="pwd-strength" className="text-xs font-medium" style={{ color: strength.score <= 2 ? "hsl(var(--status-unpaid))" : strength.score <= 3 ? "hsl(40, 90%, 45%)" : "hsl(var(--status-paid))" }}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="password-confirm" className="mb-1.5 block text-sm font-semibold text-primary">Conferma Password **</label>
              <div className="relative">
                <input id="password-confirm" name="password-confirm" type={showPwdConfirm ? "text" : "password"}
                  placeholder="Conferma la password" autoComplete="new-password"
                  aria-invalid={!!errors["password-confirm"]} aria-describedby={errors["password-confirm"] ? "err-password-confirm" : undefined}
                  className={inputClass("password-confirm") + " pr-12 placeholder:text-muted-foreground/50"} />
                <button type="button" onClick={() => setShowPwdConfirm(!showPwdConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  aria-label={showPwdConfirm ? "Nascondi password" : "Mostra password"}>
                  {showPwdConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <FormError id="err-password-confirm" message={errors["password-confirm"] || ""} />
            </div>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>* Campi obbligatori</p>
            <p>** La password deve soddisfare i seguenti requisiti di sicurezza (almeno 8 caratteri, un carattere maiuscolo, uno minuscolo e un numero)</p>
          </div>

          {/* Privacy */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-primary underline">Registrandomi dichiaro di</h3>
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="privacy"
                  aria-invalid={!!errors.privacy} aria-describedby={errors.privacy ? "err-privacy" : undefined}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-input text-primary accent-primary focus:ring-primary" />
                <span className="text-sm text-card-foreground">
                  Dichiaro di aver preso visione della presente Informativa Privacy per l'Area Personale e accetto il trattamento dei miei dati personali per le finalità di Esecuzione del Servizio (Punto 2.2) e di Legittimo Interesse (Punto 2.3), inclusa la comunicazione ai terzi Responsabili del Trattamento specificati al Punto 4.
                </span>
              </label>
              <FormError id="err-privacy" message={errors.privacy || ""} />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              avendo preso visione e compreso la <a href="/trattamento-dati" className="font-semibold text-primary underline hover:no-underline">Privacy Policy</a> con specifico riferimento a tale servizio e la <a href="/trattamento-dati" className="font-semibold text-primary underline hover:no-underline">Web Policy</a> del sito www.fontel.it ai sensi del D.Lgs 101/2018 e Regolamento Europeo 2016/679
            </p>
          </div>

          <div className="flex justify-center">
            <button type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90">
              Accedi qui
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Hai già un account? <Link to="/login" className="font-semibold text-primary underline hover:no-underline">Accedi</Link>
        </p>
      </div>
    </div>
  );
}
