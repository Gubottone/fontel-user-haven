import { Save, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ModificaDati() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdConfirm, setShowPwdConfirm] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary">Modifica Dati Account</h2>
        <p className="mt-1 text-sm text-muted-foreground">Aggiorna le tue informazioni personali e la password.</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-5 font-heading text-lg font-semibold text-primary">Dati personali</h3>
          <p className="mb-4 text-xs text-muted-foreground">I campi contrassegnati con * sono obbligatori.</p>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-card-foreground">Nome *</label>
              <input id="nome" type="text" defaultValue="Giovanni" required
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="cognome" className="mb-1.5 block text-sm font-medium text-card-foreground">Cognome *</label>
              <input id="cognome" type="text" defaultValue="Taolacci" required
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-card-foreground">Email *</label>
              <input id="email" type="email" defaultValue="luca1180@gmail.com" required
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium text-card-foreground">Telefono *</label>
              <input id="telefono" type="tel" defaultValue="3391581906" required
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="cellulare" className="mb-1.5 block text-sm font-medium text-card-foreground">Cellulare</label>
              <input id="cellulare" type="tel"
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
              <input id="password" type={showPwd ? "text" : "password"} required
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 pr-12 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute bottom-2.5 right-3 text-muted-foreground hover:text-primary"
                aria-label={showPwd ? "Nascondi password" : "Mostra password"}>
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="relative">
              <label htmlFor="password-confirm" className="mb-1.5 block text-sm font-medium text-card-foreground">Conferma password *</label>
              <input id="password-confirm" type={showPwdConfirm ? "text" : "password"} required
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 pr-12 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <button type="button" onClick={() => setShowPwdConfirm(!showPwdConfirm)}
                className="absolute bottom-2.5 right-3 text-muted-foreground hover:text-primary"
                aria-label={showPwdConfirm ? "Nascondi password" : "Mostra password"}>
                {showPwdConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-3 font-heading text-lg font-semibold text-primary">Trattamento dati personali</h3>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-input text-primary accent-primary focus:ring-primary" />
            <span className="text-sm text-card-foreground">Esprimo il consenso al trattamento dei miei dati personali per attività di marketing.</span>
          </label>
        </div>

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
