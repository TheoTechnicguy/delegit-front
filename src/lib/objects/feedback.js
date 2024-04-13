/**
 * @file src/lib/objects/feedback.js
 * @author theo technicguy
 * @license apache-2.0
 * @abstract The feedback object
 */

import { writable, get } from "svelte/store";
import api from "../api/feedback.js";
import Error from "../api/error.js";

class Feedback {
	/**
	 * The feedback object
	 * @param {number} ID The feedback's unique ID
	 * @param {string} Course the course code
	 * @param {string} Feedback the course feedback
	 * @param {number} Upvotes the number of positive appreciations
	 * @param {number} Downvotes the number of negative appreciations
	 */
	constructor(ID, Course, Feedback, Upvotes, Downvotes) {
		this.ID = ID;
		this.Course = Course;
		this.Feedback = Feedback;
		this.Upvotes = writable(Upvotes);
		this.Downvotes = writable(Downvotes);
		this.voteCast = writable(0);
	}

	/**
	 * create a new feedback from form data.
	 * @param {FormData} formData The form data for the new feedback
	 * @returns {Promise<Feedback>}
	 */
	static fromForm(formData) {
		return new Promise((resolve, reject) => {
			let course = formData.get("Course")
			if (course === null) {
				reject(new Error("Course field not found", "No data was returned when accessing the course field of the form"))
				return
			}

			let feedback = formData.get("Feedback")
			if (feedback === null) {
				reject(new Error("Feedback field not found", "No data was returned when accessing the feedback field of the form"))
				return
			}

			resolve(new Feedback(0, course.toString(), feedback.toString(), 0, 0))
		})
	}

	/**
	 * Get the total number of appreciations
	 * @returns {number}
	 */
	votes() {
		return get(this.Upvotes) + get(this.Downvotes);
	}

	/**
	 * Get the value of the feedback
	 * @returns {number}
	 */
	value() {
		return get(this.Upvotes) - get(this.Downvotes);
	}

	/**
	 * Serialize the feedback object to a JSON object.
	 * @returns {object} The feedback object as a JSON object
	 */
	toJSON() {
		return {
			ID: this.ID,
			Course: this.Course,
			Feedback: this.Feedback,
			Upvotes: get(this.Upvotes),
			Downvotes: get(this.Downvotes)
		};
	}

	/**
	 * Send a positive appreciation to the feedback
	 * @returns null
	 */
	async upvote() {
		if (get(this.voteCast) !== 0) {
			return;
		}

		api
			.upvoteFeedback(this.ID)
			.then(() => {
				this.Upvotes.update((n) => n + 1);
				this.voteCast.set(1);
			})
			.catch((error) => {
				// TODO: show error somewhere else than in the console
				console.error(error);
			});
	}

	/**
	 * Send a negative appreciation to the feedback
	 * @returns null
	 */
	async downvote() {
		if (get(this.voteCast) !== 0) {
			return;
		}

		api
			.downvoteFeedback(this.ID)
			.then(() => {
				this.Downvotes.update((n) => n + 1);
				this.voteCast.set(-1);
			})
			.catch((error) => {
				// TODO: show error somewhere else than in the console
				console.error(error);
			});
	}
}

export default Feedback;
