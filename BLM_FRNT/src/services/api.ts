import ky, { HTTPError } from "ky";
import type { KyInstance } from "ky";
import type { User } from "@/types/User";
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
	async getCurrentUser(): Promise<User | null> {
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

	getAlbums() {
		return this.#client.get("albums").json();
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
