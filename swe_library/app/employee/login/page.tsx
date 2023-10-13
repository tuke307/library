"use client";
import React from "react";
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button, Input } from "@nextui-org/react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { loginEmployee } from "@/app/actions";

const initialState = {
  message: null,
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className="mt-10"
      color="primary"
    >
      Login
    </Button>
  );
}

export default function EmployeeLoginPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [state, formAction] = useFormState(loginEmployee, initialState);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form action={formAction}>
      <div className="grid grid-rows-2 gap-5">
        <Input
          label="Mitarbeiternummer"
          type="number"
          variant="bordered"
          name="id"
          labelPlacement="outside"
          placeholder="Gib deine Mitarbeiternummer ein"
          className="max-w-xs"
        />

        <Input
          label="Passwort"
          variant="bordered"
          name="password"
          placeholder="Gib dein Passwort ein"
          labelPlacement="outside"
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
      </div>

      <LoginButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
