import type { Metadata } from "next";
import { Ubuntu_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const ubuntuSans = Ubuntu_Sans({
  variable: "--font-ubuntu-sans",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "FlowLedger",
  },
  description: "The Official FlowLedger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "bg-black hover:bg-gray-900 text-sm normal-case",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${ubuntuSans.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            <NuqsAdapter>
              {children}
              <Toaster position="top-right" className="top-18! right-6!" />
            </NuqsAdapter>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
