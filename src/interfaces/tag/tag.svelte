<script>
	/**
	 * The course code to display.
	 * @type {string}
	 */
	export let Course;

	/**
	 * The course name to display.
	 * @type {number}
	 */
	export let Colour = -1;

	if (Colour === -1) {
		crypto.subtle.digest("SHA-1", new TextEncoder().encode(Course))
			.then((hash) => {
				Colour = new DataView(hash).getUint32(0, false)}
			)
			.catch(console.error);
	}

	/**
	 * Converts a colour in RGB integer format to a CSS colour string.
	 * @param colour {number} The colour to convert.
	 */
	function colour2rgb(colour) {
		return `rgb(${colour >> 16 & 0xFF}, ${colour >> 8 & 0xFF}, ${colour & 0xFF})`;
	}
</script>

<style>
	.course {
		@apply px-3 py-1 mx-1 my-1 rounded-full justify-center text-sm;
	}
</style>

<a
	href="/tag/{Course}"
	on:click|preventDefault|stopPropagation={() => {
		window.location.href = `/tag/${Course}`;
	}}
	class="course"
	style="background-color: {colour2rgb(Colour)}"
>
	{Course.toUpperCase()}
</a>
