import { useEffect, useRef } from "react";
import { ListPlus, Share2, Trash2, X } from "lucide-react";
import { Track } from "@/lib/types";

interface TrackMenuProps {
  track: Track;
  anchor: HTMLElement;
  onClose: () => void;
  onAddToQueue: () => void;
}

export function TrackMenu({ track, anchor, onClose, onAddToQueue }: TrackMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const rect = anchor.getBoundingClientRect();

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  const items = [
    { label: "Добавить в очередь", icon: ListPlus, action: onAddToQueue },
    { label: "Поделиться", icon: Share2, action: () => {} },
    { label: "Удалить", icon: Trash2, action: () => {}, danger: true },
  ];

  // Position menu to the left of the button, aligned with bottom
  const menuWidth = 208;
  const left = Math.max(8, rect.right - menuWidth);
  const top = rect.bottom + 4;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-52 overflow-hidden rounded-xl border border-border bg-popover shadow-xl animate-scale-in-safe"
      style={{ top, left }}
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="truncate text-xs font-medium text-muted-foreground">{track.title}</span>
        <button onClick={onClose} className="rounded p-0.5 hover:bg-muted">
          <X className="h-3 w-3 text-muted-foreground" />
        </button>
      </div>
      <div className="p-1">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              item.action();
              onClose();
            }}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
              item.danger
                ? "text-destructive hover:bg-destructive/10"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
