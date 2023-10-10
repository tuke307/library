"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { createUser } from "../app/actions";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className="mt-5"
      color="primary"
    >
      create user
    </Button>
  );
}

export function AddForm() {
  const [state, formAction] = useFormState(createUser, initialState);

  return (
    <form action={formAction}>
      <h1 className="my-3 text-3xl font-semibold">create user</h1>

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

      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
