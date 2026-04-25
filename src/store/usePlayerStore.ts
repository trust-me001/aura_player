import { create } from "zustand";
import { Track, Playlist } from "@/lib/types";

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffle: boolean;
  isRepeat: boolean;
  queue: Track[];
  playlists: Playlist[];
  artists: { name: string; cover: string; tracks: Track[] }[];

  setCurrentTrack: (track: Track | null) => void;
  togglePlay: () => void;
  setIsPlaying: (val: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (dur: number) => void;
  setVolume: (vol: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  playNext: () => void;
  playPrev: () => void;
  addToQueue: (track: Track) => void;
  setPlaylists: (pls: Playlist[]) => void;
  createPlaylist: (name: string) => void;
  renamePlaylist: (id: number, name: string) => void;
  deletePlaylist: (id: number) => void;
  updatePlaylistCover: (id: number, cover: string) => void;
}

const DEMO_TRACKS: Track[] = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: 200, cover: "https://i.scdn.co/image/ab67616d00001e02886d4d97f2e68c37a7e5c335" },
  { id: 2, title: "Starboy", artist: "The Weeknd", album: "Starboy", duration: 230, cover: "https://i.scdn.co/image/ab67616d00001e024718e2b124f79258be7bc452" },
  { id: 3, title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", duration: 215, cover: "https://i.scdn.co/image/ab67616d00001e02886d4d97f2e68c37a7e5c335" },
  { id: 4, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: 203, cover: "https://i.scdn.co/image/ab67616d00001e02bd26ede1ae69327010d49946" },
  { id: 5, title: "Don't Start Now", artist: "Dua Lipa", album: "Future Nostalgia", duration: 183, cover: "https://i.scdn.co/image/ab67616d00001e02bd26ede1ae69327010d49946" },
  { id: 6, title: "New Rules", artist: "Dua Lipa", album: "Dua Lipa", duration: 209, cover: "https://i.scdn.co/image/ab67616d00001e023e4c98c3fae73f6a2043b991" },
  { id: 7, title: "Bad Guy", artist: "Billie Eilish", album: "WHEN WE ALL FALL ASLEEP", duration: 194, cover: "https://i.scdn.co/image/ab67616d00001e0250a3147e4bb31aff94e34b2d" },
  { id: 8, title: "Therefore I Am", artist: "Billie Eilish", album: "Happier Than Ever", duration: 174, cover: "https://i.scdn.co/image/ab67616d00001e022a038d3bf875d23e4aeaa84e" },
  { id: 9, title: "Happier Than Ever", artist: "Billie Eilish", album: "Happier Than Ever", duration: 298, cover: "https://i.scdn.co/image/ab67616d00001e022a038d3bf875d23e4aeaa84e" },
  { id: 10, title: "Anti-Hero", artist: "Taylor Swift", album: "Midnights", duration: 200, cover: "https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5" },
  { id: 11, title: "Cruel Summer", artist: "Taylor Swift", album: "Lover", duration: 178, cover: "https://i.scdn.co/image/ab67616d00001e02e787b6a7dfe09ae376685c84" },
  { id: 12, title: "Blank Space", artist: "Taylor Swift", album: "1989", duration: 231, cover: "https://i.scdn.co/image/ab67616d00001e0237e518d643a2193d0a96a6bb" },
];

function buildArtists(tracks: Track[]) {
  const map = new Map<string, Track[]>();
  for (const t of tracks) {
    const list = map.get(t.artist) || [];
    list.push(t);
    map.set(t.artist, list);
  }
  return Array.from(map.entries()).map(([name, tracks]) => ({
    name,
    cover: tracks[0]?.cover || "",
    tracks,
  }));
}

function fallbackCover(pl: Playlist, allTracks: Track[]) {
  if (pl.cover) return pl.cover;
  for (let i = pl.trackIds.length - 1; i >= 0; i--) {
    const t = allTracks.find((x) => x.id === pl.trackIds[i]);
    if (t) return t.cover;
  }
  return "";
}

const DEMO_PLAYLISTS: Playlist[] = [
  { id: 101, name: "Chill Vibes", cover: "", trackIds: [1, 3, 7] },
  { id: 102, name: "Workout", cover: "", trackIds: [4, 5, 2] },
  { id: 103, name: "Late Night", cover: "", trackIds: [7, 8, 9] },
];

const allTracks = DEMO_TRACKS;

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  isShuffle: false,
  isRepeat: false,
  queue: [],
  artists: buildArtists(DEMO_TRACKS),
  playlists: DEMO_PLAYLISTS.map((p) => ({ ...p, cover: fallbackCover(p, DEMO_TRACKS) })),

  setCurrentTrack: (track) => set({ currentTrack: track, duration: track?.duration || 0 }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setIsPlaying: (val) => set({ isPlaying: val }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (dur) => set({ duration: dur }),
  setVolume: (vol) => set({ volume: vol }),
  toggleShuffle: () => set((s) => ({ isShuffle: !s.isShuffle })),
  toggleRepeat: () => set((s) => ({ isRepeat: !s.isRepeat })),
  addToQueue: (track) => set((s) => ({ queue: [...s.queue, track] })),

  playNext: () => {
    const { currentTrack, queue, isShuffle, isRepeat } = get();
    if (isRepeat && currentTrack) {
      set({ currentTime: 0, isPlaying: true });
      return;
    }
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      set({ currentTrack: next, queue: rest, duration: next.duration, isPlaying: true });
      return;
    }
    if (!currentTrack) {
      const first = allTracks[0];
      if (first) set({ currentTrack: first, duration: first.duration, isPlaying: true });
      return;
    }
    const idx = allTracks.findIndex((t) => t.id === currentTrack.id);
    if (isShuffle) {
      const next = allTracks[Math.floor(Math.random() * allTracks.length)];
      set({ currentTrack: next, duration: next.duration, isPlaying: true });
      return;
    }
    const next = allTracks[idx + 1] || allTracks[0];
    set({ currentTrack: next, duration: next.duration, isPlaying: true });
  },

  playPrev: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    const idx = allTracks.findIndex((t) => t.id === currentTrack.id);
    const prev = allTracks[idx - 1] || allTracks[allTracks.length - 1];
    set({ currentTrack: prev, duration: prev.duration, isPlaying: true });
  },

  setPlaylists: (pls) => set({ playlists: pls }),
  createPlaylist: (name) => {
    const pl: Playlist = { id: Date.now(), name, cover: "", trackIds: [] };
    set((s) => ({ playlists: [...s.playlists, pl] }));
  },
  renamePlaylist: (id, name) =>
    set((s) => ({
      playlists: s.playlists.map((p) => (p.id === id ? { ...p, name } : p)),
    })),
  deletePlaylist: (id) =>
    set((s) => ({
      playlists: s.playlists.filter((p) => p.id !== id),
    })),
  updatePlaylistCover: (id, cover) =>
    set((s) => ({
      playlists: s.playlists.map((p) => (p.id === id ? { ...p, cover } : p)),
    })),
}));
