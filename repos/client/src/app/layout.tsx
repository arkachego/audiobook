import type { Metadata } from "next";
import { Maven_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Readonly<Props>) => {

  return (
    <html lang="en" className="w-full h-full overflow-hidden">
      <body className={`${mavenPro.className} antialiased w-full h-full m-0 overflow-hidden`}>
        {children}
        <Toaster />
      </body>
    </html>
  );

};

export const metadata: Metadata = {
  title: "AudioBook",
  description: "Record and store your audio logs",
};

export default RootLayout;
