import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medium bearbeiten",
};

export default function MediaEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
