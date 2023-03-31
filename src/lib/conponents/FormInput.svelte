<script lang="ts">
	export let fieldName: string;
	export let labelName: string;
	export let fieldValue: string;
	export let fieldError: string;
	export let fieldLength = '';
	export let list = [''];
	export let autoFillAction = () => {};

	let focusFlag = false;
	let autoFillSelect = 0;

	$: options = list.filter((ele) => {
		return ele.toLowerCase().includes(fieldValue.toLowerCase());
	});
	$: listFlag = options.length === 0 || list[0] === '' ? false : true;
	// $: listFlag = list.indexOf(fieldValue) > -1 ? true : false;
	// $: listHeight = 40 * options.length;
	$: inFocus = focusFlag ? 'visible' : 'invisible';
</script>

<div class="relative flex flex-col {fieldLength}">
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
			autoFillSelect = 0;
			setTimeout(() => {
				focusFlag = false;
			}, 300);
		}}
		on:keydown={(event) => {
			// console.log('key : ', event.key); // debug
			if (event.key === 'ArrowUp') {
				console.log('UP'); // debug
				autoFillSelect = autoFillSelect <= 0 ? 0 : autoFillSelect - 1;
				console.log('index : ', autoFillSelect); // debug
			}
			if (event.key === 'ArrowDown') {
				console.log('DOWN'); // debug
				autoFillSelect = autoFillSelect >= options.length ? options.length : autoFillSelect + 1;
				console.log('index : ', autoFillSelect); // debug
			}
		}}
		on:input={() => {
			autoFillSelect = 0;
		}}
	/>
	{#if listFlag}
		<ul
			class="no-scrollbar absolute top-[72px] left-0 z-20 h-fit max-h-40 w-fit space-y-1 overflow-y-auto rounded-lg bg-blue-500/0 py-1 text-gray-800/0 transition-colors duration-300 peer-focus:bg-blue-500 peer-focus:text-gray-800
			{inFocus}"
		>
			{#each options as item, index}
				<li
					class="h-6 w-full px-3
					{index === autoFillSelect - 1 ? 'bg-blue-600' : ''}"
					on:click={() => {
						fieldValue = item;
						focusFlag = false;
						autoFillAction();
					}}
					on:keydown={() => {}}
				>
					{item}
				</li>
			{/each}
		</ul>
	{/if}
</div>
