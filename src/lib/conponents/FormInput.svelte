<script lang="ts">
	export let fieldName: string;
	export let labelName: string;
	export let fieldValue: string;
	export let fieldError: string;
	export let list = [''];
	export let onclickFunc = () => {};

	let focusFlag = false;
	$: inFocus = focusFlag ? 'visible' : 'invisible';

	$: options = list.filter((ele) => {
		return ele.toLowerCase().includes(fieldValue.toLowerCase());
	});
	$: listFlag = options.length === 0 || list[0] === '' ? false : true;
	// $: listFlag = list.indexOf(fieldValue) > -1 ? true : false;
	// $: listHeight = 40 * options.length;
</script>

<div class="relative flex flex-col">
	<label for={fieldName}>
		<span
			class="z-10 text-xl text-neutral-500
				{fieldError ?? true ? 'text-pink-600' : 'text-neutral-500'}"
		>
			{labelName}
		</span>
	</label>
	<input
		class="peer z-10 h-10 rounded-xl border-2 px-3 pb-1 text-xl placeholder:text-pink-600 focus:outline-none
			{fieldError ?? true
			? 'border-pink-300 text-pink-600 focus:border-pink-500'
			: 'border-sky-300 focus:border-sky-500'}"
		type="text"
		name={fieldName}
		id={fieldName}
		bind:value={fieldValue}
		placeholder={fieldError}
		on:focusin={() => {
			focusFlag = true;
		}}
		on:focusout={() => {
			setTimeout(() => {
				focusFlag = false;
			}, 100);
		}}
		on:keydown={(event) => {
			// if (event.key === 'ArrowUp') console.log('UP');
			// if (event.key === 'ArrowDown') console.log('DOWN');
			// if (event.key === 'ArrowLeft') console.log('LEFT');
			// if (event.key === 'ArrowRight') console.log('RIGHT');
		}}
	/>
	{#if listFlag}
		<ul
			class="no-scrollbar absolute top-[72px] left-0 z-20 h-fit max-h-40 w-fit space-y-1 overflow-y-auto rounded-xl bg-blue-500/0 py-1 px-3 text-gray-800/0 transition-colors duration-300 peer-focus:bg-blue-500 peer-focus:text-gray-800
			{inFocus}"
		>
			{#each options as item}
				<li
					class="h-6 w-full"
					on:click={() => {
						fieldValue = item;
						onclickFunc();
					}}
					on:keydown={() => {}}
				>
					{item}
				</li>
			{/each}
		</ul>
	{/if}
</div>
