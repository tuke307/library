import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medium zurückgeben",
};

export default function ReturnMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
    <div className="">
      {children}
    </div>
  </section>
  );
}
