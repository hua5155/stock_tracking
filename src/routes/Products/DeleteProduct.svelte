<script context="module" lang="ts">
	export const dialogFlag = writable(false);
	export const dialogInfo = writable('');
	export const productId = writable('');
</script>

<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { writable } from 'svelte/store';

	const submitDelete: SubmitFunction = ({ form, data, action, cancel }) => {
		return async ({ result, update }) => {
			// console.log('result :', result);
			if (result.type === 'success') {
				$dialogFlag = false;
				$dialogInfo = '';
				$productId = '';
				invalidateAll();
			}
		};
	};
</script>

{#if $dialogFlag === true}
	<div
		class="absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-white/50"
		on:click|self={() => {
			$dialogFlag = false;
			$dialogInfo = '';
			$productId = '';
		}}
		on:keydown={() => {}}
	>
		<div class="h-fit w-fit rounded-2xl bg-gray-300 p-9 text-black">
			<h3 class="mb-4 text-center text-3xl font-semibold">
				You're about to delete {$dialogInfo}
			</h3>
			<span class="text-xl">Are you sure?</span>
			<form
				action="?/deleteProduct&productId={$productId}"
				method="post"
				use:enhance={submitDelete}
			>
				<button
					class="h-10 w-fit rounded-lg bg-red-800 px-3 pb-1 text-xl font-semibold text-white"
					type="submit"
				>
					Confirm
				</button>
			</form>
		</div>
	</div>
{/if}
