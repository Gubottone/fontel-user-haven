import { FileText, Download } from "lucide-react";

const contratti = [
  {
    titolo: "Condizioni Generali di Vendita Energia Elettrica",
    descrizione: "Condizioni generali applicate alla fornitura di energia elettrica per clienti domestici e business.",
    file: "Condizioni_Generali_Energia.pdf",
  },
  {
    titolo: "Condizioni Generali di Vendita Gas Naturale",
    descrizione: "Condizioni generali applicate alla fornitura di gas naturale per clienti domestici e business.",
    file: "Condizioni_Generali_Gas.pdf",
  },
];

export default function ContrattiVendita() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary">Contratti di Vendita</h2>
        <p className="mt-1 text-sm text-muted-foreground">Scarica i documenti relativi alle condizioni contrattuali.</p>
      </div>

      <div className="space-y-4">
        {contratti.map((c) => (
          <div key={c.file} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-card-foreground">{c.titolo}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{c.descrizione}</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              <Download className="h-4 w-4" />
              Scarica PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
