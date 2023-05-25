<script lang="ts">
	import AdjustableColumn from './AdjustableColumn.svelte';
	import TableTest from './TableTest.svelte';
	import TableCell from './TableCell.svelte';
	import TailwindTest from './TailwindTest.svelte';

	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<main class="h-fit w-full max-w-full">
	<h3 class="mx-auto w-fit text-[30px]">lots of div</h3>
	<AdjustableColumn />
	<h3 class="mx-auto w-fit text-[30px]">{`<table> tag`}</h3>
	<TableTest />
	<h3 class="mx-auto w-fit text-[30px]">display: table</h3>
	<TableCell />
	<!-- <TailwindTest /> -->

	<!-- <form action="?/dummyData" method="post" use:enhance>
		<button
			class="mt-5 h-10 w-fit rounded-2xl bg-cyan-800 px-3 pb-1 text-xl font-semibold"
			type="submit"
		>
			dummyData
		</button>
	</form> -->
</main>
