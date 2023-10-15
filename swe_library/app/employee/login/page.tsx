import React from "react";
import LoginForm from "./components/loginForm";

export default async function LoginPage() {
  return (
    <section className="flex h-screen items-center justify-center">
      <LoginForm />
    </section>
  );
}
