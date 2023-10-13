import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kunden Login",
};

export default function UserLoginLayout({
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
