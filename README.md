# Stock management app
build with SvelteKit, TailwindCSS, Prisma, SQLite, zod

## Things to try
- [ ] tRPC for svelte

## Todos
- [ ] Build Brand page
- [ ] Build Product page
  - [x] Reset the form on success.
  - [x] Client side zod validation.
  - [x] Remove "formFields" store & just pass in the prop in FormInput call?
  - [x] Able to brand it.
- [ ] Build product category page
- [ ] Figure how applyAction works.
- [ ] Write server.ts code for those pages
- [x] Write function & dummy data to put into DB after a `prisma db push`.
  - [ ] weird connection timeout issue. GitHub issue? ([link](https://github.com/prisma/prisma/issues/10306))

## available DB actions
**Product**
- Create product & (create then) connect to the brand, connect to optional fields.
- Update product
- Delete product & remove all the relations the product has.
**Brand**
- Create brand
- Remove brand & remove all the products it has(Double check required).

## Notes
- [ ] Remember to `npx prisma db push` for new schema
  - still testing