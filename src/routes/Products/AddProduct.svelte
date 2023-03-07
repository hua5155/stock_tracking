<script context="module" lang="ts">
	const formSchema = z.object({
		brandName: z.string().min(1, { message: 'Brand name is empty' }).trim(),
		productName: z.string().min(1, { message: 'Product name is empty' }).trim(),
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
	// const formField = formSchema.keyof().options;
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

	let updateFlag = false;

	const formFields = writable<formType>({
		brandName: '',
		productName: '',
		price: '0',
		stock: '0'
	});

	const formErrors = writable<formType>({
		brandName: '',
		productName: '',
		price: '',
		stock: ''
	});
	// const formErrors = writable(Object.fromEntries(productKey.map((key) => [key, ''])));
	// const formErrors = writable(productKey.map((key) => [key, '']));

	const submitCreate: SubmitFunction = ({ form, data, action, cancel }) => {
		// console.log('form : ', form);
		console.log('data:', data);
		// console.log('action : ', action);

		const formData = Object.fromEntries(data) as formType;
		const zResult = formValidator.safeParse(formData);
		if (zResult.success === false) {
			const { fieldErrors: zErrors } = zResult.error.flatten();
			console.log('client-side validation error :\n', zErrors); // debug
			formFields.set({
				brandName: formData.brandName,
				productName: formData.productName,
				price: zErrors.price !== undefined ? '' : formData.price,
				stock: zErrors.stock !== undefined ? '' : formData.stock
			});
			console.log('formFields :\n', $formFields); // debug
			formErrors.set({
				brandName: zErrors.brandName?.at(0) ?? '',
				productName: zErrors.productName?.at(0) ?? '',
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
					brandName: '',
					productName: '',
					price: '0',
					stock: '0'
				});
				console.log('formFields :\n', $formFields); // debug
				formErrors.set({
					brandName: '',
					productName: '',
					price: '',
					stock: ''
				});
				// await update();
				// await applyAction(result);
			}
		};
	};
</script>

<div class="rounded-2xl bg-gray-300 p-7 text-black">
	<form action="?/createProduct" method="post" use:enhance={submitCreate}>
		<h3 class="mb-4 text-3xl font-semibold">New product</h3>

		<!-- brand name field -->
		<FormInput
			fieldName={fieldName.brandName}
			labelName="Brand"
			bind:fieldValue={$formFields.brandName}
			fieldError={$formErrors.brandName}
		/>

		<!-- product name field -->
		<FormInput
			fieldName={fieldName.productName}
			labelName="Product"
			bind:fieldValue={$formFields.productName}
			fieldError={$formErrors.productName}
		/>

		<!-- price field -->
		<FormInput
			fieldName={fieldName.price}
			labelName="Price"
			bind:fieldValue={$formFields.price}
			fieldError={$formErrors.price}
		/>

		<!-- stock field -->
		<FormInput
			fieldName={fieldName.stock}
			labelName="Stock"
			bind:fieldValue={$formFields.stock}
			fieldError={$formErrors.stock}
		/>
		<button
			class="mt-5 h-10 w-fit rounded-2xl bg-cyan-800 px-3 pb-1 text-xl font-semibold text-white"
			type="submit"
		>
			Add brand
		</button>
	</form>
</div>
<div>
	brand name errors : {$formErrors.brandName} <br />
	product name errors : {$formErrors.productName} <br />
	price errors : {$formErrors.price} <br />
	stock errors : {$formErrors.stock}
</div>
<button
	on:click={() => {
		formFields.set({
			brandName: 'BRAND',
			productName: 'PRODUCT',
			price: 'PRICE',
			stock: 'STOCK'
		});
	}}>TEST</button
>
<button
	on:click={() => {
		console.log($formFields);
	}}>console log</button
>
