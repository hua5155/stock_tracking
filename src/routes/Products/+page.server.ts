import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { Prisma } from '@prisma/client'
import type { z } from "zod"

import { formValidator as createValidator } from "./CreateDialog.svelte"
type createSchema = z.infer<typeof createValidator>
import type { formType as createForm } from "./CreateDialog.svelte"

const createProduct = async (data: createSchema) => {
  await prisma.product.create({
    data: {
      brand: {
        connectOrCreate: {
          where: { brandName: data.productBrand },
          create: { brandName: data.productBrand }
        }
      },
      productName: data.productName,
      category: {
        connectOrCreate: {
          where: { categoryName: data.productCategory },
          create: { categoryName: data.productCategory }
        }
      },
      productVariant: data.productVariant,
      price: data.price,
      stock: data.stock
    }
  })
}
const deleteProduct = async (productId: string) => {
  await prisma.product.delete({
    where: {
      id: productId
    }
  })
}

export const load: PageServerLoad = (async ({ params }) => {
  const products = prisma.product.findMany({
    orderBy: [
      { productBrand: 'asc' },
      { productName: 'asc' }
    ],
    select: {
      id: true,
      productBrand: true,
      productName: true,
      productCategory: true,
      productVariant: true,
      price: true,
      stock: true
    }
  });
  const brands = prisma.brand.findMany({
    orderBy: { brandName: 'asc' },
    select: { brandName: true }
  });
  const categories = prisma.category.findMany({
    orderBy: { categoryName: 'asc' },
    select: { categoryName: true }
  });

  try {
    await prisma.$transaction(
      [
        products,
        brands,
        categories
      ],
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    )
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log('Error code : ' + error.code);
    }
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      console.log(error.message);
    }
  }

  // console.log('server-side pageData :\n', returnData);  // debug

  return {
    products: products,
    brands: brands,
    categories: categories
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  createProduct: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData()) as createForm;
    const zResult = createValidator.safeParse(formData);

    if (zResult.success === false) {
      const { fieldErrors: zErrors } = zResult.error.flatten();
      const { ...returnData } = formData;
      console.log("server-side validation error :");  // debug
      console.log(returnData);  // debug
      console.log(zErrors);  // debug
      return fail(400, {
        data: returnData,
        error: zErrors,
      });
    } else {
      console.log("server-side validation :", zResult);  // debug
      // return {}
    }

    try {
      createProduct(zResult.data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('Error code : ' + error.code);  // debug
      }
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(error.message);
      }
      return fail(500, { message: "Something went wrong, Couldn't create the product." });
    }
  },
  deleteProduct: async ({ url }) => {
    const productId = url.searchParams.get('productId')

    if (productId === null) return fail(500, { message: "Parameter : productId missing." });

    try {
      deleteProduct(productId);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('Error code : ' + error.code);
      }
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(error.message);
      }
      return fail(500, { message: "Something went wrong, Couldn't delete the brand." });
    }
  }
};
