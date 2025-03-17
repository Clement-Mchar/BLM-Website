import type { Artist } from "@/interfaces/Artist";
import type { Track } from "@/interfaces/Track";

export interface Album {
  id: string;
  name: string;
  date: string;
  coverUrl: string | null;
  spotifyLink: string | null;
  createdAt: string;
  updatedAt: string;
  artists: Artist[];
  tracks: Track[];
}
