<script lang="ts">
	const colorPalette = [
		['bg-blue-400', 'bg-blue-600'],
		['bg-green-400', 'bg-green-600']
	];
	const boxWidth = [300, 300, 300, 300];
</script>

<div class="flex flex-row">
	{#each boxWidth as box, index}
		<div
			class="relative flex h-10 items-center justify-start px-4
        {colorPalette[index % 2][0]}"
			style="width: {box}px;"
		>
			<span class="align-middle">Column {index}</span>
			<div
				class="absolute top-0 right-0 h-10 w-1 
          {colorPalette[index % 2][0]} 
          hover:{colorPalette[index % 2][1]}"
				on:mousedown={() => {
					console.log('Column 1 mousedown');
				}}
			/>
		</div>
	{/each}
</div>

<svelte:window
	on:mouseup={() => {
		console.log('mouseup');
	}}
	on:mousemove={() => {
		// console.log('window mousemove');
	}}
/>
