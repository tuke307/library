"use client";
import {
  Link,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Button,
} from "@nextui-org/react";

import { signIn, signOut, useSession } from "next-auth/react";
import { AiFillHome } from "react-icons/ai";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Button onClick={() => signOut()} color="primary">
          Logout
        </Button>
      </>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()} color="primary">Mitarbeiterlogin</Button>
    </>
  );
}

export const Navbar = () => {
  return (
    <NextUINavbar isBordered maxWidth="xl" position="sticky">
      <NavbarBrand>
        <Link className="flex items-center justify-start gap-1" href="/">
          <AiFillHome />
          <p className="font-bold text-inherit">Home</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <AuthButton />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
