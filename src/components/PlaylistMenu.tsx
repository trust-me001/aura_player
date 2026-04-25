import { useEffect, useRef, useState } from "react";
import { Pencil, ImagePlus, Trash2, X } from "lucide-react";
import { Playlist } from "@/lib/types";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PlaylistMenuProps {
  playlist: Playlist;
  anchor: HTMLElement;
  onClose: () => void;
}

export function PlaylistMenu({ playlist, anchor, onClose }: PlaylistMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { renamePlaylist, deletePlaylist, updatePlaylistCover } = usePlayerStore();
  const [renameOpen, setRenameOpen] = useState(false);
  const [newName, setNewName] = useState(playlist.name);
  const rect = anchor.getBoundingClientRect();

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  const handleRename = () => {
    if (newName.trim()) renamePlaylist(playlist.id, newName.trim());
    setRenameOpen(false);
    onClose();
  };

  const handleCover = () => {
    const url = prompt("Введите URL обложки:", playlist.cover);
    if (url !== null) updatePlaylistCover(playlist.id, url.trim());
    onClose();
  };

  return (
    <>
      <div
        ref={menuRef}
        className="fixed z-50 w-52 overflow-hidden rounded-xl border border-border bg-popover shadow-xl animate-scale-in-safe"
        style={{
          top: rect.bottom + 4,
          left: Math.max(8, rect.right - 208),
        }}
      >
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <span className="truncate text-xs font-medium text-muted-foreground">{playlist.name}</span>
          <button onClick={onClose} className="rounded p-0.5 hover:bg-muted">
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
        </div>
        <div className="p-1">
          <button
            onClick={() => setRenameOpen(true)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <Pencil className="h-4 w-4" />
            Переименовать
          </button>
          <button
            onClick={handleCover}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <ImagePlus className="h-4 w-4" />
            Сменить обложку
          </button>
          <button
            onClick={() => {
              deletePlaylist(playlist.id);
              onClose();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
            Удалить
          </button>
        </div>
      </div>

      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="rounded-2xl border-border">
          <DialogHeader>
            <DialogTitle>Переименовать плейлист</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
              className="rounded-xl border-border"
            />
            <Button onClick={handleRename} className="w-full rounded-full">
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
