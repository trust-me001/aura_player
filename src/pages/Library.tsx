import { useState } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { TrackRow } from "@/components/TrackRow";
import { useNavigate } from "react-router-dom";
import { Clock, Search } from "lucide-react";

export default function Library() {
  const { artists } = usePlayerStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const allTracks = artists.flatMap((a) => a.tracks);
  const filtered = query.trim()
    ? allTracks.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.artist.toLowerCase().includes(query.toLowerCase())
      )
    : allTracks;

  return (
    <div className="space-y-6 animate-fade-in-safe">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Поиск треков и исполнителей..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none ring-primary transition-shadow placeholder:text-muted-foreground focus:ring-2"
        />
      </div>

      {/* Artists */}
      <section>
        <h2 className="mb-3 text-lg font-bold">Исполнители</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {artists.map((artist) => (
            <div
              key={artist.name}
              onClick={() => navigate(`/artist/${encodeURIComponent(artist.name)}`)}
              className="cursor-pointer space-y-2 rounded-xl border border-border bg-card p-3 text-center transition-colors hover:bg-muted"
            >
              <div className="mx-auto aspect-square w-full overflow-hidden rounded-full border-2 border-border">
                <img src={artist.cover} alt={artist.name} className="h-full w-full object-cover" />
              </div>
              <p className="truncate text-sm font-medium">{artist.name}</p>
              <p className="text-xs text-muted-foreground">Исполнитель</p>
            </div>
          ))}
        </div>
      </section>

      {/* All tracks */}
      <section>
        <h2 className="mb-3 text-lg font-bold">All tracks</h2>
        <div className="mb-3 flex items-center gap-4 border-b border-border pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="w-8 text-center">#</span>
          <span className="flex-1">Название</span>
          <Clock className="h-3.5 w-3.5" />
        </div>
        <div className="space-y-1">
          {filtered.map((track, i) => (
            <TrackRow
              key={track.id}
              track={track}
              index={i + 1}
              onArtistClick={(name) => navigate(`/artist/${encodeURIComponent(name)}`)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Ничего не найдено
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
