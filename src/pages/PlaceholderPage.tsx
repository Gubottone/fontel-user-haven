import { useLocation } from "react-router-dom";
import { FileText } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/id-cliente": "ID Cliente",
  "/servizio-clienti": "Servizio Clienti",
  "/trattamento-dati": "Trattamento Dati Personali",
  "/diritti-recesso": "Diritti di Recesso",
  "/contratti-vendita": "Contratti di Vendita",
  "/curve-prelievo": "Curve di Prelievo",
};

export default function PlaceholderPage() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Pagina";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Il contenuto di questa sezione sarà integrato dal web service.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-16 shadow-card text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <FileText className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-primary">{title}</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Questa sezione mostrerà il contenuto proveniente dal web service.
          I dati verranno caricati dinamicamente dall'integrazione backend.
        </p>
      </div>
    </div>
  );
}
