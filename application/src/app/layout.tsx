
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";


import { useEffect } from "react";

import PageLoaderHandler from "../components/PageLoaderHandler";
import UserProviderWrapper from './context/UserProviderWrapper';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knowledge Pitch",
  keywords: ["school", "management", "system", "student", "teacher", "admin"],
  description: "Knowledge Pitch is a provider of STEM and Robotics education dedicated to equipping schools with cutting-edge learning solutions. Our mission is to inspire young minds through hands-on learning experiences, preparing them for future technological advancements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const userString = cookieStore.get("log-user")?.value;
  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (e) {
    console.error("Error parsing user cookie", e);
  }


  return (
    <html lang="en">
      <body className={inter.className}>
         
            <UserProviderWrapper user={user}>
              <PageLoaderHandler>
               
                {children}</PageLoaderHandler>
             </UserProviderWrapper>
             
      </body>
    </html>
  );
}
