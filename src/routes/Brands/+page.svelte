<script lang="ts">
  import AddBrand from "./AddBrand.svelte";
	import DeleteBrand from "./DeleteBrand.svelte";
  
	import type { PageData } from "./$types";

  export let data: PageData;
  console.log(data.query);
  let brandArray = data.query.map(ele => ele.brandName);  // map is slower than for loop, custom function??
  // console.log(brandArray);
  for (const iterator of data.query) {
    const brand = iterator.brandName;
    const product = iterator.products.map(ele => ele.productName);
    console.log(
      "Brand : " + brand +
      " Products : " + product
    );
  }
</script>

<main class="flex justify-center bg-gray-800">
  <div class="h-fit w-fit flex flex-col">
    <AddBrand />
    <DeleteBrand />

    <!-- <div>{pageData}</div> -->
  </div>
</main>

