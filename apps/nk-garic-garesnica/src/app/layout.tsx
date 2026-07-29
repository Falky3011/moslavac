import { Big_Shoulders, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ClubRootShell from "@/lib/app-shell/shell/ClubRootShell";
import { clubMetadataRoute } from "@/lib/app-shell/shell/clubRoutes";
import { getTenant } from "@/lib/payload/getTenant";
import { BASE_URL } from "@/lib/siteUrl";

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Display font — Big Shoulders, ultra-condensed sportski plakat (naslovi,
// rezultati, brojevi dresa). Varijabilan do 900, pa `font-black` više nije
// sintetički bold. Os `opsz` se postavlja u globals.css (.font-display).
// Anton je odbačen: kvačice hrvatskih slova (Č/Ć/Š/Ž) su mu u latin-ext
// podskupu loše pozicionirane, vidljivo odvojene od slova.
const heading = Big_Shoulders({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  display: "swap",
});

// Mono — technical labels, codes and numerals (matchday / fixture aesthetic).
const mono = JetBrains_Mono({
  variable: "--font-mono-club",
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
      fontVariables={`${body.variable} ${heading.variable} ${mono.variable}`}
      baseUrl={BASE_URL}
    >
      <Header tenant={tenant} />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <Footer tenant={tenant} />
    </ClubRootShell>
  );
}
