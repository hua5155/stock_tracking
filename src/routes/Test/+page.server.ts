import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { Prisma } from '@prisma/client'
import type { z } from "zod"

import { dummyData } from "./TestData.svelte"

// export const load: PageServerLoad = (async () => {

// }) satisfies PageServerLoad;

export const actions: Actions = {
  dummyData: async ({ request }) => {
    let promiseArray = []

    for (const product of dummyData) {
      for (const variant of product.variants) {
        // console.log(
        //   "creating : " +
        //   product.productBrand + " " +
        //   product.productName + " " +
        //   variant.variant
        // ); // debug

        // createProduct({
        //   productBrand: product.productBrand,
        //   productName: product.productName,
        //   productCategory: product.productCategory,
        //   productVariant: variant.variant,
        //   price: variant.price.toString(),
        //   stock: variant.stock.toString()
        // } as createForm)

        promiseArray.push(
          prisma.product.create({
            data: {
              brand: {
                connectOrCreate: {
                  where: { brandName: product.productBrand },
                  create: { brandName: product.productBrand }
                }
              },
              productName: product.productName,
              productVariant: variant.variant,
              price: variant.price,
              stock: variant.stock,
              category: {
                connectOrCreate: {
                  where: { categoryName: product.productCategory },
                  create: { categoryName: product.productCategory }
                }
              }
            }
          })
        )
      }
    }

    try {
      await prisma.$transaction(
        promiseArray,
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
  }
};