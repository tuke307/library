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
npm install
npm install -g dotenv-cli
npm install -g prisma
```

### environment
* copy and rename `.env.sample` to `.env.development`
* copy and rename `.env.sample` to `.env.production`


#### development (docker)

for local development, execute these statements;
```bash
docker compose -f docker.compose.yml up -d
dotenv -f .env.development run npx prisma db push
dotenv -f .env.development run ts-node sampleData/initialDatabase.ts
npm run dev
```

#### production

Run the production server with this line;
```bash
npm run build
dotenv -f .env.production run npx prisma db push
dotenv -f .env.production run ts-node sampleData/initialDatabase.ts
npm run start
```

## optional: Docker
building
```bash
docker build --tag tonylukeregistry.azurecr.io/tonylukeregistry/swe-library/app:latest .
```

running container locally
```bash
docker run --detach --publish 3000:3000 tonylukeregistry.azurecr.io/tonylukeregistry/swe-library/app:latest
```


### Running tests
```bash
npm run dev
npm run cypress:open
```


## Source code developing

### changing the database scheme
When you have to change the database models, you can do this by editing the `prisma.scheme`.
You then have to apply (upload) these changes to your database. There are two ways of doing this;

```bash
<env> npx db push
```
