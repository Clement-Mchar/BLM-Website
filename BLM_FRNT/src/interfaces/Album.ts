import { DateTime } from "luxon";
export interface Album {
  id: string;
  name: string;
  date: DateTime;
  cover?: File;
  link?: string;
  artistIds: string[];
}

export interface CreateAlbum {
  name: string;
  date: string;
  cover?: File;
  link?: string;
  artistIds: string[];
}
