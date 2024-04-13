/**
 * @file src/api/error.js
 * @author theo technicguy
 * @license apache-2.0
 */

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

export default Error;
