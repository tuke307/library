"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} type="submit" className="m-2" color="primary">
      {text}
    </Button>
  );
}
