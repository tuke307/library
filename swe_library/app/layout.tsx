import "@/styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import { Navbar } from "./components/navbar";
//import { getServerSession } from "next-auth";
//import SessionProvider from "./components/SessionProvider";
//import { authOptions } from "./api/auth/[...nextauth]";


export const metadata: Metadata = {
  title: "Bibliothek",
  description: "Bibliothek der DHBW Stuttgart",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const session = await getServerSession(authOptions);

  return (
    <html lang="de" suppressHydrationWarning>
      <head />
      <body>
     
        <Providers>
          <Navbar />
          {children}
        </Providers>
       
      </body>
    </html>
  );
}
