import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventur",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
