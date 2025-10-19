import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "EchoHub – AI Workspace for Freelancers and Creators",
  description:
    "One calm place for all your client chaos. EchoHub unifies clients, projects, proposals, and comms — with AI summaries and a smart scheduler.",
  openGraph: {
    title: "EchoHub – AI Workspace for Freelancers and Creators",
    description: "One calm place for all your client chaos.",
    type: "website",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#6366f1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "EchoHub",
  },
  manifest: "/manifest.json",
};

import { AuthProvider } from "./contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
