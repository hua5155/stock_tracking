<script lang="ts">
	const data: {
		brand: string;
		product: string;
		variant: string;
		quantity: number;
		price: number;
	}[] = [
		{ brand: 'Pirelli', product: 'Rosoo IV', variant: '120/70 17R', quantity: 0, price: 8000 },
		{
			brand: 'Pirelli',
			product: 'Rosoo IV Corsa',
			variant: '120/70 17R',
			quantity: 0,
			price: 8000
		},
		{
			brand: 'Pirelli',
			product: 'Rosoo Corsa II',
			variant: '120/70 17R',
			quantity: 0,
			price: 8000
		},
		{ brand: 'Bridgestone', product: 'S22', variant: '120/70 17R', quantity: 0, price: 8000 },
		{ brand: 'Michelin', product: 'Power Cup 2', variant: '120/70 17R', quantity: 0, price: 8000 }
	];

	let tableWidth = 70;

	let mouseDown = false;
	const onMouseDown = (e: MouseEvent, index: number) => {
		mouseDown = true;
	};
	const onMouseUp = (e: MouseEvent) => {
		mouseDown = false;
	};
	const onMouseMove = (e: MouseEvent) => {
		if (mouseDown === false) {
			return;
		}
	};
</script>

<div class="mx-auto flex w-fit flex-col space-y-2">
	<input class="w-96" type="range" min="0" max="70" bind:value={tableWidth} />
</div>
<div class="mx-auto h-fit w-[70%] max-w-[70%]" style:width="{tableWidth}%">
	<table class="w-full">
		<thead>
			<tr class="text-left">
				<th class="border border-slate-500 px-2">Brand</th>
				<th class="border border-slate-500 px-2">Product name</th>
				<th class="border border-slate-500 px-2">Variant</th>
				<th class="border border-slate-500 px-2">Price</th>
				<th class="border border-slate-500 px-2">Stock</th>
			</tr>
		</thead>

		<tbody>
			{#each data as row, rowIndex}
				<tr class="text-left">
					<td class="border border-slate-500 px-2">{row.brand}</td>
					<td class="border border-slate-500 px-2">{row.product}</td>
					<td class="border border-slate-500 px-2">{row.variant}</td>
					<td class="border border-slate-500 px-2">{row.price}</td>
					<td class="border border-slate-500 px-2">{row.quantity}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<svelte:window
	on:mouseup={(e) => {
		//
	}}
	on:mousemove={(e) => {
		//
	}}
/>

<style>
	/*  */
</style>
