import { useState } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { PlaylistCard } from "@/components/PlaylistCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PlaylistsPage() {
  const { playlists, createPlaylist } = usePlayerStore();
  const [newName, setNewName] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    if (!newName.trim()) return;
    createPlaylist(newName.trim());
    setNewName("");
    setOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in-safe">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Плейлисты</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-full">
              <Plus className="h-4 w-4" />
              Новый плейлист
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl border-border">
            <DialogHeader>
              <DialogTitle>Создать плейлист</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <Input
                placeholder="Название плейлиста"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                className="rounded-xl border-border"
              />
              <Button onClick={handleCreate} className="w-full rounded-full">
                Создать
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {playlists.map((pl) => (
          <PlaylistCard key={pl.id} playlist={pl} />
        ))}
      </div>
    </div>
  );
}
