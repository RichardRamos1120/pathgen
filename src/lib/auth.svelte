<script>
	import { onMount } from 'svelte';
	let nameKo = 'chad';

	onMount(async () => {
		const res = await fetch(`/tutorial/api/album`);
		photos = await res.json();
	});
</script>