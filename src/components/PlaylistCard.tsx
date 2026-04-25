import { useState, useRef } from "react";
import { Playlist } from "@/lib/types";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useNavigate } from "react-router-dom";
import { PlaylistMenu } from "./PlaylistMenu";
import { MoreHorizontal, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaylistCardProps {
  playlist: Playlist;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const navigate = useNavigate();
  const { artists } = usePlayerStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const moreRef = useRef<HTMLButtonElement>(null);

  const allTracks = artists.flatMap((a) => a.tracks);
  const cover =
    playlist.cover ||
    (playlist.trackIds.length > 0
      ? allTracks.find((t) => t.id === playlist.trackIds[playlist.trackIds.length - 1])?.cover
      : undefined) ||
    "";

  return (
    <div className="group relative cursor-pointer rounded-xl border border-border bg-card p-3 transition-colors hover:bg-muted">
      <div
        onClick={() => navigate(`/playlist/${playlist.id}`)}
        className="relative aspect-square overflow-hidden rounded-lg border border-border"
      >
        {cover ? (
          <img src={cover} alt={playlist.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Music className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
      </div>

      <div className="mt-2 flex items-start justify-between gap-1">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{playlist.name}</p>
          <p className="text-xs text-muted-foreground">{playlist.trackIds.length} треков</p>
        </div>
        <button
          ref={moreRef}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(true);
          }}
          className={cn(
            "rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            menuOpen && "opacity-100",
            !menuOpen && "opacity-0 group-hover:opacity-100"
          )}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {menuOpen && moreRef.current && (
        <PlaylistMenu playlist={playlist} anchor={moreRef.current} onClose={() => setMenuOpen(false)} />
      )}
    </div>
  );
}
