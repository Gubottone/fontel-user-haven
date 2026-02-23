import { useState } from "react";
import { Download, FileSpreadsheet, FileText, Search, ChevronLeft, ChevronRight, Receipt } from "lucide-react";

const invoiceData = [
  { anno: "2026", nFattura: "17815", skc: "G0002254", emissione: "22/01/2026", scadenza: "23/02/2026", totale: "184,09 €", stato: "DA PAGARE" },
  { anno: "2025", nFattura: "221196", skc: "G0002254", emissione: "23/12/2025", scadenza: "22/01/2026", totale: "99,06 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "199346", skc: "G0002254", emissione: "19/11/2025", scadenza: "09/12/2025", totale: "33,74 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "181144", skc: "G0002254", emissione: "21/10/2025", scadenza: "21/11/2025", totale: "27,66 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "168544", skc: "G0002254", emissione: "24/09/2025", scadenza: "24/10/2025", totale: "25,94 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "143678", skc: "G0002254", emissione: "18/08/2025", scadenza: "17/09/2025", totale: "26,09 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "135614", skc: "G0002254", emissione: "31/07/2025", scadenza: "29/08/2025", totale: "26,48 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "106571", skc: "G0002254", emissione: "17/06/2025", scadenza: "17/07/2025", totale: "27,81 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "94318", skc: "G0002254", emissione: "26/05/2025", scadenza: "23/06/2025", totale: "29,02 €", stato: "PAGATA" },
  { anno: "2025", nFattura: "71692", skc: "G0002254", emissione: "28/04/2025", scadenza: "23/05/2025", totale: "-494,86 €", stato: "DA PAGARE" },
];

export default function ConsultazioneGas() {
  const [search, setSearch] = useState("");

  const filtered = invoiceData.filter(
    (row) =>
      row.nFattura.includes(search) ||
      row.stato.toLowerCase().includes(search.toLowerCase()) ||
      row.totale.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary">Consultazione Gas</h2>
        <p className="mt-1 text-sm text-muted-foreground">Visualizza e scarica le tue fatture del gas.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder="Cerca fattura..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Cerca tra le fatture gas"
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

      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm" role="table">
          <caption className="sr-only">Elenco fatture gas</caption>
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th scope="col" className="px-4 py-3 text-left font-heading font-semibold text-primary">Anno</th>
              <th scope="col" className="px-4 py-3 text-left font-heading font-semibold text-primary">N° Fattura</th>
              <th scope="col" className="px-4 py-3 text-left font-heading font-semibold text-primary hidden sm:table-cell">SKC</th>
              <th scope="col" className="px-4 py-3 text-left font-heading font-semibold text-primary hidden md:table-cell">Emissione</th>
              <th scope="col" className="px-4 py-3 text-left font-heading font-semibold text-primary">Scadenza</th>
              <th scope="col" className="px-4 py-3 text-right font-heading font-semibold text-primary">Totale</th>
              <th scope="col" className="px-4 py-3 text-center font-heading font-semibold text-primary">Stato</th>
              <th scope="col" className="px-4 py-3 text-center font-heading font-semibold text-primary"><span className="sr-only">Azioni</span></th>
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
                  {row.stato === "DA PAGARE" ? (
                    <span className="inline-flex items-center rounded-full bg-status-unpaid-bg px-2.5 py-1 text-xs font-semibold text-status-unpaid">Da pagare</span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-status-paid-bg px-2.5 py-1 text-xs font-semibold text-status-paid">Pagata</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary" aria-label={`Scarica bolletta fattura ${row.nFattura}`}>
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="hidden sm:inline">Bolletta</span>
                    </button>
                    <button className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary" aria-label={`Scarica bollettino fattura ${row.nFattura}`}>
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

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Mostrati 1-{Math.min(10, filtered.length)} di {filtered.length} elementi</span>
        <div className="flex gap-1">
          <button className="rounded-md p-2 hover:bg-muted" aria-label="Pagina precedente" disabled><ChevronLeft className="h-4 w-4" /></button>
          <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground" aria-current="page">1</button>
          <button className="rounded-md p-2 hover:bg-muted" aria-label="Pagina successiva" disabled><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-4 font-heading text-lg font-semibold text-primary">Grafico consumi</h3>
        <div className="flex h-48 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground">
          <p>Il grafico dei consumi sarà disponibile con i dati reali dal web service.</p>
        </div>
      </div>
    </div>
  );
}
