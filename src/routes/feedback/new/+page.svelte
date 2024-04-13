<script>
	import api from "$lib/api/feedback.js";
	import Navbar from "../../../interfaces/navbar/navbar.svelte";
</script>

<Navbar page="new" />
<main>
	<h1>New Feedback</h1>

	<form
		class="rounded border border-slate-500 p-4 m-4 w-screen max-w-screen-md"
		on:submit|preventDefault={async function() {
			const form = document.querySelector("form");
			const formData = new FormData(form);
			const data = Object.fromEntries(formData.entries());
			console.log(data);
			let resp = await api.addFeedback(data);
			console.log(resp);
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
