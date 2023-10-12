import { AddForm } from "@/components/add-form";
import { UsersList } from "@/components/users-list";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Nutzer erstellen",
};

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <section className="mt-10">
        <AddForm />
      </section>

      <section className="mt-10">
        <Suspense fallback={<p>Loading users...</p>}>
          <UsersList />
        </Suspense>
      </section>

      <div className="mt-10">{children}</div>
    </section>
  );
}
