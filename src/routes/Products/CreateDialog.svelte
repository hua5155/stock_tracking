<script context="module" lang="ts">
	const formSchema = z.object({
		productBrand: z.string().min(1, { message: 'Brand name is empty' }).trim(),
		productName: z.string().min(1, { message: 'Product name is empty' }).trim(),
		productCategory: z.string().min(1, { message: 'Category is empty' }).trim(),
		productVariant: z.string().min(1, { message: 'Variant is empty' }).trim(),
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
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import { invalidateAll } from '$app/navigation';
	import { z } from 'zod';

	export let data: PageData;
	export let dialogFlag = false;
	$: animationIn = dialogFlag;
	let animationOut = false;

	$: brands = data.brands.map((item) => item.brandName);
	$: categories = data.categories.map((item) => item.categoryName);
	$: products = productFiltering($formFields.productBrand);
	$: variants = variantFiltering($formFields.productName);

	const productFiltering = (filter: string) => {
		let brandFilter = data.products
			.filter((ele) => {
				return ele.productBrand.toLowerCase().includes(filter.toLowerCase());
			})
			.map((ele) => ele.productName);

		let deDuplicate = brandFilter.filter((ele, index) => {
			return brandFilter.indexOf(ele) === index;
		});

		return deDuplicate;
	};

	const variantFiltering = (filter: string) => {
		let productFilter = data.products
			.filter((ele) => {
				return ele.productName.toLowerCase() === filter.toLowerCase();
			})
			.map((ele) => ele.productVariant);

		return productFilter;
	};

	const autofillBrand = () => {
		for (const ele of data.products) {
			if ($formFields.productName === ele.productName) {
				$formFields.productBrand = ele.productBrand;
			}
		}
	};

	const formFields = writable<formType>({
		productBrand: '',
		productName: '',
		productCategory: '',
		productVariant: '',
		price: '0',
		stock: '0'
	});

	const formErrors = writable<formType>({
		productBrand: '',
		productName: '',
		productCategory: '',
		productVariant: '',
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
				productVariant: zErrors.productVariant?.at(0) ?? '',
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
					productVariant: '',
					price: '0',
					stock: '0'
				});
				console.log('formFields :\n', $formFields); // debug
				formErrors.set({
					productBrand: '',
					productName: '',
					productCategory: '',
					productVariant: '',
					price: '',
					stock: ''
				});
				dialogFlag = false;
				// await update();
				// await applyAction(result);
				invalidateAll();
			}
		};
	};
</script>

{#if dialogFlag === true}
	<div
		class="absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-white/50
			{animationIn ? 'animate-fadeIn' : ''} {animationOut ? 'animate-fadeOut' : ''}"
		on:animationend={() => {
			if (animationIn === true) {
				return;
			}

			animationOut = false;
			dialogFlag = false;
		}}
		on:click|self={() => {
			animationIn = false;
			animationOut = true;
		}}
		on:keydown={() => {}}
	>
		<div
			class="h-fit w-fit rounded-2xl bg-gray-300 p-9 text-black
				{animationIn ? 'animate-slideIn' : ''} {animationOut ? 'animate-slideOut' : ''}"
		>
			<h3 class="mb-4 text-center text-3xl font-semibold">New product</h3>
			<form action="?/createProduct" method="post" use:enhance={submitCreate}>
				<div class="flex flex-row space-x-5">
					<!-- brand name field -->
					<FormInput
						fieldLength="w-40"
						fieldName={fieldName.productBrand}
						labelName="Brand"
						bind:fieldValue={$formFields.productBrand}
						fieldError={$formErrors.productBrand}
						list={brands}
					/>

					<!-- <datalist id="brand-field">
						{#each brandList as item}
							<option value={item} />
						{/each}
					</datalist> -->

					<!-- product name field -->
					<FormInput
						fieldLength="w-52"
						fieldName={fieldName.productName}
						labelName="Product"
						bind:fieldValue={$formFields.productName}
						fieldError={$formErrors.productName}
						list={products}
						autoFillAction={autofillBrand}
					/>
				</div>

				<div class="flex flex-row space-x-5">
					<!-- variant name field -->
					<FormInput
						fieldLength="w-80"
						fieldName={fieldName.productVariant}
						labelName="Variant"
						bind:fieldValue={$formFields.productVariant}
						fieldError={$formErrors.productVariant}
						list={variants}
					/>

					<!-- category field -->
					<FormInput
						fieldLength="w-48"
						fieldName={fieldName.productCategory}
						labelName="Category"
						bind:fieldValue={$formFields.productCategory}
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
						bind:fieldValue={$formFields.price}
						fieldError={$formErrors.price}
					/>

					<!-- stock name field -->
					<FormInput
						fieldLength="w-32"
						fieldName={fieldName.stock}
						labelName="Stock"
						bind:fieldValue={$formFields.stock}
						fieldError={$formErrors.stock}
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
	</div>
{/if}

<style>
	/*  */
</style>
