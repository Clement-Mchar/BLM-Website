import { DateTime } from "luxon";

export interface Event {
  id: string;
  name: string;
  description?: string
  date?: DateTime;
  location: string;
  reservation?: string
  artistIds?: string[];
}

export interface CreateEvent {
  name: string;
  description?: string
  date?: string;
  location: string;
  reservation?: string
  artistIds?: string[];
}
