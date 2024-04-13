<script>
	import { IconChevronUp, IconChevronDown } from "@tabler/icons-svelte";
	import Feedback from "$lib/objects/feedback.js";
	import Tag from "../tag/tag.svelte";

	/**
	 * @abstract The feedback entry.
	 * @type {Feedback}
	 */
	export let feedback;

	const voteCast = feedback.voteCast;
	const upvotes = feedback.Upvotes;
	const downvotes = feedback.Downvotes;
</script>

<div
	class="container inline-flex justify-between rounded w-screen max-w-screen-md max-h-96 m-2 px-2 py-2 border border-slate-400"
>
	<div class="flex-col justify-evenly text-left max-w-2xl">
		<div class="inline-flex flex-row justify-normal overflow-scroll mb-2 max-w-full">
			<Tag Course={feedback.Course} />
		</div>
		<div class="px-2 overflow-clip w-full max-w-full max-h-96">
			<a
				class="w-full"
				href="/feedback/{feedback.ID}"
				on:click|preventDefault|stopPropagation={() =>
					(window.location.href = `/feedback/${feedback.ID}`)}
				>{feedback.Feedback.length > 900
					? feedback.Feedback.slice(0, 900) + "..."
					: feedback.Feedback}
			</a>
		</div>
	</div>
	<div class="flex flex-col stroke-2 w-50">
		<button
			class="border-amber-500"
			class:bg-amber-500={$voteCast == 1}
			class:border-2={$voteCast == -1}
			title="I agree"
			on:click|preventDefault|stopPropagation={() => {
				feedback.upvote();
			}}
		>
			{#if $voteCast == 0}
				<IconChevronUp
					size="48"
					class="stroke-amber-500 hover:stroke-slate-100 hover:bg-amber-500 rounded"
				/>
			{:else}
				{feedback.votes() == 0 ? "0%" : (($upvotes / feedback.votes()) * 100).toFixed(0) + "%"}
			{/if}
		</button>
		<button
			class="border-purple-500"
			class:bg-purple-500={$voteCast == -1}
			class:border-2={$voteCast == 1}
			title="I disagree"
			on:click|preventDefault|stopPropagation={() => {
				feedback.downvote();
			}}
		>
			{#if $voteCast == 0}
				<IconChevronDown
					size="48"
					class="stroke-purple-500 hover:stroke-slate-100 hover:bg-purple-500 rounded"
				/>
			{:else}
				{feedback.votes() == 0 ? "0%" : (($downvotes / feedback.votes()) * 100).toFixed(0) + "%"}
			{/if}
		</button>
	</div>
</div>

<style>
	button {
		@apply size-12 font-bold m-1 rounded;
	}
</style>
