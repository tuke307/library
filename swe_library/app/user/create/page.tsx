import React from "react";
import AddUserForm from "../components/addUserForm";


export default async function CreateUserPage() {
  return (
    <section className="m-10">
      <h1 className="my-10 text-3xl font-semibold">Nutzer hinzufügen</h1>

      <AddUserForm />
    </section>
  );
}
