import React from "react";
import LoginForm from "./components/loginForm";

export default async function LoginPage() {
  return (
    <section className="h-screen flex items-center justify-center">
      <LoginForm />
    </section>
  );
}
