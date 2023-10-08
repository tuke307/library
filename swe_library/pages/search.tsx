import DefaultLayout from "@/layouts/default";
import React from "react";
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { FormEvent } from "react";
import { User } from "@prisma/client";
import { siteConfig } from "@/config/site";
import type { InferGetStaticPropsType, GetStaticProps } from 'next'


export default function SearchPage({
  users, 
}: InferGetStaticPropsType<typeof getStaticProps>) {

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch(`${siteConfig.siteUrl}/api/user`, {
      method: "POST",
      body: formData,
    });

    // Handle response if necessary
    const data = await response.json();
    console.log(data);
  }

  return (
    <DefaultLayout>
      <main>
        <section>
          <h1 className="my-3 text-3xl font-semibold">retrieve users</h1>
          <Table aria-label="users table">
            <TableHeader>
              <TableColumn key="id">id</TableColumn>
              <TableColumn key="firstName">first name</TableColumn>
              <TableColumn key="lastName">last name</TableColumn>
              <TableColumn key="email">email</TableColumn>
              <TableColumn key="street">street</TableColumn>
              <TableColumn key="city">city</TableColumn>
              <TableColumn key="plz">plz</TableColumn>
            </TableHeader>
            <TableBody items={users}>
            {(user) => (
                <TableRow key={user.id}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(user, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>

        <section className="mt-10">
          <h1 className="my-3 text-3xl font-semibold">create user</h1>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-2">
              <Input
                isRequired
                type="text"
                label="Nachname"
                placeholder="Enter your name"
                name="lastName"
              />
              <Input
                isRequired
                type="text"
                label="Vorname"
                placeholder="Enter your Vorname"
                name="firstName"
              />
            </div>

            <Input
              className="col-span-2 my-5"
              isRequired
              type="email"
              label="Email"
              placeholder="Enter your email"
              name="email"
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                className="col-span-2"
                isRequired
                type="text"
                label="Straße"
                placeholder="Enter your Straße"
                name="street"
              />

              <Input
                isRequired
                type="text"
                label="PLZ"
                placeholder="Enter your PLZ"
                name="plz"
              />

              <Input
                isRequired
                type="text"
                label="Stadt"
                placeholder="Enter your Stadt"
                name="city"
              />
            </div>
            <Button className="mt-5" color="primary" type="submit">
              create user
            </Button>
          </form>
        </section>
      </main>
    </DefaultLayout>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps = (async (context) => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${siteConfig.siteUrl}/api/user`);
  const data = await res.json();
  const users = data.users as User[];

  return {
    props: {
      users,
    },
  };
}) satisfies GetStaticProps<{
  users: User[];
}>
