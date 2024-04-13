/**
 * @file src/lib/objects/feedback.js
 * @author theo technicguy
 * @license apache-2.0
 * @abstract The feedback object
 */

import { writable, get } from 'svelte/store';

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
		this.voted = writable(0);
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

	upvote() {
		if (get(this.voted) !== 0) {
			return;
		}

		this.Upvotes.update((n) => n + 1);
		this.voted.set(1);
	}

	downvote() {
		if (get(this.voted) !== 0) {
			return;
		}

		this.Downvotes.update((n) => n + 1);
		this.voted.set(-1);
	}
}

export default Feedback;
