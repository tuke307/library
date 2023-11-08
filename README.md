# Software Engineering - Library Project


## Technologies Used

### Frontend
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

### Backend
- [Next.js 13](https://nextjs.org/docs/getting-started)
- [TypeScript](https://www.typescriptlang.org/)

### Database
- [Prisma](https://www.prisma.io/)
- [Postgres](https://www.postgresql.org/)

### Hosting
- [Vercel](https://vercel.com/)
- [Docker](https://www.docker.com/)
- [GitHub](https://github.com/)


## Development

1. [set up the environment](#environments)
2. [start server](#start-server)
3. [runnning tests](#running-tests)


### Debugging
follow [these steps](https://nextjs.org/docs/pages/building-your-application/configuring/debugging#debugging-with-vs-code) for debugging the api calls and other stuff in vs code.
Then you can use the vs code >>run and debug<< function.


## Environments
- duplicate and rename the `.env.development` file to `.env.development.local`
- duplicate and rename the `.env.production` file to `.env.production.local`

### development (docker)
update the `POSTGRES_PRISMA_URL` in your `.env.development.local` file;
```env
POSTGRES_PRISMA_URL="postgresql://postgres:postgres@localhost:6500/librarydb?schema=public"
```
use `dotenv -e .env.development.local` for `<env>`

for local development, use a docker container:
```bash
<env> npm run docker:up # also inserts sample Data
```

### production (vercel)
use `dotenv -e .env.production.local` for `<env>` and ask for the production keys.


## start server
```bash
# navigate to source code
cd swe_library/
# Install dependencies
npm install
# Run the development server
npm run dev
```

## Running tests
```bash
<env> npm run test
```


## Source code developing

### changing the database scheme
When you have to change the database models, you can do this by editing the `prisma.scheme`.
You then have to apply (upload) these changes to your database. There are two ways of doing this;

#### over migrations (slow and safe way):
```bash
# apply migration dev
npx prisma migrate dev
# apply migration
npx prisma migrate deploy
```

#### hard push (fast and unsafe way):
```bash
<env> npx prisma db push
```

### Visual Studio Code Plugins
- [Tailwind CSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier Tailwind CSS](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Code Spell Checker German](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-german)

### templates to learn
- [Next.js 13 (app directory) and NextUI (v2)](https://github.com/nextui-org/next-app-template/tree/main)