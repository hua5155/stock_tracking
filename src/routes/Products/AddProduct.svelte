<script context="module" lang="ts">
	const formSchema = z.object({
		productBrand: z.string().min(1, { message: 'Brand name is empty' }).trim(),
		productName: z.string().min(1, { message: 'Product name is empty' }).trim(),
		productCategory: z.string().min(1, { message: 'Category is empty' }).trim(),
		variant: z.string().min(1, { message: 'Variant is empty' }).trim(),
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
	const fieldName = Object.fromEntries(
		formSchema.keyof().options.map((key) => [key, key])
	) as formType;
	export const formValidator = formSchema.merge(isNumber);
</script>

<script lang="ts">
	import FormInput from '$lib/conponents/FormInput.svelte';

	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { z } from 'zod';
	import { writable } from 'svelte/store';

	const formFields = writable<formType>({
		productBrand: '',
		productName: '',
		productCategory: '',
		variant: '',
		price: '0',
		stock: '0'
	});

	const formErrors = writable<formType>({
		productBrand: '',
		productName: '',
		productCategory: '',
		variant: '',
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
				productBrand: zErrors.productBrand?.at(0) ?? '',
				productName: zErrors.productName?.at(0) ?? '',
				productCategory: zErrors.productCategory?.at(0) ?? '',
				variant: zErrors.variant?.at(0) ?? '',
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
				formFields.set({
					productBrand: '',
					productName: '',
					productCategory: '',
					variant: '',
					price: '0',
					stock: '0'
				});
				console.log('formFields :\n', $formFields); // debug
				formErrors.set({
					productBrand: '',
					productName: '',
					productCategory: '',
					variant: '',
					price: '',
					stock: ''
				});
				// await update();
				// await applyAction(result);
			}
		};
	};
</script>

<div class="rounded-2xl bg-gray-300 p-9 text-black">
	<form action="?/newProduct" method="post" use:enhance={submitCreate}>
		<h3 class="mb-4 text-center text-3xl font-semibold">New product</h3>

		<div class="flex flex-row space-x-5">
			<!-- brand name field -->
			<div class="w-40">
				<FormInput
					fieldName={fieldName.productBrand}
					labelName="Brand"
					bind:fieldValue={$formFields.productBrand}
					fieldError={$formErrors.productBrand}
				/>
			</div>

			<!-- product name field -->
			<div class="w-52">
				<FormInput
					fieldName={fieldName.productName}
					labelName="Product"
					bind:fieldValue={$formFields.productName}
					fieldError={$formErrors.productName}
				/>
			</div>

			<!-- variant name field -->
			<div class="w-52">
				<FormInput
					fieldName={fieldName.variant}
					labelName="Variant"
					bind:fieldValue={$formFields.variant}
					fieldError={$formErrors.variant}
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

		<!-- category field -->
		<div class="w-48">
			<FormInput
				fieldName={fieldName.productCategory}
				labelName="Category"
				bind:fieldValue={$formFields.productCategory}
				fieldError={$formErrors.productCategory}
			/>
		</div>

		<button
			class="mt-5 h-10 w-fit rounded-2xl bg-cyan-800 px-3 pb-1 text-xl font-semibold text-white"
			type="submit"
		>
			Add product
		</button>
	</form>
</div>
<!-- <div>
	brand name errors : {$formErrors.brandName} <br />
	product name errors : {$formErrors.productName} <br />
	price errors : {$formErrors.price} <br />
	stock errors : {$formErrors.stock}
</div> -->
<!-- <button
	on:click={() => {
		formFields.set({
			brandName: 'BRAND',
			productName: 'PRODUCT',
			price: 'PRICE',
			stock: 'STOCK'
		});
	}}>TEST</button
> -->
<button
	class="mt-5 h-10 w-fit rounded-2xl bg-cyan-800 px-3 pb-1 text-xl font-semibold text-white"
	on:click={() => {
		console.log($formFields);
	}}>console log</button
>
<form action="?/dummyData" method="post" use:enhance>
	<button
		class="mt-5 h-10 w-fit rounded-2xl bg-cyan-800 px-3 pb-1 text-xl font-semibold text-white"
		type="submit">dummyData</button
	>
</form>
<form action="?/writeTest" method="post" use:enhance>
	<button
		class="mt-5 h-10 w-fit rounded-2xl bg-cyan-800 px-3 pb-1 text-xl font-semibold text-white"
		type="submit">writeTest</button
	>
</form>
<form action="?/deleteTest" method="post" use:enhance>
	<button
		class="mt-5 h-10 w-fit rounded-2xl bg-cyan-800 px-3 pb-1 text-xl font-semibold text-white"
		type="submit">deleteTest</button
	>
</form>
