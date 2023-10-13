"use client";
import React from "react";
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button, Input } from "@nextui-org/react";
import { loginUser } from "@/app/actions";
import { DatePicker } from "nextui-date-picker";

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

export default function UserLoginPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [state, formAction] = useFormState(loginUser, initialState);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form action={formAction}>
      <div className="grid grid-rows-2 gap-5">
        <Input
          label="Kundennumer"
          type="number"
          variant="bordered"
          name="id"
          labelPlacement="outside"
          placeholder="Gib deine Kundennummer ein"
          className="max-w-xs"
        />

        <DatePicker label="Geburtsdatum" />
      </div>

      <LoginButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
