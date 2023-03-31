<script lang="ts">
	import '../app.css';

	const navPages: {
		navUrl: string;
		navText: string;
	}[] = [
		{ navUrl: '/', navText: 'Home' },
		{ navUrl: '/Brands', navText: 'Brands' },
		{ navUrl: '/Products', navText: 'Products' },
		{ navUrl: '/Checkout', navText: 'Checkout' }
	];
</script>

<div class="h-screen w-screen bg-gray-800 text-white">
	<nav class="absolute top-0 left-0 flex h-11 w-full justify-center space-x-8 bg-gray-700">
		{#each navPages as page}
			<a href={page.navUrl} class="py-2 text-center text-lg font-bold">{page.navText}</a>
		{/each}
	</nav>
	<div class="h-full w-full pt-20">
		<slot />
	</div>
	<!-- <slot /> -->
</div>
