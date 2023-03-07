<script lang="ts">
	export let fieldName: string;
	export let labelName: string;
	export let fieldValue: string;
	export let fieldError: string;
</script>

<div class="flex flex-col">
	<label for={fieldName}>
		<span
			class="text-xl text-neutral-500 {fieldError ?? true ? 'text-pink-600' : 'text-neutral-500'}"
			>{labelName}</span
		>
	</label>
	<input
		class="h-10 rounded-xl border-2 px-3 pb-1 text-xl placeholder:text-pink-600 focus:outline-none
      {fieldError ?? true
			? 'border-pink-300 text-pink-600 focus:border-pink-500'
			: 'border-sky-300 focus:border-sky-500'}"
		type="text"
		name={fieldName}
		id={fieldName}
		bind:value={fieldValue}
		placeholder={fieldError}
	/>
</div>
