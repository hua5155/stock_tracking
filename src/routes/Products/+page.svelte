<script lang="ts">
	import AddProduct from './AddProduct.svelte';
	import DeleteProduct from './DeleteProduct.svelte';

	import type { PageData, ActionData } from './$types';

	// export let pageData: PageData;
	// export let form: ActionData;

	// let brandArray = data.query.map(ele => ele.brandName);  // map is slower than for loop, custom function??
	// // console.log(brandArray);
	// for (const iterator of data.query) {
	//   const brand = iterator.brandName;
	//   const product = iterator.products.map(ele => ele.productName);
	//   console.log(
	//     "Brand : " + brand +
	//     " Products : " + product
	//   );
	// }
</script>

<main class="flex justify-center bg-gray-800">
	<div class="flex h-fit w-fit flex-col">
		<AddProduct />
		<DeleteProduct />

		<!-- <div>{pageData}</div> -->
	</div>
</main>
