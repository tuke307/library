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
import React from "react";
import { AiFillHome } from "react-icons/ai";

export function Navbar() {
  const { data: session } = useSession();

  const AuthButton = React.useMemo(() => {
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
        <Button onClick={() => signIn()} color="primary">
          Mitarbeiterlogin
        </Button>
      </>
    );
  }, [session]);

  return (
    <NextUINavbar isBordered maxWidth="xl">
      <NavbarBrand>
        <Link className="flex items-center justify-start gap-1" href="/">
          <AiFillHome />
          <p className="font-bold text-inherit">Home</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>{AuthButton}</NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
