<script context="module" lang="ts">
	const productInfo = z.object({
		productBrand: z.string(),
		productName: z.string(),
		productVariant: z.string(),
		price: z.number()
	});
	const hasId = z.object({
		id: z.string().uuid({ message: 'Invalid UUID' })
	});
	const hasQuantity = z.object({
		quantity: z
			.number({ invalid_type_error: 'Quantity must be a number' })
			.gte(0, { message: "Quantity can't be negative" })
	});

	export const checkoutVaildator = z.array(hasId.merge(hasQuantity));

	const productSchema = productInfo.merge(hasId);
	type productType = z.infer<typeof productSchema>;
	export const addToCart = (product: productType) => {
		let findFlag = false;
		for (const element of get(cart)) {
			if (element.id.includes(product.id)) {
				element.quantity += 1;
				findFlag = true;
			}
		}
		if (findFlag === true) return;
		cart.set([...get(cart), { ...product, quantity: 1 }]);
	};
	const removeFromCart = (productId: string) => {
		cart.set(
			get(cart).filter((ele) => {
				return ele.id != productId;
			})
		);
	};

	const cartSchema = productSchema.merge(hasQuantity);
	type cartType = z.infer<typeof cartSchema>;
	export const cart = writable<cartType[]>([]);
</script>

<script lang="ts">
	import { get, writable } from 'svelte/store';
	import { z } from 'zod';

	const postProducts = async () => {
		const requestBody = $cart.map((ele) => {
			const { id, quantity } = ele;
			return { id, quantity };
		});
		console.log('requestBody :\n', requestBody);

		const response = await fetch('/api/Checkout', {
			method: 'POST',
			body: JSON.stringify($cart)
		});

		if (response.ok === true) {
			$cart = [];
		} else {
			console.log(await response.json()); // debug
		}

		// return await postResponse.json();
	};
</script>

<div class="mx-auto h-fit w-fit">
	<button
		class="h-10 w-fit rounded-lg bg-sky-800 px-3 pb-1 text-xl font-semibold"
		type="button"
		on:click={() => {
			postProducts();
		}}
		>Checkout
	</button>
</div>

<div class="no-scrollbar mt-10 flex h-5/6 w-full flex-col space-y-2 overflow-auto">
	{#if $cart.length === 0}
		<div>Cart is empty</div>
	{/if}
	{#each $cart as item}
		<div
			class="flex flex-row items-center justify-between space-x-5 rounded-lg bg-gray-500 py-2 px-4"
		>
			<span class="align-middle text-base font-bold">
				{item.productBrand}
				{item.productName}
				{item.productVariant}
			</span>
			<div class="flex flex-row items-center space-x-4">
				<span
					class="w-14 rounded-md bg-gray-200 px-2 pb-1 text-center align-middle text-base font-semibold text-black"
					>{item.price}
				</span>
				<span
					class="w-14 rounded-md bg-gray-200 px-2 pb-1 text-center align-middle text-base font-semibold text-black"
					>{item.quantity}
				</span>
				<button
					class="h-10 w-fit rounded-lg bg-sky-800 px-3 pb-1 text-xl font-semibold"
					type="button"
					on:click={() => {
						removeFromCart(item.id);
						console.log(`removing ${item.productBrand} ${item.productName} ${item.productVariant}`);
					}}
					>Remove
				</button>
			</div>
		</div>
	{/each}
</div>

<style>
	/*  */
</style>
