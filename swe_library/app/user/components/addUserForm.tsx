"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import { experimental_useFormState as useFormState } from "react-dom";
import { createUser } from "@/actions/user";
import { SubmitButton } from "./submitButton";

const initialState = {
  message: null,
};

export default function AddUserForm() {
  const [state, formAction] = useFormState(createUser, initialState);

  return (
    <form action={formAction}>
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

        <Input
          isRequired
          type="email"
          label="Email"
          placeholder="Enter your email"
          name="email"
        />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-2">
        <Input
          isRequired
          type="text"
          label="Straße"
          placeholder="Enter your Straße"
          name="street"
        />

        <Input
          isRequired
          type="text"
          label="Hausnummer"
          placeholder="Gib deine Hausnummer ein"
          name="houseNumber"
        />

        <Input
          isRequired
          type="number"
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

      <div>
        <SubmitButton />
        <p aria-live="polite" className="sr-only">
          {state?.message}
        </p>
      </div>
    </form>
  );
}
