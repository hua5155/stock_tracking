<script lang="ts">
	import AddBrand from './AddBrand.svelte';
	import DeleteBrand from './DeleteBrand.svelte';
	import { dialogFlag, dialogInfo, brandName } from './DeleteBrand.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="flex justify-center bg-gray-800">
	<DeleteBrand />
	<div class="flex h-fit w-fit flex-col">
		<AddBrand {data} />
	</div>

	<div class="no-scrollbar flex h-4/5 w-2/5 flex-col space-y-2 overflow-auto">
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
							$dialogFlag = true;
							$dialogInfo = brand.brandName;
							$brandName = brand.brandName;
						}}
						>Delete
					</button>
				</div>
			</div>
		{/each}
	</div>
</main>
