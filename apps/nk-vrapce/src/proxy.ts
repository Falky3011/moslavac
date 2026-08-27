import { markdownProxy } from "@/lib/app-shell/seo/markdownProxy";

export default markdownProxy;

// Samo stranice: preskačemo /api, Next-ove interne rute i sve s nastavkom
// (robots.txt, llms.txt, sitemap.xml, slike) — to su već strojno čitljivi oblici.
export const config = {
  matcher: ["/((?!api|_next|.*\\.).*)"],
};
