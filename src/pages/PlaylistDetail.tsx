import { useParams, useNavigate } from "react-router-dom";
import { usePlayerStore } from "@/store/usePlayerStore";
import { TrackRow } from "@/components/TrackRow";
import { Play, Pause, Music, ArrowLeft } from "lucide-react";

export default function PlaylistDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playlists, artists, currentTrack, isPlaying, setCurrentTrack, setIsPlaying } = usePlayerStore();

  const playlist = playlists.find((p) => p.id === Number(id));
  if (!playlist) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Плейлист не найден
      </div>
    );
  }

  const allTracks = artists.flatMap((a) => a.tracks);
  const tracks = playlist.trackIds.map((tid) => allTracks.find((t) => t.id === tid)).filter(Boolean) as typeof allTracks;

  const cover =
    playlist.cover ||
    (tracks.length > 0 ? tracks[tracks.length - 1].cover : undefined) ||
    "";

  const isPlaylistPlaying = currentTrack && tracks.some((t) => t.id === currentTrack.id) && isPlaying;

  const playPlaylist = () => {
    if (isPlaylistPlaying) {
      setIsPlaying(false);
    } else if (currentTrack && tracks.some((t) => t.id === currentTrack.id)) {
      setIsPlaying(true);
    } else if (tracks[0]) {
      setCurrentTrack(tracks[0]);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-safe">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад
      </button>

      <div className="flex items-end gap-6 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-highlight/10 p-6">
        <div className="h-44 w-44 shrink-0 overflow-hidden rounded-xl border-2 border-border shadow-lg">
          {cover ? (
            <img src={cover} alt={playlist.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Music className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Плейлист</p>
          <h1 className="text-4xl font-bold">{playlist.name}</h1>
          <p className="text-sm text-muted-foreground">Aura User • {tracks.length} треков</p>
          <button
            onClick={playPlaylist}
            className="mt-2 flex h-10 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            {isPlaylistPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 pl-0.5" />}
            {isPlaylistPlaying ? "Пауза" : "Слушать"}
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {tracks.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
            В этом плейлисте пока нет треков
          </div>
        )}
        {tracks.map((track, i) => (
          <TrackRow
            key={track.id}
            track={track}
            index={i + 1}
            onArtistClick={(name) => navigate(`/artist/${encodeURIComponent(name)}`)}
          />
        ))}
      </div>
    </div>
  );
}
