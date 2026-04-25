import create from 'zustand';

const useMusicStore = create((set) => ({
  tracks: [],
  currentTrack: null,
  isPlaying: false,
  currentPlaylistId: null,
  queue: [],
  shuffle: false,
  repeat: false,
  setTracks: (tracks) => set({ tracks }),
  playTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
  removeFromQueue: (trackId) => set((state) => ({ queue: state.queue.filter(track => track.id !== trackId) })),
  clearQueue: () => set({ queue: [] }),
  setPlaylist: (playlistId) => set({ currentPlaylistId: playlistId }),
}));

export default useMusicStore;