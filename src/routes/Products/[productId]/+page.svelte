<script lang="ts">
	import EditProduct from './EditProduct.svelte';

	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let data: PageData;
	const { product } = data;
	// $: console.log('product :', product); //debug

	let gotoCounter = 3;
	let nullFlag = false;
	if (browser === true) {
		if (product === null) {
			console.log('Product not found'); // debug
			nullFlag = true;
			setInterval(() => {
				gotoCounter -= 1;
			}, 1000);
			setTimeout(() => {
				goto('/Products');
			}, 3000);
		}
	}
</script>

<main class="flex items-center justify-center bg-gray-800">
	{#if nullFlag === false}
		<EditProduct {data} />
	{:else}
		<div
			class="flex h-[388px] w-[604px] flex-col items-center rounded-2xl bg-gray-300 p-9 text-black"
		>
			<h3 class="text-center text-3xl font-semibold">Product not found</h3>
			<h1 class="pt-10 text-center text-xl font-semibold">
				You will be return to Products in {gotoCounter}secs
			</h1>
			<a href="/Products" class="pt-5 text-xl font-semibold underline">Redirect manually</a>
		</div>
	{/if}
</main>
