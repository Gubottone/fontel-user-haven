import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PortalLayout } from "./components/PortalLayout";
import HomeAreaClienti from "./pages/HomeAreaClienti";
import ConsultazioneEnergia from "./pages/ConsultazioneEnergia";
import ConsultazioneGas from "./pages/ConsultazioneGas";
import Autolettura from "./pages/Autolettura";
import ModificaDati from "./pages/ModificaDati";
import InviaComunicazioni from "./pages/InviaComunicazioni";
import Ticket from "./pages/Ticket";
import Contatti from "./pages/Contatti";
import ParentalControl from "./pages/ParentalControl";
import IdCliente from "./pages/IdCliente";
import ContrattiVendita from "./pages/ContrattiVendita";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<PortalLayout />}>
            <Route path="/" element={<HomeAreaClienti />} />
            <Route path="/consultazione-energia" element={<ConsultazioneEnergia />} />
            <Route path="/consultazione-gas" element={<ConsultazioneGas />} />
            <Route path="/autolettura" element={<Autolettura />} />
            <Route path="/modifica-dati" element={<ModificaDati />} />
            <Route path="/invia-comunicazioni" element={<InviaComunicazioni />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/parental-control" element={<ParentalControl />} />
            <Route path="/id-cliente" element={<IdCliente />} />
            
            <Route path="/trattamento-dati" element={<PlaceholderPage />} />
            <Route path="/diritti-recesso" element={<PlaceholderPage />} />
            <Route path="/contratti-vendita" element={<ContrattiVendita />} />
            <Route path="/curve-prelievo" element={<PlaceholderPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
