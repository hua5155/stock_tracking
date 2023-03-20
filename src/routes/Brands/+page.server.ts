import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { Prisma } from '@prisma/client'

import type { formType as createForm } from './AddBrand.svelte'
import { formSchema as createValidator } from './AddBrand.svelte'

export const load: PageServerLoad = async () => {
  const brands = prisma.brand.findMany({
    orderBy: {
      brandName: 'asc'
    },
    select: {
      brandName: true,
      _count: {
        select: {
          products: true
        }
      }
    }
  });

  try {
    await prisma.$transaction(
      [
        brands
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


  return {
    brands: brands
  };
};

export const actions: Actions = {
  createBrand: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData()) as createForm;
    const zResult = createValidator.safeParse(formData);

    if (zResult.success === false) {
      const { fieldErrors: zErrors } = zResult.error.flatten();
      const { ...returnData } = formData;
      console.log("server-side validation error :");  // debug
      console.log(returnData);  // debug
      console.log(zErrors);  // debug
      return fail(400);
    } else {
      console.log("server-side validation :", zResult);  // debug
      // return {}
    }

    try {
      await prisma.brand.create({
        data: {
          brandName: zResult.data.brandName
        }
      })
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
  deleteBrand: async ({ url }) => {
    const brandName = url.searchParams.get('brandName')
    if (brandName === null) return fail(500, { message: "Parameter : brandName missing." });

    try {
      await prisma.$transaction(
        [
          prisma.brand.update({
            where: { brandName: brandName },
            data: {
              products: {
                deleteMany: {}
              }
            }
          }),
          prisma.brand.delete({
            where: { brandName: brandName }
          })
        ],
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        }
      )
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
