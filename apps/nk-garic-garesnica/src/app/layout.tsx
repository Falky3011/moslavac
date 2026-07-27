import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ClubRootShell from "@/lib/app-shell/shell/ClubRootShell";
import { clubMetadataRoute } from "@/lib/app-shell/shell/clubRoutes";
import { getTenant } from "@/lib/payload/getTenant";
import { BASE_URL } from "@/lib/siteUrl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Display font — bold grotesk for the club wordmark and numerals (premium brand voice).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "800", "900"],
  display: "swap",
});

// Mono — technical labels, codes and numerals (matchday / fixture aesthetic).
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const generateMetadata = clubMetadataRoute(BASE_URL);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tenant = await getTenant();

  return (
    <ClubRootShell
      fontVariables={`${geistSans.variable} ${archivo.variable} ${geistMono.variable}`}
      baseUrl={BASE_URL}
    >
      <Header tenant={tenant} />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <Footer tenant={tenant} />
    </ClubRootShell>
  );
}
