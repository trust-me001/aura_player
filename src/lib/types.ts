export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number; // seconds
  cover: string;
  filePath?: string;
}

export interface Playlist {
  id: number;
  name: string;
  cover: string;
  trackIds: number[];
}

export interface Artist {
  name: string;
  cover: string;
}
