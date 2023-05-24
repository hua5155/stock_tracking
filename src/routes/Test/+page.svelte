<script lang="ts">
	import AdjustableColumn from './AdjustableColumn.svelte';
	import TailwindTest from './TailwindTest.svelte';
	import TableTest from './TableTest.svelte';

	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<main class="flex h-full w-full items-center justify-center">
	<!-- <AdjustableColumn /> -->
	<!-- <TailwindTest /> -->

	<form action="?/dummyData" method="post" use:enhance>
		<button
			class="mt-5 h-10 w-fit rounded-2xl bg-cyan-800 px-3 pb-1 text-xl font-semibold"
			type="submit"
		>
			dummyData
		</button>
	</form>
</main>
