import { Button, ButtonProps } from "@nextui-org/react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export function SubmitButton({ ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} type="submit" className="m-2" color="primary" {...props} />
  );
}