import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medium suchen",
};

export default function MediaSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
