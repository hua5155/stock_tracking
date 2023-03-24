<script context="module" lang="ts">
	export const formSchema = z.object({
		brandName: z.string().min(1, { message: 'Brand name is empty' }).trim()
	});
	export type formType = z.infer<typeof formSchema>;
	const fieldName = Object.fromEntries(
		formSchema.keyof().options.map((key) => [key, key])
	) as formType;
</script>

<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import { invalidateAll } from '$app/navigation';
	import { z } from 'zod';

	import FormInput from '$lib/conponents/FormInput.svelte';

	export let data: PageData;
	export let dialogFlag = false;

	$: brands = data.brands.map((ele) => ele.brandName);

	const formFields = writable<formType>({ brandName: '' });
	const formErrors = writable<formType>({ brandName: '' });

	const submitCreate: SubmitFunction = ({ form, data, action, cancel }) => {
		// console.log('formData : ', data); // debug
		const formData = Object.fromEntries(data) as formType;
		const zResult = formSchema.safeParse(formData);
		if (zResult.success === false) {
			const { fieldErrors: zErrors } = zResult.error.flatten();
			console.log('client-side validation error :\n', zErrors); // debug
			$formErrors.brandName = zErrors.brandName?.at(0) ?? '';
			cancel();
		}
		return async ({ result, update }) => {
			// console.log('result :', result);
			if (result.type === 'success') {
				$formFields.brandName = '';
				dialogFlag = false;
				// await update();
				invalidateAll();
			}
		};
	};
</script>

{#if dialogFlag === true}
	<div
		class="absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-white/50"
		on:click|self={() => {
			dialogFlag = false;
		}}
		on:keydown={() => {}}
	>
		<div class="h-fit w-fit rounded-2xl bg-gray-300 p-5 text-black">
			<h3 class="text-3xl font-semibold">New brand</h3>
			<form
				action="?/createBrand"
				method="post"
				use:enhance={submitCreate}
				class="flex flex-row items-end space-x-3"
			>
				<FormInput
					fieldName={fieldName.brandName}
					labelName="Brand"
					bind:fieldValue={$formFields.brandName}
					fieldError={$formErrors.brandName}
					list={brands}
				/>
				<button
					class="h-10 w-fit rounded-2xl bg-cyan-800 px-3 pb-1 text-xl font-semibold text-white"
					type="submit"
				>
					Add brand
				</button>
			</form>
		</div>
	</div>
{/if}
