"use client";
import { Button } from "@nextui-org/react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} type="submit" className="mt-7" color="primary">
      Login
    </Button>
  );
}
