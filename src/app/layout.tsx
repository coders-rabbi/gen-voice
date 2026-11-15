import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ActiveUsersProvider } from "@/context/activeUserContext";
import VisitTracker from "@/components/Visittracker";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gen Voice",
  description:
    "Genvoice is the first Generation Z based news portal in Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8538918502717714"
          crossOrigin="anonymous"
        />
        <meta name="google-adsense-account" content="ca-pub-8538918502717714" />
        <script>
          (function(s)
          {
            ((s.dataset.zone = "12267950"),
            (s.src = "https://nap5k.com/tag.min.js"))
          }
          )([document.documentElement,
          document.body].filter(Boolean).pop().appendChild(document.createElement('script')))
        </script>
      </head>
      <body className="bg-white" suppressHydrationWarning>
        <ActiveUsersProvider>
          <VisitTracker />
          {children}
          <Toaster position="top-center" richColors />
        </ActiveUsersProvider>
      </body>
    </html>
  );
}
