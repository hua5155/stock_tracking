import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async () => {
  const query = await prisma.brand.findMany({select: {
    brandName: true,
    products: {select: {
      productName: true,
      price: true,
      stock: true,
    }},
  }});

  // console.log(query);  // debug
  
  return {
    query,
  };
};

export const actions: Actions = {
  writeBrand: async ({ request }) => {
    const writeData = Object.fromEntries(await request.formData()) as {brandName: string};
    // console.log(writeData);  // debug

    try {
      await prisma.brand.create({data: writeData});
    } catch (error) {
      console.log(error);
      return fail(500, {message: "Something went wrong, Couldn't create the brand."});
    }
    return {status: 201};
  },
  deleteBrand:async ({ request }) => {
    const deleteData = Object.fromEntries(await request.formData()) as {brandName: string};

    try {
      await prisma.brand.update({
        where: {...deleteData},
        data: {
          products: {
            deleteMany: {},
          },
        }
      });
      await prisma.brand.delete({
        where: {...deleteData},
      });
    } catch (error) {
      console.log(error);
      return fail(500, {message: "Something went wrong, Couldn't delete the brand."});
    }
    return {status: 200};
  }
};
