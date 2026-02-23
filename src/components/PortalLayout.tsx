import { useState } from "react";
import { Outlet } from "react-router-dom";
import { PortalSidebar } from "./PortalSidebar";
import { Menu, X } from "lucide-react";

export function PortalLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-primary/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <PortalSidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-primary hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Apri menu di navigazione"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <span className="font-heading text-lg font-semibold text-primary">Area Clienti</span>
        </header>

        {/* Welcome bar */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-xl font-semibold text-primary">
                Benvenuto nella tua Area Personale
              </h1>
              <p className="text-sm text-muted-foreground">
                Ciao Giovanni Taolacci, benvenuto!
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>ID Cliente: <strong className="text-primary">9504</strong></span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 animate-fade-in" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
