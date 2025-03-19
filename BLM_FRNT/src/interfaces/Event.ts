import type { Artist } from "./Artist";

export interface Event {
  id: string;
  name: string;
  eventPhotos: string | null;
  description: string | null;
  date: string;
  location: string;
  reservation: string | null;
  createdAt: string;
  updatedAd: string;
  artists: Artist[];
}
