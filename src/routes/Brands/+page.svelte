<script lang="ts">
	import CreateDialog from './CreateDialog.svelte';
	import DeleteDialog from '$lib/conponents/DeleteDialog.svelte';

	import type { PageData } from './$types';
	import { writable } from 'svelte/store';

	export let data: PageData;

	const deleteFlag = writable(false);
	const target = writable('');
	const createFlag = writable(false);
</script>

<main class="full flex w-full flex-col items-center bg-gray-800">
	<div class="w-2/5">
		<button
			class="mt-2 h-14 w-full rounded-lg bg-gray-500 px-4 py-2 text-left text-base font-bold"
			on:click={() => {
				$createFlag = true;
			}}
		>
			+ New Product
		</button>
	</div>
	<div class="no-scrollbar mt-2 flex h-4/5 w-2/5 flex-col space-y-2 overflow-auto">
		{#each data.brands as brand}
			<div
				class="flex flex-row items-center justify-between space-x-5 rounded-lg bg-gray-500 py-2 px-4"
			>
				<span class="align-middle text-base font-bold">
					{brand.brandName}
				</span>
				<div class="flex flex-row items-center space-x-4">
					<a
						class="h-10 w-fit rounded-lg bg-cyan-800 px-3 pt-1 text-xl font-semibold text-white"
						href="/Products?productBrand={brand.brandName}"
						role="button"
						>{brand._count.products} Products
					</a>
					<button
						class="h-10 w-fit rounded-lg bg-red-800 px-3 pb-1 text-xl font-semibold text-white"
						type="button"
						on:click={() => {
							$deleteFlag = true;
							$target = brand.brandName;
						}}
						>Delete
					</button>
				</div>
			</div>
		{/each}
	</div>

	<DeleteDialog
		bind:dialogFlag={$deleteFlag}
		action="?/deleteBrand&brandName={$target}"
		message="You're about to delete {$target} and all products it has."
	/>
	<CreateDialog {data} bind:dialogFlag={$createFlag} />
</main>

<style>
	/*  */
</style>
