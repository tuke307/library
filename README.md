# Software Engineering - Library Project

## Technologies Used

- [Next.js 13](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Development
### .env variables
duplicate and rename the `.env` file to `.env.local` and change the variables.

### start server
```bash
# navigate to source code
cd swe_library/
# Install dependencies
npm install
# Run the development server
npm run dev
```
or use the vs code run and debug function

### Debugging
follow these steps for debugging the api calls and other stuff in vs code:
https://nextjs.org/docs/pages/building-your-application/configuring/debugging#debugging-with-vs-code

## Database
whenever changes to the prisma.scheme made:
```bash
# create migration
npx prisma migrate dev --name add_person_table
# apply migrations for dev
npx prisma migrate dev
# apply migrations for prod
npx prisma migrate deploy
```

test api queries for the database:
```bash
npx ts-node script.ts
```

Database management with browser GUI:
```bash
npx prisma studio
```

## Visual Studio Code Plugins
- [tailwind css](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [prettier tailwind css](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

## templates to learn
- [Next.js 13 (app directory) and NextUI (v2)](https://github.com/nextui-org/next-app-template/tree/main)