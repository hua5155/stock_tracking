# Stock management app
build with SvelteKit, TailwindCSS, Prisma, SQLite, zod

<!-- ## Things to try -->
<!-- - [ ] tRPC for svelte -->

## Todos
- [x] Build Brand page
- [x] Build Product page
  - [x] Reset the form on success.
  - [x] Client side zod validation.
  - [x] Remove "formFields" store & just pass in the prop in FormInput call?
  - [x] Able to brand it.
- [ ] Build product category page
<!-- - [ ] Figure how applyAction works. -->
- [ ] Write server code for those pages
- [x] Write function & dummy data to put into DB after a `prisma db push`.
  - weird connection timeout issue. GitHub issue? ([link](https://github.com/prisma/prisma/issues/10306))
  - Solved it by putting all the promise in a array and resolve it sequantially.
- [ ] Queue all the primsa query into a batch?
  - Prisma - Transactions and batch queries ([link](https://www.prisma.io/docs/concepts/components/prisma-client/transactions#sequential-prisma-client-operations))

## available DB actions
**Product**
- Create product & (create then) connect to the brand, connect to optional fields.
- Update product
- Delete product & remove all the relations the product has.
- Add product to cart
**Brand**
- Create brand
- Remove brand & remove all the products it has(Double check required).
**Checkout**
- View products in cart
- Checkout (using POST to api folder)