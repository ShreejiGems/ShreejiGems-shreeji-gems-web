import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { AppProvider } from "@/src/contexts/AppContext";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-garamond",
});

export const metadata: Metadata = {
  title: "Shreeji Gems | Fine Jewellery & Certified Diamonds",
  description:
    "Experience the artistry of fine jewellery and ethically sourced diamonds with Shreeji Gems. Crafted with precision, trusted by professionals worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className={`${garamond.variable}r antialiased`}>
        <AuthProvider>
          <AppProvider>{children}</AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
