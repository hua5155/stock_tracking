import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { get } from "svelte/store";
import { prisma } from "$lib/server/prisma";
import { Prisma } from '@prisma/client'

import { cart } from "$lib/conponents/Cart.svelte";  // server side don't have store, export array??

export const load: PageServerLoad = (async () => {
  try {
    await prisma.$transaction(
      [
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

  }
}) satisfies PageServerLoad;

export const actions: Actions = {

};