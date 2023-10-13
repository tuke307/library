import React from "react";
import { AddUserForm } from "@/components/add-user-form";
import { UsersList } from "@/components/users-list";
import { Suspense } from "react";

export default async function CreateUserPage() {
  return (
    <section>
      <section className="mt-10">
        <AddUserForm />
      </section>

      <section className="mt-10">
        <Suspense fallback={<p>Loading users...</p>}>
          <UsersList />
        </Suspense>
      </section>
    </section>
  );
}