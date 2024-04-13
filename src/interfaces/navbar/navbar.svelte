<script>
	let user = "John Doe";
	export let page = "home";
</script>

<style>
	a {
		@apply m-2 px-2 py-1 bg-blue-400 rounded hover:bg-blue-500 transition;
	}

	a.current {
		@apply bg-blue-500;

	}
</style>

<nav class="flex justify-between items-center bg-slate-500 p-4 mb-4">
	<h2 class="font-bold text-lg">SINF Deleg'it</h2>
	<div>
		<a
			class:current={page === "home"}
			href="/">Home</a
		>
		<a
			class:current={page === "new"}
			href="/feedback/new">New Feedback</a
		>
	</div>
	<div>
		Hi {user}!
	</div>
</nav>
