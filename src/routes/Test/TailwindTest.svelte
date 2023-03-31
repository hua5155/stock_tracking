<script lang="ts">
	let flag = false;

	/*
		1. {flag ? '' : 'hidden'} won't animate, {#if} won't either.
		2. {flag ? 'h-20 w-20' : 'h-0 w-0'} and don't transition-transform, but won't work on the way out.
		3. Use on:mouseover & on:mouseleave as hover to change inline CSS (or Tailwind CSS) and set transition to "all"
  */
</script>

<div class="flex flex-col items-center">
	<button
		class="h-10 w-fit rounded-2xl bg-cyan-800 px-3 pb-1 text-xl font-semibold text-white"
		on:click={() => {
			flag = !flag;
		}}
	>
		{`Toggle ${flag}`}
	</button>
	<div class="flex w-80 flex-wrap">
		<div
			class="transition-color mt-5 mr-5 h-20 w-20 duration-500
        {flag ? 'bg-blue-500' : 'bg-red-500'}"
		>
			color transition
		</div>
		<div
			class="mt-5 mr-5 h-20 w-20 bg-blue-500
        {flag ? 'animate-fadeIn' : 'animate-fadeOut'}"
		>
			opacity transition
		</div>
		<div
			class="mt-5 mr-5 h-20 w-20 bg-blue-500 transition-all duration-500
        {flag ? 'translate-y-0' : 'translate-y-10'}"
		>
			translate
		</div>
		<div class="mt-5 mr-5 h-20 w-20 bg-blue-500 {flag ? 'animate-slideIn' : 'animate-slideOut'}">
			slide up
		</div>
		<div class="mt-5 mr-5 h-20 w-20 bg-blue-500 {flag ? 'animate-wiggle' : ''}">wiggle</div>
		<div class="mt-5 mr-5 h-20 w-20 bg-blue-500 {flag ? 'animate-rotate' : ''}">rotate</div>
	</div>
</div>

<style>
	.test {
		/* transform: rotate(0deg); */
		/* animation: test 500ms ease reverse forwards; */
		/* transition: all 500ms ease; */
		/* opacity: 1; */
	}
	.test:hover {
		/* transform: rotate(45deg); */
		/* animation: test 500ms ease normal forwards; */
		/* transition: all 500ms ease; */
		/* opacity: 0; */
	}

	@keyframes test {
		0% {
			rotate: 0deg;
		}
		100% {
			rotate: 45deg;
		}
	}
</style>
