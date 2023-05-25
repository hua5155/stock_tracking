<script lang="ts">
	const table: { columnName: string; element?: HTMLElement }[] = [
		{ columnName: 'brand' },
		{ columnName: 'product' },
		{ columnName: 'variant' },
		{ columnName: 'quantity' },
		{ columnName: 'price' }
	];

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
</script>

<div class="mx-auto flex w-fit flex-col space-y-2">
	<input class="w-96" type="range" min="0" max="70" bind:value={tableWidth} />
</div>
<div class="mx-auto table h-fit w-[70%] max-w-[70%]" style:width="{tableWidth}%">
	<div class="table-header-group">
		<div class="table-row">
			{#each table as column, columnIndex}
				<div class="table-cell border border-slate-500 px-4">{column.columnName}</div>
			{/each}
		</div>
	</div>

	<div class="table-row-group">
		{#each data as row, rowIndex}
			<div class="table-row">
				<div class="table-cell border border-slate-500 px-4">{row.brand}</div>
				<div class="table-cell border border-slate-500 px-4">{row.product}</div>
				<div class="table-cell border border-slate-500 px-4">{row.variant}</div>
				<div class="table-cell border border-slate-500 px-4">{row.price}</div>
				<div class="table-cell border border-slate-500 px-4">{row.quantity}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	/*  */
</style>
