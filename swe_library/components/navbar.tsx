"use client";
import {
  Link,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Button,
} from "@nextui-org/react";

import NextLink from "next/link";

import { AiFillHome } from "react-icons/ai";
import { logout } from "@/app/actions";

export const Navbar = () => {
  return (
    <NextUINavbar isBordered maxWidth="xl" position="sticky">
      <NavbarBrand>
        <NextLink className="flex items-center justify-start gap-1" href="/">
          <AiFillHome />
          <p className="font-bold text-inherit">Home</p>
        </NextLink>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/employee/login">Mitarbeiterlogin</Link>
        </NavbarItem>
        <NavbarItem>
          <Button onClick={() => logout()} color="primary" variant="flat">
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
