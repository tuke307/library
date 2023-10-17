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
### set up the environment
- duplicate and rename the `.env.development` file to `.env.development.local`
- duplicate and rename the `.env.production` file to `.env.production.local`
- change the variables in `.env.development.local` and `.env.production.local` to your desired source

### start server
```bash
# navigate to source code
cd swe_library/
# Install dependencies
npm install
# Run the development server
npm run dev
```

### Debugging
follow [these steps](https://nextjs.org/docs/pages/building-your-application/configuring/debugging#debugging-with-vs-code) for debugging the api calls and other stuff in vs code.
Then you can use the vs code >>run and debug<< function.


## Database
### local development (over docker)
for local development, use a docker container:
```bash
docker run -d -e POSTGRES_DB=librarydb -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -p "6500:5432" postgres
```

update the `POSTGRES_PRISMA_URL` in your `.env.development.local` file;
```
POSTGRES_PRISMA_URL="postgresql://postgres:postgres@localhost:6500/librarydb?schema=public"
```
### changing the `prisma.scheme`
When you have to change the database models, you can do this by editing the `prisma.scheme`.
You then have to apply (upload) these changes to your database. There are two ways of doing this;

#### over migrations (slow and safe way):
```bash
# create migration
dotenv -e .env.development.local npx prisma migrate dev --name add_person_table
# apply migrations for dev
dotenv -e .env.development.local npx prisma migrate dev
# apply migrations for prod
dotenv -e .env.development.local npx prisma migrate deploy
```

#### hard push (fast and unsafe way):
```bash
dotenv -e .env.development.local npx prisma db push
```

### insert sample data (optional)
if you want sample data, to use the full potential of the website, insert some sample data;
```bash
dotenv -e .env.development.local npx ts-node sampleData/initial-database.ts
```

### Prisma Studio
Database management with browser GUI:
```bash
dotenv -e .env.development.local npx prisma studio
```


## Visual Studio Code Plugins
- [Tailwind CSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier Tailwind CSS](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)


## templates to learn
- [Next.js 13 (app directory) and NextUI (v2)](https://github.com/nextui-org/next-app-template/tree/main)