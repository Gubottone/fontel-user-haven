import { useState } from "react";
import { Send, Paperclip, MessageSquare } from "lucide-react";

export default function InviaComunicazioni() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary">Invia Comunicazioni</h2>
        <p className="mt-1 text-sm text-muted-foreground">Invia un messaggio al servizio clienti Fontel.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fontel-green-light">
            <MessageSquare className="h-5 w-5 text-fontel-green" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary">Nuovo messaggio</h3>
            <p className="text-xs text-muted-foreground">Compila il modulo per contattarci direttamente.</p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="com-category" className="mb-1.5 block text-sm font-medium text-card-foreground">
              Categoria *
            </label>
            <select
              id="com-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Seleziona una categoria</option>
              <option value="fatturazione">Fatturazione</option>
              <option value="contratto">Contratto</option>
              <option value="fornitura">Fornitura</option>
              <option value="pagamenti">Pagamenti</option>
              <option value="altro">Altro</option>
            </select>
          </div>

          <div>
            <label htmlFor="com-oggetto" className="mb-1.5 block text-sm font-medium text-card-foreground">
              Oggetto *
            </label>
            <input
              id="com-oggetto"
              type="text"
              placeholder="Inserisci l'oggetto del messaggio"
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="com-message" className="mb-1.5 block text-sm font-medium text-card-foreground">
              Messaggio *
            </label>
            <textarea
              id="com-message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Scrivi il tuo messaggio..."
              className="w-full resize-y rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <p className="mt-1 text-xs text-muted-foreground">{message.length}/2000 caratteri</p>
          </div>

          <div>
            <label htmlFor="com-attachment" className="mb-1.5 block text-sm font-medium text-card-foreground">
              Allegato (opzionale)
            </label>
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

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground transition-colors hover:bg-fontel-green-hover focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Invia messaggio
          </button>
        </form>
      </div>
    </div>
  );
}
