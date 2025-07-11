import ky, { HTTPError } from "ky";
import type { KyInstance } from "ky";
import type { ConfirmUserPayload, User } from "./types/User";
import type { Album, CreateAlbum } from "./types/Album";
import type { Artist, CreateArtist } from "./types/Artist";
import type { CreatePost, Post } from "./types/Post";
import type { CreateEvent, Event } from "./types/Event";
import type { CreateVideo, Video } from "./types/Video";

class BlmApi {
  #client: KyInstance;
  #extractCsrfToken(request: Request) {
    const token = document.cookie
      ?.split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];
    if (token) {
      request.headers.set("X-XSRF-TOKEN", decodeURIComponent(token));
      return;
    } else {
      console.warn("CSRF token missing");
    }
  }

  constructor() {
    this.#client = ky.extend({
      prefixUrl: "http://localhost:3333/api/",
      hooks: { beforeRequest: [this.#extractCsrfToken] },
      credentials: "include",
    });
  }

  login(payload: { username: string; password: string }) {
    return this.#client
      .post("login", {
        json: payload,
      })
      .json();
  }

  logout() {
    return this.#client.post("logout");
  }

  private async getCurrentUser(): Promise<User | null> {
    try {
      return await this.#client.get("auth/me").json<User | null>();
    } catch (e: unknown) {
      if (e instanceof HTTPError && e.response.status === 401) {
        return null;
      }
      throw e;
    }
  }

  async setCurrentUser(): Promise<User | null> {
    const user = await this.getCurrentUser();

    return user;
  }

  createUser(payload: ConfirmUserPayload): Promise<User | null> {
    return this.#client.post("users", { json: payload }).json();
  }

  deleteUser(id: number): Promise<User | null> {
    return this.#client.delete(`users/${id}`).json();
  }

  deleteUsers(ids: number[]): Promise<void> {
    return this.#client
      .post("users/delete-many", {
        json: { ids },
      })
      .json();
  }
  getUserEdit(id: number): Promise<User | null> {
    return this.#client.get(`users/${id}/edit`).json();
  }
  getUser(id: number): Promise<User | null> {
    return this.#client.get(`users/${id}`).json();
  }
  editUser(id: number, payload: Partial<User>): Promise<User> {
    return this.#client.patch(`users/${id}`, { json: payload }).json();
  }
  async getUsers(): Promise<User[]> {
    return await this.#client.get("users").json();
  }
  getAlbums(): Promise<Album[]> {
    return this.#client.get("albums").json();
  }

  async getArtists(): Promise<Artist[]> {
    return await this.#client.get("artists").json();
  }

  createArtist(payload: CreateArtist): Promise<Artist | null> {
    const formData = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      if (value == null) continue;

      formData.append(key, value instanceof File ? value : String(value));
    }
    return this.#client
      .post("artists", {
        body: formData,
      })
      .json();
  }
  getArtist(id: string): Promise<Artist | null> {
    return this.#client.get(`artists/${id}`).json();
  }
  deleteArtist(id: string): Promise<Artist | null> {
    return this.#client.delete(`artists/${id}`).json();
  }
  deleteArtists(ids: string[]): Promise<void> {
    return this.#client
      .post("artists/delete-many", {
        json: { ids },
      })
      .json();
  }
  getArtistEdit(id: string): Promise<Artist | null> {
    return this.#client.get(`artists/${id}/edit`).json();
  }
  editArtist(id: string, payload: Partial<Artist>): Promise<Artist> {
    return this.#client.patch(`artists/${id}`, { json: payload }).json();
  }
  editArtistAvatar(id: string, payload: FormData): Promise<Artist> {
    return this.#client
      .patch(`artists/${id}/`, {
        body: payload,
      })
      .json();
  }
  createAlbum(payload: CreateAlbum): Promise<Album | null> {
    const formData = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      if (value == null) continue;

      formData.append(key, value instanceof File ? value : String(value));
    }
    return this.#client
      .post("albums", {
        body: formData,
      })
      .json();
  }
  getAlbum(id: string): Promise<Album | null> {
    return this.#client.get(`albums/${id}`).json();
  }
  deleteAlbum(id: string): Promise<Album | null> {
    return this.#client.delete(`albums/${id}`).json();
  }
  deleteAlbums(ids: string[]): Promise<void> {
    return this.#client
      .post("albums/delete-many", {
        json: { ids },
      })
      .json();
  }
  getAlbumEdit(id: string): Promise<Album | null> {
    return this.#client.get(`albums/${id}/edit`).json();
  }
  editAlbum(id: string, payload: Partial<Album>): Promise<Album> {
    return this.#client.patch(`albums/${id}`, { json: payload }).json();
  }
  editAlbumCover(id: string, payload: FormData): Promise<Album> {
    return this.#client
      .patch(`albums/${id}/`, {
        body: payload,
      })
      .json();
  }
  getPost(id: string): Promise<Post | null> {
    return this.#client.get(`posts/${id}`).json();
  }
  getPostEdit(id: string): Promise<Post | null> {
    return this.#client.get(`posts/${id}/edit`).json();
  }
  getPosts(): Promise<Post[]> {
    return this.#client.get(`posts/`).json();
  }
  createPost(payload: CreatePost): Promise<Post | null> {
    const formData = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      if (value == null) continue;

      formData.append(key, value instanceof File ? value : String(value));
    }
    return this.#client
      .post("posts", {
        body: formData,
      })
      .json();
  }
  deletePost(id: string): Promise<Post | null> {
    return this.#client.delete(`posts/${id}`).json();
  }
  deletePosts(ids: string[]): Promise<void> {
    return this.#client
      .post("posts/delete-many", {
        json: { ids },
      })
      .json();
  }
  editPost(id: string, payload: Partial<Post>): Promise<Post> {
    return this.#client.patch(`posts/${id}`, { json: payload }).json();
  }
  editPostHeader(id: string, payload: FormData): Promise<Post> {
    return this.#client
      .patch(`posts/${id}/`, {
        body: payload,
      })
      .json();
  }
  createEvent(payload: CreateEvent): Promise<Event | null> {
    const formData = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      if (value == null) continue;

      formData.append(key, value instanceof File ? value : String(value));
    }
    return this.#client
      .post("events", {
        body: formData,
      })
      .json();
  }

  deleteEvent(id: string): Promise<Event | null> {
    return this.#client.delete(`events/${id}`).json();
  }

  deleteEvents(ids: string[]): Promise<void> {
    return this.#client
      .post("events/delete-many", {
        json: { ids },
      })
      .json();
  }
  getEventEdit(id: string): Promise<Event | null> {
    return this.#client.get(`events/${id}/edit`).json();
  }
  getEvent(id: string): Promise<Event | null> {
    return this.#client.get(`events/${id}`).json();
  }
  editEvent(id: string, payload: Partial<Event>): Promise<Event> {
    return this.#client.patch(`events/${id}`, { json: payload }).json();
  }
  async getEvents(): Promise<Event[]> {
    return await this.#client.get("events").json();
  }
  createVideo(payload: CreateVideo): Promise<Video | null> {
    const formData = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      if (value == null) continue;

      formData.append(key, value instanceof File ? value : String(value));
    }
    return this.#client
      .post("videos", {
        body: formData,
      })
      .json();
  }

  deleteVideo(id: string): Promise<Video | null> {
    return this.#client.delete(`videos/${id}`).json();
  }

  deleteVideos(ids: string[]): Promise<void> {
    return this.#client
      .post("videos/delete-many", {
        json: { ids },
      })
      .json();
  }
  getVideoEdit(id: string): Promise<Video | null> {
    return this.#client.get(`videos/${id}/edit`).json();
  }
  getVideo(id: string): Promise<Video | null> {
    return this.#client.get(`videos/${id}`).json();
  }
  editVideo(id: string, payload: Partial<Video>): Promise<Video> {
    return this.#client.patch(`videos/${id}`, { json: payload }).json();
  }
  async getVideos(): Promise<Video[]> {
    return await this.#client.get("videos").json();
  }
}

export const blmApi = new BlmApi();
