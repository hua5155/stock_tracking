<script lang="ts">
	import { z } from 'zod';

	const table: { columnName: string; element?: HTMLElement }[] = [
		{ columnName: 'brand' },
		{ columnName: 'product' },
		{ columnName: 'variant' },
		{ columnName: 'price' },
		{ columnName: 'quantity' }
	];

	const data: {
		brand: string;
		product: string;
		variant: string;
		price: number;
		quantity: number;
	}[] = [
		{ brand: 'Pirelli', product: 'Rosoo IV', variant: '120/70 17R', price: 8000, quantity: 0 },
		{
			brand: 'Pirelli',
			product: 'Rosoo IV Corsa',
			variant: '120/70 17R',
			price: 8000,
			quantity: 0
		},
		{
			brand: 'Pirelli',
			product: 'Rosoo Corsa II',
			variant: '120/70 17R',
			price: 8000,
			quantity: 0
		},
		{ brand: 'Bridgestone', product: 'S22', variant: '120/70 17R', price: 8000, quantity: 0 },
		{ brand: 'Michelin', product: 'Power Cup 2', variant: '120/70 17R', price: 8000, quantity: 0 }
	];

	let mouseDown = false;
	let target = 0;
	const onMouseDown = (e: MouseEvent, index: number) => {
		target = index;
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

<div class="mx-auto flex h-fit w-fit flex-col space-y-2">
	{#each table as column}
		<span class="">{`${column.columnName} : ${column.element?.clientWidth}`}</span>
	{/each}
</div>

<div class="mx-auto mt-5 flex h-fit w-fit max-w-[70%] flex-row">
	{#each table as column, columnIndex}
		<div class="group/column flex w-fit flex-col odd:bg-blue-400 even:bg-green-400">
			<div
				class="relative flex h-10 w-full items-center justify-start px-4"
				bind:this={column.element}
			>
				<span class="align-middle">{column.columnName}</span>
				<div
					class="group/handle absolute top-0 right-0 h-full w-2"
					on:mousedown={(e) => {
						onMouseDown(e, columnIndex);
					}}
				>
					<div
						class="absolute top-0 right-0 h-full w-1 group-odd/column:group-hover/handle:bg-blue-600 group-even/column:group-hover/handle:bg-green-600"
					/>
				</div>
			</div>

			{#each data as row, rowIndex}
				<div class="h-10 w-fit px-4">
					<span>{Object.values(row)[columnIndex]}</span>
				</div>
			{/each}
		</div>
	{/each}
</div>

<svelte:window
	on:mouseup={(e) => {
		onMouseUp(e);
	}}
	on:mousemove={(e) => {
		onMouseMove(e);
	}}
/>
