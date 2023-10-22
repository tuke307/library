"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} type="submit" className="mt-5" color="primary">
      Medium erstellen
    </Button>
  );
}
