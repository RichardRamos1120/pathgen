<script>

	import {isLoggedIn} from '../../../stores/authStore';
</script>

{#if $isLoggedIn === true}
<slot></slot>
{/if}

<style></style>