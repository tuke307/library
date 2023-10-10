"use client";
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
  Pagination,
} from "@nextui-org/react";
import { User } from "@prisma/client";
import { siteConfig } from "@/config/site";

export async function UsersList() {
  const items = await getUsers();

  return (
    <section>
      <section>
        <h1 className="my-3 text-3xl font-semibold">retrieve users</h1>
        <Table aria-label="Example table with client side pagination">
          <TableHeader>
            <TableColumn key="id">id</TableColumn>
            <TableColumn key="firstName">first name</TableColumn>
            <TableColumn key="lastName">last name</TableColumn>
            <TableColumn key="email">email</TableColumn>
            <TableColumn key="street">street</TableColumn>
            <TableColumn key="city">city</TableColumn>
            <TableColumn key="plz">plz</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </section>
  );
}

async function getUsers() {
  const res = await fetch(`${siteConfig.siteUrl}/users/api`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  const users = data.users as User[];

  return users;
}
