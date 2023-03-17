import type { Actions, PageServerLoad } from "./$types";
import { error, fail } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { Prisma } from '@prisma/client'
import type { z } from 'zod'

import { formValidator as updateValidator } from "./UpdateProduct.svelte"
type updateSchema = z.infer<typeof updateValidator>
import type { formType as updateForm } from "./UpdateProduct.svelte"

const updateProduct = async (data: updateSchema, productId: string) => {
  await prisma.product.update({
    where: { id: productId },
    data: {
      category: {
        connectOrCreate: {
          where: { categoryName: data.productCategory },
          create: { categoryName: data.productCategory }
        }
      },
      price: data.price,
      stock: data.stock
    }
  })
}

export const load: PageServerLoad = async ({ params }) => {
  const product = prisma.product.findUnique({
    where: { id: params.productId },
    select: {
      productBrand: true,
      productName: true,
      productCategory: true,
      productVariant: true,
      price: true,
      stock: true
    }
  })
  const categories = prisma.category.findMany({
    orderBy: { categoryName: 'asc' },
    select: { categoryName: true }
  });

  try {
    await prisma.$transaction(
      [
        product,
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

  // console.log('server :\n', product) // debug
  if (product === null) {
    throw error(404, 'Product not found')
  }

  return {
    product: product,
    categories: categories
  }
};

export const actions: Actions = {
  updateProduct: async ({ request, params }) => {
    // console.log(params)
    const formData = Object.fromEntries(await request.formData()) as updateForm
    const zResult = updateValidator.safeParse(formData)

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
    }

    try {
      updateProduct(zResult.data, params.productId)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('Error code : ' + error.code);  // debug
      }
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(error.message);
      }
      return fail(500, { message: "Something went wrong, Couldn't create the product." });
    }
  }
};