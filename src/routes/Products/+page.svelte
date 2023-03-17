<script lang="ts">
	import AddProduct from './AddProduct.svelte';
	import DeleteProduct from './DeleteProduct.svelte';
	import { dialogFlag, dialogInfo, productId } from './DeleteProduct.svelte';

	import type { PageData, ActionData } from './$types';
	import { z } from 'zod';
	import { enhance } from '$app/forms';

	export let data: PageData;
	// export let form: ActionData;
	// $: console.log('pageData :\n', data);
</script>

<main class="flex h-full w-full justify-center bg-gray-800">
	<DeleteProduct />

	<div class="flex h-fit w-fit flex-col">
		<AddProduct {data} />
	</div>

	<div class="no-scrollbar flex h-4/5 w-2/5 flex-col space-y-2 overflow-auto">
		{#each data.products as product}
			<div
				class="flex flex-row items-center justify-between space-x-5 rounded-lg bg-gray-500 py-2 px-4"
			>
				<span class="align-middle text-base font-bold">
					{product.productBrand}
					{product.productName}
					{product.productVariant}
				</span>
				<div class="flex flex-row items-center space-x-4">
					<span
						class="w-14 rounded-md bg-gray-200 px-2 pb-1 text-center align-middle text-base font-semibold text-black"
						>{product.price}
					</span>
					<span
						class="w-14 rounded-md bg-gray-200 px-2 pb-1 text-center align-middle text-base font-semibold text-black"
						>{product.stock}
					</span>
					<a
						class="h-10 w-fit rounded-lg bg-cyan-800 px-3 pt-1 text-xl font-semibold text-white"
						href="/Products/{product.id}?brand={product.productBrand}&name={product.productName}"
						role="button"
						>Edit
					</a>
					<!-- <form action="?/testAction&productId={product.id}" method="post" use:enhance>
					</form> -->
					<button
						class="h-10 w-fit rounded-lg bg-red-800 px-3 pb-1 text-xl font-semibold text-white"
						type="button"
						on:click={() => {
							$dialogFlag = true;
							$dialogInfo =
								product.productBrand + ' ' + product.productName + ' ' + product.productVariant;
							$productId = product.id;
						}}
						>Delete
					</button>
				</div>
			</div>
		{/each}
	</div>

	<!-- <table>
		<thead>
			<tr class="text-left">
				<th class="border border-slate-500 px-2">Brand</th>
				<th class="border border-slate-500 px-2">Product name</th>
				<th class="border border-slate-500 px-2">Variant</th>
				<th class="border border-slate-500 px-2">Price</th>
				<th class="border border-slate-500 px-2">Stock</th>
			</tr>
		</thead>

		<tbody>
			<tr class="text-left">
				<td class="border border-slate-500 px-2">Pirelli</td>
				<td class="border border-slate-500 px-2">Corsa II</td>
				<td class="border border-slate-500 px-2">120/70 R17 F</td>
				<td class="border border-slate-500 px-2">0</td>
				<td class="border border-slate-500 px-2">0</td>
			</tr>
		</tbody>
	</table> -->
</main>
