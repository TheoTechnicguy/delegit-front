/**
 * @file frontend/src/lib/api/feedback.js
 * @author theo technicguy
 * @license apache-2.0
 * @abstract API functions for feedback
 */

import Feedback from "../objects/feedback.js";

/**
 * The API URL
 * @type {string}
 */
const API_URL = "http://localhost:41990/api";

/**
 * Fetch all feedback from API
 * @returns {Promise<Array<Feedback>>}
 */
async function getAllFeedback() {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/feedback`)
			.then(response => response.json())
			.then(data => {
				let feedbackArray = [];
				for (const feedbackData of data) {
					let feedback = new Feedback(
						feedbackData.ID,
						feedbackData.Course,
						feedbackData.Feedback,
						feedbackData.Upvotes,
						feedbackData.Downvotes
					);
					feedbackArray.push(feedback);
				}
				resolve(feedbackArray);
			})
			.catch(error => reject(error));
	})
}

/**
 * Fetch feedback matching ID from API
 * @param {number} id
 * @returns {Promise<{
 * 	 ID: number,
 * 	 Course: string
 *   Feedback: string,
 *   Upvotes: number,
 *   Downvotes: number
 * }>}
 */
async function getFeedbackById(id) {
	const response = await fetch(`${API_URL}/feedback/${id}`);
	return response.json();
}

/**
 * Add feedback to API
 * @param {{
 * 	 ID: number,
 * 	 Course: string
 *   Feedback: string,
 *   Upvotes: number,
 *   Downvotes: number
 * }} feedback
 * @returns {Promise<{
 * 	 ID: number,
 * 	 Course: string
 *   Feedback: string,
 *   Upvotes: number,
 *   Downvotes: number
 * }>}
 */
async function addFeedback(feedback) {
	const response = await fetch(`${API_URL}/feedback`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(feedback)
	});
	return response.json();
}

/**
 * Upvote feedback matching ID from API
 * @param {number} id
 * @returns {Promise<{
 * 	 ID: number,
 * 	 Course: string
 *   Feedback: string,
 *   Upvotes: number,
 *   Downvotes: number
 * }>}
 */
async function upvoteFeedback(id) {
	console.log("upvoteFeedback" + " " + id);
	const response = await fetch(`${API_URL}/feedback/${id}/upvote`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: "1"
	});
	return response.json();
}

/**
 * Downvote feedback matching ID from API
 * @param {number} id
 * @returns {Promise<{
 * 	 ID: number,
 * 	 Course: string
 *   Feedback: string,
 *   Upvotes: number,
 *   Downvotes: number
 * }>}
 */
async function downvoteFeedback(id) {
	const response = await fetch(`${API_URL}/feedback/${id}/downvote`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: "1"
	});
	return response.json();
}

/**
 * Delete feedback matching ID from API
 * @param {number} id
 * @returns {Promise<{
 * 	 ID: number,
 * 	 Course: string
 *   Feedback: string,
 *   Upvotes: number,
 *   Downvotes: number
 * }>}
 */
async function deleteFeedback(id) {
	const response = await fetch(`${API_URL}/feedback/${id}`, {
		method: "DELETE"
	});
	return response.json();
}

export default {
	getAllFeedback,
	getFeedbackById,
	addFeedback,
	upvoteFeedback,
	downvoteFeedback,
	deleteFeedback
};
