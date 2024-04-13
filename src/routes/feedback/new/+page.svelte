<script>
	import api from "$lib/api/feedback.js";
	import Error from "$lib/api/error.js";
	import Feedback from "$lib/objects/feedback.js";
	import Navbar from "../../../interfaces/navbar/navbar.svelte";

	/**
	 * @type {Error[]}
	 */
	let errors = [];
</script>

<Navbar page="new" />
<main>
	<h1>New Feedback</h1>

	{#each errors as err}
		<div class="rounded border-2 border-purple-600 m-2 p-2 w-full bg-purple-600 bg-opacity-20">
			<p class="font-semibold">{err.summary}</p>
			<p>{err.detail}</p>
		</div>
	{/each}

	<form
		class="rounded border border-slate-500 p-4 m-4 w-screen max-w-screen-md"
		on:submit|preventDefault={async function () {
			const form = document.querySelector("form");
			if (form === null) {
				errors.push(new Error("No form found", ""));
				return;
			}

			const formData = new FormData(form);

			Feedback.fromForm(formData)
				.then((feedback) => {
					api
						.addFeedback(feedback)
						.then(() => {
							window.location.assign("/");
						})
						.catch((error) => {
							errors = error;
						});
				})
				.catch((error) => {
					errors.push(error);
				});
		}}
	>
		<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
			<div class="sm:col-span-full">
				<label for="Course">Course Code</label>
				<div class="input">
					<input type="text" name="Course" placeholder="Course" />
				</div>
				<label for="Course">Feedback</label>
				<div class="input">
					<textarea name="Feedback" placeholder="This course is ..." />
				</div>
			</div>
		</div>
		<div class="mt-6 flex items-center justify-center gap-x-6">
			<button
				type="button"
				class="hover:border-purple-500"
				on:click|preventDefault|stopPropagation={() => window.history.back()}>Cancel</button
			>
			<button type="submit" class="bg-amber-500 hover:bg-amber-400">Save</button>
		</div>
	</form>
</main>

<style>
	input,
	textarea {
		@apply flex-1
			border-0
			bg-transparent
			w-full
			p-1.5
			text-slate-100
			placeholder:text-slate-400
			sm:text-sm
			sm:leading-6;
	}

	textarea {
		@apply min-h-24;
	}

	label {
		@apply block
			text-sm
			font-medium
			leading-6
			text-slate-100;
	}

	div.input {
		@apply flex
			my-2
			rounded-md
			w-full
			mb-4
			shadow-sm
			ring-1
			ring-inset
			ring-slate-500
			focus-within:ring-2
			focus-within:ring-inset
			focus-within:ring-indigo-600;
	}

	button {
		@apply rounded-md
			border-2
			border-transparent
			px-3
			py-2
			text-sm
			font-semibold
			text-white
			shadow-sm
			focus-visible:outline
			focus-visible:outline-2
			focus-visible:outline-offset-2
			focus-visible:outline-indigo-600;
	}
</style>
