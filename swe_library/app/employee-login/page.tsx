"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

export default function EmployeeLoginPage() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  function login() {
    // TODO: Implement login
  }

  return (
    <section className="grid grid-rows-2 gap-2">
      <Input
        label="Mitarbeiternummer"
        type="text"
        variant="bordered"
        placeholder="Mitarbeiternummer"
        className="max-w-xs"
      />

      <Input
        label="Passwort"
        variant="bordered"
        placeholder="Gib dein Passwort ein"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <AiFillEyeInvisible className="pointer-events-none text-2xl text-default-400" />
            ) : (
              <AiFillEye className="pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs"
      />
      <section/>

      <Button className="mt-5" color="primary" onClick={login}>
        Login
      </Button>
    </section>
  );
}
