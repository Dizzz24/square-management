import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Banner from "./components/Banner";
import RightSide from "./components/RightSide";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Customer Management System",
  description: "Manage your customers efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen bg-[#FFF]`}>
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 flex overflow-hidden">
            <div className="h-full w-5/6 p-5 flex flex-col gap-5">
              <Banner />
              {children}
            </div>
            <RightSide />
          </main>
        </div>
      </body>
    </html>
  );
}
