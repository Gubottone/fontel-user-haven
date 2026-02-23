import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Zap,
  Flame,
  Gauge,
  UserCog,
  
  CreditCard,
  TicketCheck,
  HeadphonesIcon,
  Phone,
  ShieldCheck,
  Scale,
  FileText,
  TrendingUp,
  ShieldAlert,
  LogOut,
  X,
} from "lucide-react";

interface PortalSidebarProps {
  onClose: () => void;
}

const mainMenuItems = [
  { to: "/", label: "Home area clienti", icon: Home },
  { to: "/consultazione-energia", label: "Consultazione Energia", icon: Zap },
  { to: "/consultazione-gas", label: "Consultazione Gas", icon: Flame },
  { to: "/autolettura", label: "Autolettura", icon: Gauge },
  { to: "/modifica-dati", label: "Modifica Dati", icon: UserCog },
  
  { to: "/id-cliente", label: "Id Cliente", icon: CreditCard },
  { to: "/ticket", label: "Ticket", icon: TicketCheck },
];

const serviceMenuItems = [
  { to: "/contatti", label: "Contatti", icon: Phone },
  { to: "/trattamento-dati", label: "Trattamento dati", icon: ShieldCheck },
  { to: "/diritti-recesso", label: "Diritti di recesso", icon: Scale },
  { to: "/contratti-vendita", label: "Contratti di vendita", icon: FileText },
  { to: "/parental-control", label: "Parental control", icon: ShieldAlert },
  { to: "/curve-prelievo", label: "Curve di prelievo", icon: TrendingUp },
];

function SidebarLink({ to, label, icon: Icon, onClick }: { to: string; label: string; icon: React.ElementType; onClick: () => void }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-[3px] border-fontel-green"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground border-l-[3px] border-transparent"
        }`
      }
    >
      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  );
}

export function PortalSidebar({ onClose }: PortalSidebarProps) {
  return (
    <nav
      className="flex h-full flex-col bg-sidebar text-sidebar-foreground overflow-y-auto scrollbar-thin"
      aria-label="Menu principale area clienti"
    >
      {/* Logo area */}
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-fontel-green">
            <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold text-primary-foreground tracking-wide">FONTEL</span>
            <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">Area Clienti</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden"
          aria-label="Chiudi menu"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Utenza selector */}
      <div className="mx-4 mb-4 rounded-lg border border-sidebar-border bg-sidebar-accent/30 p-3">
        <label htmlFor="utenza-select" className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/50">
          Seleziona utenza
        </label>
        <select
          id="utenza-select"
          className="w-full max-w-full truncate rounded-md border border-sidebar-border bg-sidebar-accent px-3 py-2 text-xs text-sidebar-foreground focus:outline-none focus:ring-2 focus:ring-fontel-green"
          defaultValue="all"
        >
          <option value="all">Tutte le utenze</option>
          <optgroup label="Energia">
            <option value="C0030504">C0030504 – Vic. Portapiccola 8, Napoli – 01/08/2017</option>
            <option value="C0045781">C0045781 – Via Toledo 156, Napoli – 15/03/2020</option>
          </optgroup>
          <optgroup label="Gas">
            <option value="G0002254">G0002254 – Vic. Portapiccola 8, Napoli – 01/08/2017</option>
            <option value="G0003891">G0003891 – Via Toledo 156, Napoli – 15/03/2020</option>
          </optgroup>
          <optgroup label="Telecomunicazioni">
            <option disabled>Nessuna utenza attiva</option>
          </optgroup>
        </select>
      </div>

      {/* Main menu */}
      <div className="flex-1 space-y-1 px-3">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
          Menu principale
        </p>
        {mainMenuItems.map((item) => (
          <SidebarLink key={item.to} {...item} onClick={onClose} />
        ))}

        <div className="my-4 border-t border-sidebar-border" />

        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
          Servizi e informazioni
        </p>
        {serviceMenuItems.map((item) => (
          <SidebarLink key={item.to} {...item} onClick={onClose} />
        ))}
      </div>

      {/* Logout */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={() => {
            onClose();
            window.location.href = "/login";
          }}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-destructive/20 hover:text-destructive-foreground"
        >
          <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
          <span>Esci</span>
        </button>
      </div>
    </nav>
  );
}
