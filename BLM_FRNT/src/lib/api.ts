import ky from 'ky';
import type { KyInstance } from 'ky';
import { ref } from 'vue';

class BlmApi {
  #client: KyInstance

  #extractCsrfToken(request: Request) {
    const token = document.cookie
      ?.split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];
    if (token) {
      request.headers.set("X-XSRF-TOKEN", decodeURIComponent(token));
      return;
    } else {
      console.warn('CSRF token missing')
    }
  }

  constructor() {
    this.#client = ky.extend({
      prefixUrl: "http://localhost:3333/api/",
      hooks: { beforeRequest: [this.#extractCsrfToken] },
    });
  }

  login(payload: {username: string; password: string}) {
    return this.#client.post('login', {
      json: payload,
      credentials: 'include',
    }).json();
  }

  getAlbums() {
    return this.#client.get('albums').json();
  }

  getArtists() {
    return this.#client.get('artists').json();
  }

  getTracks() {
    return this.#client.get('tracks').json();
  }

  getTracksOfAlbum(albumId: number) {
    return this.#client.get(`albums/${albumId}/tracks`).json();
  }
}

export const blmApi = new BlmApi()