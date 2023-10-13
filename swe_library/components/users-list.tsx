"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
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
            <TableColumn key="id">Id</TableColumn>
            <TableColumn key="firstName">Vorname</TableColumn>
            <TableColumn key="lastName">Nachname</TableColumn>
            <TableColumn key="birthday">Geburtstag</TableColumn>
            <TableColumn key="email">E-Mail</TableColumn>
            <TableColumn key="street">Straße</TableColumn>
            <TableColumn key="city">Stadt</TableColumn>
            <TableColumn key="plz">Postleitzahl</TableColumn>
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
  const res = await fetch(`${siteConfig.siteUrl}/user/api`);
  const data = await res.json();
  const users = data.users as User[];

  return users;
}
