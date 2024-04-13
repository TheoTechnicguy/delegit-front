<script>
	import FeedbackList from "../interfaces/feedback/FeedbackList.svelte";
	import Navbar from "../interfaces/navbar/navbar.svelte";
	import api from "$lib/api/feedback.js";
</script>

<Navbar />
<main>
	<h1>SINF Deleg'it</h1>

	{#await api.getAllFeedback()}
		<div class="flex flex-col justify-center items-center">
			<div
				class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white m-3 p-3"
				role="status"
			>
				<span
					class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
					>Loading...</span
				>
			</div>
			<p>Loading Feedback...</p>
		</div>
	{:then feedback}
		<FeedbackList {feedback} />
	{:catch error}
		<div class="max-w-screen-sm w-screen p-4">
			<p class="text-xl text-center m-6">Whoops! Something went wrong...</p>
			<details>
				<summary class="list-none text-center align-middle">
					Failed to load feedback
					<span class="text-slate-400 text-sm align-middle cursor-pointer">(detail)</span>
				</summary>
				<p class="rounded mt-2 p-4 bg-slate-800 bg-opacity-80">{error.message}</p>
			</details>
		</div>
	{/await}
</main>
