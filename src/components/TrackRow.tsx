import { Play, Pause, MoreHorizontal } from "lucide-react";
import { Track } from "@/lib/types";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useState, useRef, MouseEvent } from "react";
import { TrackMenu } from "./TrackMenu";
import { cn } from "@/lib/utils";

interface TrackRowProps {
  track: Track;
  index?: number;
  showArtist?: boolean;
  onArtistClick?: (artist: string) => void;
}

export function TrackRow({ track, index, showArtist = true, onArtistClick }: TrackRowProps) {
  const { currentTrack, isPlaying, setCurrentTrack, togglePlay, setIsPlaying, addToQueue } = usePlayerStore();
  const isCurrent = currentTrack?.id === track.id;
  const [menuOpen, setMenuOpen] = useState(false);
  const moreRef = useRef<HTMLButtonElement>(null);

  const handlePlay = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleMore = (e: MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(true);
  };

  return (
    <div
      onClick={handlePlay}
      className={cn(
        "group flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 transition-colors",
        isCurrent
          ? "border-primary/30 bg-primary/10"
          : "border-transparent hover:border-border hover:bg-muted"
      )}
    >
      {/* Index / Play overlay */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border">
        <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity",
            isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          {isCurrent && isPlaying ? (
            <Pause className="h-4 w-4 text-white" />
          ) : (
            <Play className="h-4 w-4 pl-0.5 text-white" />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm font-medium", isCurrent && "text-primary")}>
          {track.title}
        </p>
        {showArtist && (
          <p
            className="truncate text-xs text-muted-foreground hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              onArtistClick?.(track.artist);
            }}
          >
            {track.artist}
          </p>
        )}
      </div>

      {/* Duration */}
      <span className="text-xs tabular-nums text-muted-foreground">
        {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}
      </span>

      {/* More button */}
      <button
        ref={moreRef}
        onClick={handleMore}
        className="rounded-full p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {menuOpen && moreRef.current && (
        <TrackMenu
          track={track}
          anchor={moreRef.current}
          onClose={() => setMenuOpen(false)}
          onAddToQueue={() => addToQueue(track)}
        />
      )}
    </div>
  );
}
