<script>
	import FeedbackListEntry from "./FeedbackListEntry.svelte";
	import Feedback from "$lib/objects/feedback.js";

	/**
	 * @abstract The list of feedbacks.
	 * @type {Feedback[]}
	 */
	export let feedback = [];

	$: feedback = feedback.sort((a, b) => b.votes() - a.votes());
</script>

<div class="flex flex-col items-center gap-4 m-2">
	{#each feedback as f (f.ID)}
		<FeedbackListEntry feedback={f} />
	{/each}
</div>
