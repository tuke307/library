"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { SubmitButton } from "@/app/components/submitButton";

export default function LoginForm() {
  const router = useRouter();
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<any>) {
    setErrorText("");
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await signIn("credentials", {
      id: formData.id,
      password: formData.password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/");
    } else if (res?.status === 401) {
      setErrorText(
        "Die angegebene Mitarbeiternummer oder das Passwort ist ungültig.",
      );
      formData.password = "";
    } else {
      setErrorText(
        "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut",
      );
      formData.id = "";
      formData.password = "";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-[300px]">
      <div className="grid grid-rows-2 gap-5">
        <Input
          isRequired
          onChange={handleChange}
          value={formData.id}
          label="Mitarbeiternummer"
          type="number"
          variant="bordered"
          name="id"
          labelPlacement="outside"
          placeholder="Gib deine Mitarbeiternummer ein"
          className="max-w-xs"
        />

        <Input
          isRequired
          onChange={handleChange}
          value={formData.password}
          label="Passwort"
          variant="bordered"
          name="password"
          placeholder="Gib dein Passwort ein"
          labelPlacement="outside"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <AiFillEyeInvisible className="pointer-events-none text-2xl text-default-400" />
              ) : (
                <AiFillEye className="pointer-events-none text-2xl text-default-400" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
        />
      </div>

      
      <SubmitButton text="Login" />
      <p className="mb-4 text-center text-base text-red-500">{errorText}</p>
    </form>
  );
}
