import type { Actions, PageServerLoad } from "./$types";
import { error, fail } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { Prisma } from '@prisma/client'

export const load: PageServerLoad = (async ({ params }) => {
  const products = prisma.product.findMany({
    orderBy: [
      { productBrand: 'asc' },
      { productName: 'asc' },
      { productVariant: 'asc' }
    ],
    where: { productBrand: params.brandName },
    select: {
      id: true,
      productBrand: true,
      productName: true,
      productVariant: true,
      price: true,
      stock: true
    }
  })

  try {
    await prisma.$transaction(
      [
        products
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

  // console.log('server :\n', products) // debug
  if (products === null) {
    throw error(404, 'Product not found')
  }

  return {
    products
  }
}) satisfies PageServerLoad;

export const actions: Actions = {

};