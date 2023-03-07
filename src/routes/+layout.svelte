<script lang="ts">
  import '../app.css';

  const navPages: {
		navUrl: string;
		navText: string;
	}[] = [
		{ navUrl: '/', navText: 'Home' },
		{ navUrl: '/Brands', navText: 'Brands' },
		{ navUrl: '/Products', navText: 'Products' },
	];
</script>

<div class="h-screen w-screen bg-gray-800 text-white">
  <nav
		class="flex h-11
						w-screen
						justify-center space-x-6 bg-gray-700"
	>
		{#each navPages as page}
			<a href={page.navUrl} class="text-lg py-2 text-center font-bold">{page.navText}</a
			>
		{/each}
	</nav>
  <slot />
</div>