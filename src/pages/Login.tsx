import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, LogIn, Zap, User } from "lucide-react";
import { FormError } from "@/components/FormError";

export default function Login() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs: Record<string, string> = {};
    const account = (form.elements.namedItem("account") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    if (!account) errs.account = "Inserisci il tuo account.";
    if (!password) errs.password = "Inserisci la password.";

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      navigate("/");
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors[field] ? "border-status-unpaid bg-status-unpaid/5" : "border-input bg-background"}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <Zap className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-primary">
              Area <span className="text-secondary">Clienti</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Codice SIC che inizia con G0 o con C0
            </p>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <User className="h-10 w-10 text-primary" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-border bg-card p-6 shadow-card space-y-5">
          <div>
            <label htmlFor="account" className="mb-1.5 block text-sm font-semibold text-primary">Account</label>
            <input
              id="account"
              name="account"
              type="text"
              placeholder="Inserisci il tuo account"
              autoComplete="username"
              aria-invalid={!!errors.account}
              aria-describedby={errors.account ? "err-account" : undefined}
              className={inputClass("account") + " placeholder:text-muted-foreground/50"}
            />
            <FormError id="err-account" message={errors.account || ""} />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-primary">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="Inserisci la password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "err-password" : undefined}
                className={inputClass("password") + " pr-12 placeholder:text-muted-foreground/50"}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                aria-label={showPwd ? "Nascondi password" : "Mostra password"}
              >
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <FormError id="err-password" message={errors.password || ""} />
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link to="/password-dimenticata" className="font-medium text-muted-foreground underline hover:text-primary">
              Password dimenticata?
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <LogIn className="h-4 w-4" />
              Accedi
            </button>
          </div>
        </form>

        {/* Registration link */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Primo accesso?</p>
          <Link
            to="/registrazione"
            className="inline-flex items-center gap-2 text-lg font-bold text-primary underline decoration-primary/30 hover:decoration-primary transition-colors"
          >
            Clicca qui per registrarti
          </Link>
        </div>
      </div>
    </div>
  );
}
