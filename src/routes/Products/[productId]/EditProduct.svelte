<script context="module" lang="ts">
	const formSchema = z.object({
		productCategory: z.string().min(1, { message: 'Category is empty' }).trim(),
		price: z.string(),
		stock: z.string()
	});
	const isNumber = z.object({
		price: z.coerce
			.number({ invalid_type_error: 'Price must be a number' })
			.gte(0, { message: "Price can't be negative" }),
		stock: z.coerce
			.number({ invalid_type_error: 'Stock must be a number' })
			.gte(0, { message: "Stock can't be negative" })
	});
	export type formType = z.infer<typeof formSchema>;
	export const formValidator = formSchema.merge(isNumber);
	const fieldName = Object.fromEntries(
		formSchema.keyof().options.map((key) => [key, key])
	) as formType;
</script>

<script lang="ts">
	import FormInput from '$lib/conponents/FormInput.svelte';
	import DeleteDialog from '$lib/conponents/DeleteDialog.svelte';
	import LoadingAnimation from '$lib/conponents/LoadingAnimation.svelte';

	import type { PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { writable } from 'svelte/store';

	import { z } from 'zod';

	export let data: PageData;
	$: ({ product } = data);
	$: if (product === null) {
		goto('/Products');
	}
	// const { product } = data;
	const categories = data.categories.map((item) => item.categoryName);

	const deleteFlag = writable(false);
	const target = writable('');
	const message = writable('');

	const submitFlag = writable(false);

	const formErrors = writable<formType>({
		productCategory: '',
		price: '',
		stock: ''
	});

	const submitCreate: SubmitFunction = ({ form, data, action, cancel }) => {
		// console.log('form : ', form);
		console.log('data:', data);
		// console.log('action : ', action);

		const formData = Object.fromEntries(data) as formType;
		const zResult = formValidator.safeParse(formData);
		if (zResult.success === false) {
			const { fieldErrors: zErrors } = zResult.error.flatten();
			console.log('client-side validation error :\n', zErrors); // debug
			formErrors.set({
				productCategory: zErrors.productCategory?.at(0) ?? '',
				price: zErrors.price?.at(0) ?? '',
				stock: zErrors.stock?.at(0) ?? ''
			});
			cancel();
		}
		return async ({ result, update }) => {
			console.log('result :', result);

			if (result.type === 'success') {
				formErrors.set({
					productCategory: '',
					price: '',
					stock: ''
				});
				setTimeout(() => {
					$submitFlag = false;
				}, 700);
				invalidateAll();
			}
		};
	};
</script>

<div class="rounded-2xl bg-gray-300 p-9 text-black">
	<form action="?/updateProduct" method="post" use:enhance={submitCreate}>
		<h3 class="mb-4 text-center text-3xl font-semibold">Edit product</h3>

		<div class="flex flex-row space-x-5">
			<!-- brand name field -->
			<div class="flex w-40 flex-col">
				<span class="z-10 text-xl text-neutral-500"> Brand </span>
				<span class="h-10 rounded-xl border-2 border-sky-300 bg-white px-3 pt-0.5 text-xl">
					{product?.productBrand}
				</span>
			</div>

			<!-- product name field -->
			<div class="flex w-52 flex-col">
				<span class="z-10 text-xl text-neutral-500"> Product </span>
				<span class="h-10 rounded-xl border-2 border-sky-300 bg-white px-3 pt-0.5 text-xl">
					{product?.productName}
				</span>
			</div>
		</div>

		<div class="flex flex-row space-x-5">
			<!-- variant name field -->
			<div class="flex w-80 flex-col">
				<span class="z-10 text-xl text-neutral-500"> Variant </span>
				<span class="h-10 rounded-xl border-2 border-sky-300 bg-white px-3 pt-0.5 text-xl">
					{product?.productVariant}
				</span>
			</div>
			<!-- category field -->
			<FormInput
				fieldLength="w-48"
				fieldName={fieldName.productCategory}
				labelName="Variant"
				fieldValue={product?.productCategory ?? ''}
				fieldError={$formErrors.productCategory}
				list={categories}
			/>
		</div>

		<div class="flex flex-row space-x-5">
			<!-- price name field -->
			<FormInput
				fieldLength="w-32"
				fieldName={fieldName.price}
				labelName="Price"
				fieldValue={product?.price.toString() ?? ''}
				fieldError={$formErrors.price}
			/>

			<!-- stock name field -->
			<FormInput
				fieldLength="w-32"
				fieldName={fieldName.stock}
				labelName="Stock"
				fieldValue={product?.stock.toString() ?? ''}
				fieldError={$formErrors.stock}
			/>
		</div>

		<div class="mt-5 flex w-full flex-row justify-between">
			<button
				class="relative h-10 w-fit rounded-2xl bg-cyan-800 px-3 pb-1 text-xl font-semibold text-white transition-all duration-300 disabled:bg-cyan-800/75"
				type="submit"
				disabled={$submitFlag}
				on:click={() => {
					$submitFlag = true;
				}}
			>
				<div class="absolute top-0 left-0 h-10 w-10">
					<LoadingAnimation flag={$submitFlag} />
				</div>
				<span class="{$submitFlag ? 'pl-7' : 'pl-0'} transition-all duration-[400ms]">
					Commit edit
				</span>
			</button>
			<button
				class=" h-10 w-fit rounded-2xl bg-red-800 px-3 pb-1 text-xl font-semibold text-white"
				type="button"
				on:click={() => {
					$deleteFlag = true;
					$message = `You're about to delete ${product?.productBrand} ${product?.productName} ${product?.productVariant}`;
					$target = product?.id ?? '';

					$submitFlag = true;
				}}
			>
				Delete
			</button>
		</div>
	</form>
</div>

<DeleteDialog
	bind:dialogFlag={$deleteFlag}
	action="?/deleteProduct&productId={$target}"
	message={$message}
/>

<style>
	/*  */
</style>
