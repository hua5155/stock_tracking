<script lang="ts">
	import type { PageData } from './$types';
	import UpdateProduct from './UpdateProduct.svelte';

	export let data: PageData;
	// $: ({ product } = data); // undefine my ass
	// const { product } = data;
</script>

<main class="flex items-center justify-center bg-gray-800">
	<UpdateProduct {data} />

	<!-- <span>{product?.productBrand}</span>
	<span>{product?.productName}</span>
	<span>{product?.productVariant}</span>
	<span>{product?.productCategory}</span>
	<span>{product?.price}</span>
	<span>{product?.stock}</span> -->
</main>
