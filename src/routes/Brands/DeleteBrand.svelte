<script lang="ts">
  
</script>

<div class="p-5 bg-gray-300 rounded-2xl text-black">
  <form action="?/deleteBrand" method="post">
    <h3 class="text-3xl font-semibold">Delete brand</h3>
    <label
      class="text-xl text-neutral-500"
      for="brandName"
    >
      Brand
    </label>
    <div class="flex flex-row space-x-3">
      <input
        class="h-10 px-3 pb-1 text-xl rounded-xl"
        type="text"
        name="brandName"
        id="brandName"
      >
      <button
        class="h-10 w-fit px-3 pb-1 text-xl text-white font-semibold bg-cyan-800 rounded-2xl"
        type="submit"
      >
        Delete brand
      </button>
    </div>
  </form>
</div>