import { useParams, useNavigate } from "react-router-dom";
import { usePlayerStore } from "@/store/usePlayerStore";
import { TrackRow } from "@/components/TrackRow";
import { Play, Pause } from "lucide-react";

export default function ArtistPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { artists, currentTrack, isPlaying, setCurrentTrack, setIsPlaying } = usePlayerStore();

  const artist = artists.find((a) => a.name === decodeURIComponent(name || ""));
  if (!artist) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Исполнитель не найден
      </div>
    );
  }

  const isArtistPlaying = currentTrack && artist.tracks.some((t) => t.id === currentTrack.id) && isPlaying;

  const playArtist = () => {
    if (isArtistPlaying) {
      setIsPlaying(false);
    } else if (currentTrack && artist.tracks.some((t) => t.id === currentTrack.id)) {
      setIsPlaying(true);
    } else if (artist.tracks[0]) {
      setCurrentTrack(artist.tracks[0]);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-safe">
      {/* Header */}
      <div className="flex items-end gap-6 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-highlight/10 p-6">
        <div className="h-44 w-44 shrink-0 overflow-hidden rounded-xl border-2 border-border shadow-lg">
          <img src={artist.cover} alt={artist.name} className="h-full w-full object-cover" />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Исполнитель</p>
          <h1 className="text-4xl font-bold">{artist.name}</h1>
          <p className="text-sm text-muted-foreground">{artist.tracks.length} треков</p>
          <button
            onClick={playArtist}
            className="mt-2 flex h-10 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            {isArtistPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 pl-0.5" />}
            {isArtistPlaying ? "Пауза" : "Слушать"}
          </button>
        </div>
      </div>

      {/* Tracks */}
      <div className="space-y-1">
        {artist.tracks.map((track, i) => (
          <TrackRow
            key={track.id}
            track={track}
            index={i + 1}
            showArtist={false}
            onArtistClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
