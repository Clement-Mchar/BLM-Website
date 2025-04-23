import ky, { HTTPError } from "ky";
import type { KyInstance } from "ky";
import type { User } from "@/interfaces/User";
import type { Album } from "@/interfaces/Album";

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

  createUser(payload: { username: string; password: string; role: string }): Promise<User | null> {
    return this.#client.post("users", { json: payload }).json();
  }
  
  deleteUser(id: number): Promise<User | null> {
    return this.#client.delete(`users/${id}`).json();
  }

  getUserEdit(id: number): Promise<User | null> {
    return this.#client.get(`users/${id}/edit`).json();
  }

  editUser(id: number, payload: Partial<User>): Promise<User> {
    return this.#client.patch(`users/${id}`, { json: payload }).json();
  }

  getAlbums(): Promise<Album[]> {
    return this.#client.get("albums").json();
  }

  async getUsers(): Promise<User[]> {
    return await this.#client.get("users").json();
  }

  getArtists() {
    return this.#client.get("artists").json();
  }

  getTracks() {
    return this.#client.get("tracks").json();
  }

  getTracksOfAlbum(albumId: number) {
    return this.#client.get(`albums/${albumId}/tracks`).json();
  }
}

export const blmApi = new BlmApi();
