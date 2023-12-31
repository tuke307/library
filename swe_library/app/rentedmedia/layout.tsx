import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ausgeliehene Medien",
};

export default function RentedMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
