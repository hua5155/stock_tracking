<script lang="ts">
	import { onMount } from 'svelte';

	const LogoPath =
		'M 23 18 l 4.565 2.615 c -2.282 4.197 -6.737 6.922 -11.781 6.922 c -7.364 0 -13.439 -5.634 -13.439 -13.55 s 6.075 -13.55 13.439 -13.55 c 5.044 0 9.5 2.725 11.781 6.923 l -4.565 2.614 c -1.326 -2.725 -4.013 -4.381 -7.216 -4.381 c -4.603 0 -8.1 3.423 -8.1 8.394 s 3.497 8.395 8.1 8.395 c 3.203 0 5.89 -1.657 7.216 -4.382 m 29.05 8.874 v -11.046 h -12.887 v 11.046 h -5.154 v -25.774 h 5.154 v 9.574 h 12.887 v -9.574 h 5.155 v 25.774 h -5.155 m 29.898 -10.678 l -4.677 -10.861 l -4.676 10.861 h 9.353 z m 10.235 10.678 h -5.634 l -2.54 -5.892 h -13.476 l -2.54 5.892 h -5.634 l 11.414 -25.774 h 6.996 l 11.414 25.774 z m 23.748 0 l -13.808 -20.287 v 20.287 h -4.786 v -25.774 h 6.812 l 11.598 17.084 v -17.084 h 4.787 v 25.774 h -4.603 m 14.543 0 v -25.774 h 18.41 v 4.787 h -13.624 v 5.523 h 11.782 v 4.786 h -11.782 v 5.892 h 14.36 v 4.786 h -19.146 m 27.431 0 v -25.774 h 5.154 v 20.62 h 13.622 v 5.154 h -18.776';
	const logoPathLength = 783.7027587890625;

	// let path;
	// onMount(() => {
	// 	let length = path.getTotalLength();
	// 	console.log('length : ', length);
	// });
</script>

<div class="flex h-fit w-fit items-center justify-center">
	<svg class="h-[28px] w-[180px]" viewBox="0 0 180 28">
		<path
			class="fill-none stroke-black"
			d={LogoPath}
			stroke-dasharray={logoPathLength}
			stroke-dashoffset="0"
			style="transition: stroke-dashoffset 0.1s linear 0s; opacity: 1;"
		>
			<!--  -->
			<animate
				attributeName="stroke-dashoffset"
				values="{logoPathLength};0"
				dur="5s"
				repeatCount="1"
			/>
		</path>
	</svg>
</div>

<style></style>
