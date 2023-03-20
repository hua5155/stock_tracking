<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const products = data.products;
	console.log('PageData : ', data);
	console.log('products : ', products);
	if (products.length === 0) console.log('No products');
</script>

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
					href="/Products/{product.id}"
					role="button"
					>Edit
				</a>
				<!-- <form action="?/testAction&productId={product.id}" method="post" use:enhance>
				</form> -->
				<button
					class="h-10 w-fit rounded-lg bg-red-800 px-3 pb-1 text-xl font-semibold text-white"
					type="button"
					>Delete
				</button>
			</div>
		</div>
	{/each}
</div>
