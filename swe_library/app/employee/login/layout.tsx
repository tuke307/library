import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mitarbeiter Login",
};

export default function EmployeeLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="">{children}</div>
    </section>
  );
}
