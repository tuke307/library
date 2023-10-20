"use client";
import { useFormStatus } from "react-dom";
import { Button, Input } from "@nextui-org/react";


export function SubmitButton() {
  //const { pending } = useFormStatus();

  return (
    <Button type="submit"  className="mt-7" color="primary">
      Kunde erstellen
    </Button>
  );
}
