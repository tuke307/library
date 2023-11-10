# Software Engineering - Library Project


## Technologies Used

| Frontend | Backend      | Database | Hosting |
|----------|--------------|----------|---------|
| - [NextUI v2](https://nextui.org/)<br>- [Tailwind CSS](https://tailwindcss.com/)<br>- [Tailwind Variants](https://tailwind-variants.org)<br>- [Framer Motion](https://www.framer.com/motion/)<br>- [next-themes](https://github.com/pacocoursey/next-themes)<br>  | - [Next.js 13](https://nextjs.org/docs/getting-started)<br>- [TypeScript](https://www.typescriptlang.org/) |  - [Prisma](https://www.prisma.io/)<br>- [Postgres](https://www.postgresql.org/)        |  - [Vercel](https://vercel.com/)<br>- [Docker](https://www.docker.com/)<br>- [GitHub](https://github.com/)       |


## Development

1. [install dependencies](#install-dependencies)
2. [choose environment](#environment)
3. [runnning tests](#running-tests)


### install dependencies
```bash
# navigate to source code
cd swe_library/
# Install dependencies
npm install
```

### environment

#### development (docker)
update the variables in your `.env.development` file;
```env
POSTGRES_PRISMA_URL="postgresql://postgres:postgres@localhost:6500/librarydb?schema=public"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET='sampleKey'
```

update the scheme.prisma file to use your local docker postgres db;
```
...
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
...
```

for local development then, execute these statements;
```bash
docker compose -f docker.compose.yml up -d
dotenv -e .env.development npx prisma generate
dotenv -e .env.development npx prisma migrate deploy
dotenv -e .env.development npx ts-node sampleData/initialDatabase.ts
npm run dev
```

#### production (vercel)
use `dotenv -e .env.production` and ask for the production keys.

Run the production server with this line;
```bash
npm run build
npm run start
```


### Running tests
```bash
dotenv -e .env.development npm run test # dev
dotenv -e .env.production npm run test # prod
```


## Source code developing

### changing thse database scheme
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
dotenv -e .env.development npx db push # dev
dotenv -e .env.production npx db push # prod
```

### debugging in Visual Studio Code
follow [these steps](https://nextjs.org/docs/pages/building-your-application/configuring/debugging#debugging-with-vs-code) for debugging the api calls and other stuff in vs code.
Then you can use the vs code >>run and debug<< function.


### Visual Studio Code Plugins
- [Tailwind CSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier Tailwind CSS](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Code Spell Checker German](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-german)

### templates to learn
- [Next.js 13 (app directory) and NextUI (v2)](https://github.com/nextui-org/next-app-template/tree/main)