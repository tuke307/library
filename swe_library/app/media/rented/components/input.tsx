"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { LoginButton } from "./loginButton";
import { getRentedMediaByUserId } from "@/actions/rentedMedia";
import { experimental_useFormState as useFormState } from "react-dom";
import { RentedMediaTableProp } from "@/models/rentedmediaTable";

type LoginFormProps = {
  onFetchSuccess: (data: RentedMediaTableProp[]) => void;
};

export default function LoginForm({ onFetchSuccess }: LoginFormProps) {
  const [userId, setUserId] = useState<string>("");
  const [state, formAction] = useFormState<number>(getUserIdState, 0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    formAction();
  };

  async function getUserIdState(): Promise<number> {
    const currentUserId = Number(userId);
    const result = await getRentedMediaByUserId(currentUserId);

    if (Array.isArray(result)) {
      onFetchSuccess(result);
      return result.length;
    } else {
      return 0;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-2">
        <Input
          isRequired
          value={userId}
          label="Kundennumer"
          type="number"
          variant="bordered"
          name="userId"
          labelPlacement="outside"
          placeholder="Gib deine Kundennummer ein"
          className="max-w-xs"
          onChange={handleChange}
        />
        <LoginButton />
      </div>
    </form>
  );
}
