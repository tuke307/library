import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nutzer erstellen",
};

export default function CreateUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
