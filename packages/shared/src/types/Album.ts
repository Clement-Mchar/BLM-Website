import { DateTime } from "luxon";
import type { UploadedFile } from "./UploadedFile";
export interface Album {
  id: string;
  name: string;
  date: DateTime;
  cover?: UploadedFile;
  link?: string;
  artistIds?: string[];
}

export interface CreateAlbum {
  name: string;
  date: string;
  cover?: File;
  link?: string;
  artistIds: string[];
}
