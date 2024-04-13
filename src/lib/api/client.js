/**
 * @file src/lib/api/client.js
 * @author theo technicguy
 * @license apache-2.0
 * @abstract An overlay to the fetch API, customised for the application
 */

const PUBLIC_API_BASE = "http://localhost:41990/api";

class Error {
	/**
	 * A UX-friendly error
	 * @param {string} summary The error's summary
	 * @param {string} detail The error's detail
	 */
	constructor(summary, detail) {
		this.summary = summary;
		this.detail = detail;
	}
}

class Client {
	/**
	 * A wrapper for the fetch API
	 * @param {string} baseURL The base URL for the API
	 */
	constructor(baseURL) {
		this.API_BASE = baseURL;
	}

	/**
	 * Get the full URL for a given path
	 * @param {string} path The '/' prefixed path
	 * @returns {string} The full URL
	 */
	getURLFor(path) {
		return `${this.API_BASE}${path}`;
	}

	/**
	 * Fill in the request with standard options
	 * @param {Request} request The request to process
	 * @returns {Request}
	 */
	fillRequest(request) {
		if (request.url.startsWith("/")) {
			const {
				cache,
				credentials,
				headers,
				integrity,
				method,
				mode,
				redirect,
				referrer,
				referrerPolicy,
				body
			} = request;
			request = new Request(this.getURLFor(request.url), {
				cache,
				credentials,
				headers,
				integrity,
				method,
				mode,
				redirect,
				referrer,
				referrerPolicy,
				body
			});
		}

		return request;
	}

	/**
	 * Execute a request to the API
	 * @param {Request} request The request to process
	 * @returns {Promise<any>}
	 */
	async execute(request) {
		return new Promise((resolve, reject) => {
			fetch(this.fillRequest(request))
				.then(async function (response) {
					if (!response.ok) {
						let errors = [];
						let responseErrors = await response.json();

						for (const err of responseErrors) {
							errors.push(new Error(err.Summary, err.Detail));
						}
						reject(errors);
					}
					resolve(response);
				})
				.catch((error) => {
					reject(new Error("Failed to fetch", error.message));
				});
		});
	}

	/**
	 * Run a GET request to the API
	 * @param {string} path The endpoint to fetch
	 * @returns {Promise<any>}
	 */
	async get(path) {
		return this.execute(new Request(path, { method: "GET" }));
	}

	/**
	 * Run a POST request to the API
	 * @param {string} path The endpoint to fetch
	 * @param {any} body The body to send
	 * @returns {Promise<any>}
	 */
	async post(path, body, contentType = "application/json") {
		return this.execute(
			new Request(path, { method: "POST", body, headers: { "Content-Type": contentType } })
		);
	}

	/**
	 * Run a PUT request to the API
	 * @param {string} path The endpoint to fetch
	 * @param {any} body The body to send
	 * @returns {Promise<any>}
	 */
	async put(path, body, contentType = "application/json") {
		return this.execute(
			new Request(path, { method: "PUT", body, headers: { "Content-Type": contentType } })
		);
	}

	/**
	 * Run a DELETE request to the API
	 * @param {string} path The endpoint to fetch
	 * @returns {Promise<any>}
	 */
	async delete(path) {
		return this.execute(new Request(path, { method: "DELETE" }));
	}

	/**
	 * Run a PATCH request to the API
	 * @param {string} path The endpoint to fetch
	 * @param {any} body The body to send
	 * @returns {Promise<any>}
	 */
	async patch(path, body, contentType = "application/json") {
		return this.execute(
			new Request(path, { method: "PATCH", body, headers: { "Content-Type": contentType } })
		);
	}

	/**
	 * Run a HEAD request to the API
	 * @param {string} path The endpoint to fetch
	 * @returns {Promise<any>}
	 */
	async head(path) {
		return this.execute(new Request(path, { method: "HEAD" }));
	}

	/**
	 * Run an OPTIONS request to the API
	 * @param {string} path The endpoint to fetch
	 * @returns {Promise<any>}
	 */
	async options(path) {
		return this.execute(new Request(path, { method: "OPTIONS" }));
	}
}

const client = new Client(PUBLIC_API_BASE);

export default client;
