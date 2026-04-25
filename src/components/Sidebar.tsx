import { Home, ListMusic, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", icon: Home, label: "Главная" },
  { to: "/playlists", icon: ListMusic, label: "Плейлисты" },
  { to: "/settings", icon: Settings, label: "Настройки" },
];

export function Sidebar() {
  return (
    <aside className="flex w-60 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--brand))] to-[hsl(var(--brand-accent))]">
          <ListMusic className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold">Aura Player</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary/20 bg-primary/10 text-primary"
                  : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <l.icon className="h-4 w-4" />
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
