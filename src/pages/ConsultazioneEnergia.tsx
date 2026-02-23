import { useState } from "react";
import { Download, FileSpreadsheet, FileText, Search, ChevronLeft, ChevronRight, Receipt } from "lucide-react";

const invoiceData = [
  { anno: "2026", nFattura: "14635", tipo: "Energy", skc: "C0030504", emissione: "19/01/2026", scadenza: "16/02/2026", totale: "131,53 €", stato: "DA PAGARE" },
  { anno: "2025", nFattura: "196162", tipo: "Energy", skc: "C0030504", emissione: "13/11/2025", scadenza: "12/12/2025", totale: "135,51 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "159082", tipo: "Energy", skc: "C0030504", emissione: "16/09/2025", scadenza: "10/10/2025", totale: "3,35 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "120450", tipo: "Energy", skc: "C0030504", emissione: "14/07/2025", scadenza: "12/08/2025", totale: "98,12 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "98321", tipo: "Energy", skc: "C0030504", emissione: "20/05/2025", scadenza: "18/06/2025", totale: "112,45 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "75680", tipo: "Energy", skc: "C0030504", emissione: "15/03/2025", scadenza: "14/04/2025", totale: "145,20 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "52300", tipo: "Energy", skc: "C0030504", emissione: "18/01/2025", scadenza: "17/02/2025", totale: "128,90 €", stato: "PAGATA" },
  { anno: "2024", nFattura: "240150", tipo: "Energy", skc: "C0030504", emissione: "20/11/2024", scadenza: "20/12/2024", totale: "110,75 €", stato: "PAGATA" },
];

export default function ConsultazioneEnergia() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const filtered = invoiceData.filter(
    (row) =>
      row.nFattura.includes(search) ||
      row.stato.toLowerCase().includes(search.toLowerCase()) ||
      row.totale.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary">Consultazione Energia</h2>
        <p className="mt-1 text-sm text-muted-foreground">Visualizza e scarica le tue fatture di energia elettrica.</p>
      </div>

      {/* Filters & actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder="Cerca fattura..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Cerca tra le fatture"
          />
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-input bg-card px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary">
            <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
            Esporta Excel
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-input bg-card px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary">
            <FileText className="h-4 w-4" aria-hidden="true" />
            Esporta PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm" role="table">
          <caption className="sr-only">Elenco fatture energia elettrica</caption>
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th scope="col" className="px-4 py-3 text-left font-heading font-semibold text-primary">Anno</th>
              <th scope="col" className="px-4 py-3 text-left font-heading font-semibold text-primary">N° Fattura</th>
              <th scope="col" className="px-4 py-3 text-left font-heading font-semibold text-primary hidden sm:table-cell">SKC</th>
              <th scope="col" className="px-4 py-3 text-left font-heading font-semibold text-primary hidden md:table-cell">Emissione</th>
              <th scope="col" className="px-4 py-3 text-left font-heading font-semibold text-primary">Scadenza</th>
              <th scope="col" className="px-4 py-3 text-right font-heading font-semibold text-primary">Totale</th>
              <th scope="col" className="px-4 py-3 text-center font-heading font-semibold text-primary">Stato</th>
              <th scope="col" className="px-4 py-3 text-center font-heading font-semibold text-primary">
                <span className="sr-only">Azioni</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.nFattura} className={`border-b border-border transition-colors hover:bg-muted/30 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                <td className="px-4 py-3 text-card-foreground">{row.anno}</td>
                <td className="px-4 py-3 font-medium text-primary">{row.nFattura}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{row.skc}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{row.emissione}</td>
                <td className="px-4 py-3 text-card-foreground">{row.scadenza}</td>
                <td className="px-4 py-3 text-right font-semibold text-card-foreground">{row.totale}</td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge stato={row.stato} />
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
                      aria-label={`Scarica bolletta fattura ${row.nFattura}`}
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="hidden sm:inline">Bolletta</span>
                    </button>
                    <button
                      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
                      aria-label={`Scarica bollettino fattura ${row.nFattura}`}
                    >
                      <Receipt className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="hidden sm:inline">Bollettino</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-muted-foreground">Nessun risultato trovato.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Mostrati 1-{Math.min(perPage, filtered.length)} di {filtered.length} elementi</span>
        <div className="flex gap-1">
          <button className="rounded-md p-2 hover:bg-muted" aria-label="Pagina precedente" disabled>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground" aria-current="page">1</button>
          <button className="rounded-md p-2 hover:bg-muted" aria-label="Pagina successiva" disabled>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Consumption chart placeholder */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-4 font-heading text-lg font-semibold text-primary">Grafico consumi</h3>
        <div className="flex h-48 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground">
          <p>Il grafico dei consumi sarà disponibile con i dati reali dal web service.</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ stato }: { stato: string }) {
  if (stato === "DA PAGARE") {
    return (
      <span className="inline-flex items-center rounded-full bg-status-unpaid-bg px-2.5 py-1 text-xs font-semibold text-status-unpaid">
        Da pagare
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-status-paid-bg px-2.5 py-1 text-xs font-semibold text-status-paid">
      Pagata
    </span>
  );
}
