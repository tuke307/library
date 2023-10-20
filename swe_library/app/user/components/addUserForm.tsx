"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submitButton";
import createUser from "@/actions/user";

const initialState = {
  message: null,
}

export default function AddUserForm() {
  //const [state, formAction] = useFormState(createUser, initialState)

  return (
    <form action={createUser}>
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

      <SubmitButton />

      
    </form>
  );
}
