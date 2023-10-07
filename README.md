# Software Engineering - Library

# Development
```bash
cd swe_library/
npm install
npm run dev
```

# Database
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
```bash

Database management with browser GUI:
```bash
npx prisma studio
```

# Debugging
follow these steps for debugging the api calls and other stuff in vs code:
https://nextjs.org/docs/pages/building-your-application/configuring/debugging#debugging-with-vs-code

# vs code plugins
https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
https://github.com/tailwindlabs/prettier-plugin-tailwindcss