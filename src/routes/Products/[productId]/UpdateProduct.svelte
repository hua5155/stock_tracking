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
	import { enhance, type SubmitFunction } from '$app/forms';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';

	import { z } from 'zod';

	import FormInput from '$lib/conponents/FormInput.svelte';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;
	const { product } = data;
	const categories = data.categories.map((item) => item.categoryName);

	const formFields = writable<formType>({
		productCategory: product?.productCategory ?? '',
		price: product?.price.toString() ?? '0',
		stock: product?.stock.toString() ?? '0'
	});

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
			$formFields.price = zErrors.price !== undefined ? '' : formData.price;
			$formFields.stock = zErrors.stock !== undefined ? '' : formData.stock;
			console.log('formFields :\n', $formFields); // debug
			formErrors.set({
				productCategory: zErrors.productCategory?.at(0) ?? '',
				price: zErrors.price?.at(0) ?? '',
				stock: zErrors.stock?.at(0) ?? ''
			});
			cancel();
		}
		return async ({ result, update }) => {
			console.log('result :', result);
			// console.log('result.type :', result.type);
			// console.log('result.status :', result.status);
			// console.log('result.data :', result.data.data);
			// console.log('result.error :', result.data.error);

			if (result.type === 'success') {
				// console.log('formFields :\n', $formFields); // debug
				formErrors.set({
					productCategory: '',
					price: '',
					stock: ''
				});
				// await update();
				// await applyAction(result);
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
			<div class="w-48">
				<FormInput
					fieldName={fieldName.productCategory}
					labelName="Variant"
					bind:fieldValue={$formFields.productCategory}
					fieldError={$formErrors.productCategory}
					list={categories}
				/>
			</div>
		</div>

		<div class="flex flex-row space-x-5">
			<!-- price name field -->
			<div class="w-32">
				<FormInput
					fieldName={fieldName.price}
					labelName="Price"
					bind:fieldValue={$formFields.price}
					fieldError={$formErrors.price}
				/>
			</div>

			<!-- stock name field -->
			<div class="w-32">
				<FormInput
					fieldName={fieldName.stock}
					labelName="Stock"
					bind:fieldValue={$formFields.stock}
					fieldError={$formErrors.stock}
				/>
			</div>
		</div>

		<button
			class="mt-5 h-10 w-fit rounded-2xl bg-cyan-800 px-3 pb-1 text-xl font-semibold text-white"
			type="submit"
		>
			Commit edit
		</button>
	</form>
</div>
