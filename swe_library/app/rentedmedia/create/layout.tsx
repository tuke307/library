import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediendetails",
};

export default function RentedMediaCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
