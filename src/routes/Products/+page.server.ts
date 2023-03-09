import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { Prisma } from '@prisma/client'
import { z } from "zod"

import { formValidator as createValidator } from "./AddProduct.svelte"
import type { formType as createForm } from "./AddProduct.svelte"

import { dummyData } from "./TestData.svelte"

const createProduct = async (data: createForm) => {
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
      productVariant: data.variant,
      price: Number(data.price),
      stock: Number(data.stock)
    }
  })
}

export const load: PageServerLoad = (async ({ params }) => {
  const query = await prisma.product.findMany({
    select: {
      productBrand: true,
      productName: true,
      productCategory: true,
      productVariant: true,
      price: true,
      stock: true
    }
  });

  // console.log('server-side pageData :\n', returnData);  // debug

  return { products: query };
}) satisfies PageServerLoad;

export const actions: Actions = {
  newProduct: async ({ request }) => {
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
      createProduct(formData);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('Error code : ' + error.code);  // debug
      }
      return fail(500, { message: "Something went wrong, Couldn't create the product." });
    }
  },
  deleteProduct: async ({ request }) => {
    // const deleteData = Object.fromEntries(await request.formData()) as { brandName: string };

    // try {
    //   await prisma.brand.update({
    //     where: { ...deleteData },
    //     data: {
    //       products: {
    //         deleteMany: {},
    //       },
    //     }
    //   });
    //   await prisma.brand.delete({
    //     where: { ...deleteData },
    //   });
    // } catch (error) {
    //   console.log(error);
    //   return fail(500, { message: "Something went wrong, Couldn't delete the brand." });
    // }
    // return { status: 200 };
  },
  dummyData: async ({ request }) => {
    for (const product of dummyData) {
      for (const variant of product.variants) {
        try {
          console.log(
            "creating : " +
            product.productBrand + " " +
            product.productName + " " +
            variant.variant
          ); // debug
          createProduct({
            productBrand: product.productBrand,
            productName: product.productName,
            productCategory: product.productCategory,
            variant: variant.variant,
            price: variant.price.toString(),
            stock: variant.stock.toString()
          } as createForm);
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log('Error code : ' + error.code);
          }
        }
      }
    }
  },
  writeTest: async ({ request }) => {
    console.log('writeTest hit');
    const testData: createForm = {
      productBrand: 'Pirelli',
      productName: 'Rosso Scooter',
      productCategory: 'Motorcycle tire',
      variant: '110/70R12 F',
      price: '0',
      stock: '0'
    }

    try {
      createProduct(testData)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('Error code : ' + error.code);
      }
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(error.message);
      }
    }
  },
  deleteTest: async ({ request }) => {
    console.log('deleteTest hit');
    const testValidator = z.object({
      productBrand: z.string(),
      productName: z.string(),
      productVariant: z.string()
    });
    type testType = z.infer<typeof testValidator>
    const testData: testType = {
      productBrand: 'Pirelli',
      productName: 'Rosso Scooter',
      productVariant: '110/70R12 F'
    };

    try {
      await prisma.product.delete({
        where: {
          productBrand_productName_productVariant: {
            productBrand: testData.productBrand,
            productName: testData.productName,
            productVariant: testData.productVariant
          }
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('Error code : ' + error.code);
      }
    }
  }
};
