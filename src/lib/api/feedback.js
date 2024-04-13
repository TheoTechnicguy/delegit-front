/**
 * @file frontend/src/lib/api/feedback.js
 * @author theo technicguy
 * @license apache-2.0
 * @abstract API functions for feedback
 */

import client from "./client.js";
import Feedback from "../objects/feedback.js";

/**
 * Fetch all feedback from API
 * @returns {Promise<Feedback[]>}
 */
async function getAllFeedback() {
	return new Promise((resolve, reject) => {
		client
			.get(client.getURLFor("/feedback"))
			.then((response) => response.json())
			.then((data) => {
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
			.catch((error) => reject(error));
	});
}

/**
 * Fetch feedback matching ID from API
 * @param {number} id
 * @returns {Promise<Feedback>}
 */
async function getFeedbackById(id) {
	return new Promise((resolve, reject) => {
		client
			.get(client.getURLFor(`/feedback/${id}`))
			.then((response) => response.json())
			.then((data) => {
				let feedback = new Feedback(
					data.ID,
					data.Course,
					data.Feedback,
					data.Upvotes,
					data.Downvotes
				);
				resolve(feedback);
			})
			.catch((error) => reject(error));
	});
}

/**
 * Add feedback to API
 * @param {Feedback} feedback
 * @returns {Promise<Feedback>}
 */
async function addFeedback(feedback) {
	return new Promise((resolve, reject) => {
		client
			.post(client.getURLFor("/feedback"), JSON.stringify(feedback.toJSON()))
			.then((response) => response.json())
			.then((data) => {
				let feedback = new Feedback(
					data.ID,
					data.Course,
					data.Feedback,
					data.Upvotes,
					data.Downvotes
				);
				resolve(feedback);
			})
			.catch((error) => reject(error));
	});
}

/**
 * Upvote feedback matching ID from API
 * @param {number} id
 * @returns {Promise<Feedback>}
 */
async function upvoteFeedback(id) {
	return new Promise((resolve, reject) => {
		client
			.patch(client.getURLFor(`/feedback/${id}/upvote`), "1")
			.then((response) => response.json())
			.then((data) => {
				let feedback = new Feedback(
					data.ID,
					data.Course,
					data.Feedback,
					data.Upvotes,
					data.Downvotes
				);
				resolve(feedback);
			})
			.catch((error) => reject(error));
	});
}

/**
 * Downvote feedback matching ID from API
 * @param {number} id
 * @returns {Promise<Feedback>}
 */
async function downvoteFeedback(id) {
	return new Promise((resolve, reject) => {
		client
			.patch(client.getURLFor(`/feedback/${id}/downvote`), "1")
			.then((response) => response.json())
			.then((data) => {
				let feedback = new Feedback(
					data.ID,
					data.Course,
					data.Feedback,
					data.Upvotes,
					data.Downvotes
				);
				resolve(feedback);
			})
			.catch((error) => reject(error));
	});
}

/**
 * Delete feedback matching ID from API
 * @param {number} id
 * @returns {Promise<Feedback>}
 */
async function deleteFeedback(id) {
	return new Promise((resolve, reject) => {
		client
			.delete(client.getURLFor(`/feedback/${id}`))
			.then((response) => response.json())
			.then((data) => {
				let feedback = new Feedback(
					data.ID,
					data.Course,
					data.Feedback,
					data.Upvotes,
					data.Downvotes
				);
				resolve(feedback);
			})
			.catch((error) => reject(error));
	});
}

export default {
	getAllFeedback,
	getFeedbackById,
	addFeedback,
	upvoteFeedback,
	downvoteFeedback,
	deleteFeedback
};
