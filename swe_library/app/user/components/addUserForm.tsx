"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { createUser } from "../../../actions/user";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="mt-7"
      color="primary"
    >
      Kunde erstellen
    </Button>
  );
}

export function AddUserForm() {
  const [state, formAction] = useFormState(createUser, initialState);

  return (
    <form action={formAction}>
      <h1 className="my-10 text-3xl font-semibold">Nutzer hinzufügen</h1>

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

        <div className="grid grid-cols-3 gap-1">
          <Input
            isRequired
            type="number"
            label="Tag"
            placeholder="Tag"
            name="birthdayDay"
          />
          <Input
            isRequired
            type="number"
            label="Monat"
            placeholder="Monat"
            name="birthdayMonth"
          />
          <Input
            isRequired
            type="number"
            label="Jahr"
            placeholder="Jahr"
            name="birthdayYear"
          />
        </div>
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

      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
