import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { z } from "zod"

import { formValidator as createValidator, type formType } from "./AddProduct.svelte"

export const load: PageServerLoad = async () => {
  // const query = await prisma.brand.findMany({select: {
  //   brandName: true,
  //   products: {select: {
  //     productName: true,
  //     price: true,
  //     stock: true,
  //   }},
  // }});

  // // console.log(query);  // debug

  // return {
  //   query,
  // };
};

export const actions: Actions = {
  createProduct: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData()) as formType;

    const validate = createValidator.safeParse(formData);
    if (validate.success === false) {
      const { fieldErrors: returnErrors } = validate.error.flatten();
      const { ...returnData } = formData;
      console.log("server-side validation error :");  // debug
      console.log(returnData);  // debug
      console.log(returnErrors);  // debug
      // return {
      //   data: returnData,
      //   error: returnErrors,
      // };
      return fail(400, {
        data: returnData,
        error: returnErrors,
      });
    } else {
      console.log("server-side validation :", validate);
      // return {}
    }

    // type createSchema = z.infer<typeof createValidator>;

    try {
      await prisma.product.create({
        data: {
          productName: formData.productName,
          price: Number(formData.price),
          stock: Number(formData.stock),
          brand: {
            connectOrCreate: {
              where: { brandName: formData.brandName },
              create: {
                brandName: formData.brandName
              }
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
      return fail(500, { message: "Something went wrong, Couldn't create the product." });
    }
    return { status: 201 };
  },
  deleteProduct: async ({ request }) => {
    const deleteData = Object.fromEntries(await request.formData()) as { brandName: string };

    try {
      await prisma.brand.update({
        where: { ...deleteData },
        data: {
          products: {
            deleteMany: {},
          },
        }
      });
      await prisma.brand.delete({
        where: { ...deleteData },
      });
    } catch (error) {
      console.log(error);
      return fail(500, { message: "Something went wrong, Couldn't delete the brand." });
    }
    return { status: 200 };
  }
};
