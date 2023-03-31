import type { RequestHandler } from './$types';
import { prisma } from "$lib/server/prisma";
import { Prisma } from '@prisma/client'

import { checkoutVaildator } from '$lib/conponents/Cart.svelte';

export const GET = async ({ request }) => {
  const requestBody = await request.json()
  console.log(requestBody)  // debug

  return new Response(JSON.stringify({ message: 'Success' }), { status: 200 })
}

export const POST = async ({ request }) => {
  const requestBody = await request.json()
  // console.log(requestBody)  // debug
  const zResult = checkoutVaildator.safeParse(requestBody);

  if (zResult.success === false) {
    const { fieldErrors: zErrors } = zResult.error.flatten();
    console.log("server-side validation error :\n", requestBody);  // debug
    console.log(zErrors);  // debug
    return new Response(JSON.stringify({ message: 'Failed' }), { status: 501 })
  } else {
    console.log("server-side validation :", zResult.data);  // debug
  }

  for (const ele of zResult.data) {
    const item = await prisma.product.findUnique({
      where: { id: ele.id }
    })
    if (item?.stock! <= 0) {
      console.log(`${item?.productBrand} ${item?.productName} ${item?.productName} doesn't have enough stock`)  // debug
      return new Response(JSON.stringify({ message: `${item?.productBrand} ${item?.productName} ${item?.productName} doesn't have enough stock` }), { status: 500 })
    }
    console.log('item :', item)  // debug
  }

  for (const ele of zResult.data) {
    try {
      await prisma.product.update({
        where: { id: ele.id },
        data: {
          stock: { decrement: ele.quantity }
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('Error code : ' + error.code);  // debug
      }
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(error.message);  // debug
      }
      return new Response(JSON.stringify({ message: "Something went wrong, Couldn't update the product." }), { status: 500 })
    }
  }

  return new Response(JSON.stringify({ message: 'Success' }), { status: 201 })
}