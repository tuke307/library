import "@/styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import { Navbar } from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
