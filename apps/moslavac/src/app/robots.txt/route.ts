import { buildRobotsTxt } from "@/lib/app-shell/seo/robots";
import { BASE_URL } from "@/lib/siteUrl";

// Pravila su statična, pa se robots.txt ispisuje jednom pri buildu.
export const dynamic = "force-static";

/**
 * robots.txt se poslužuje kao ruta, a ne kao Next-ova metadata datoteka, jer
 * `MetadataRoute.Robots` ne zna ispisati `Content-Signal` retke.
 */
export function GET(): Response {
  return new Response(buildRobotsTxt({ baseUrl: BASE_URL }), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
