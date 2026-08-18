import Image from "next/image";
import Link from "next/link";
import type { FrontendTenant, PayloadMedia } from "@/lib/payload/types";
import MobileNav from "./MobileNav";

interface HeaderProps {
  tenant: FrontendTenant;
}

type NavItem = {
  label: string;
  href?: string;
  /** Vodi izvan stranice — renderira se kao <a> u novoj kartici. */
  external?: boolean;
};

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Novosti", href: "/novosti" },
  { label: "Momčad", href: "/momcad" },
  { label: "Raspored i rezultati", href: "/raspored-i-rezultati" },
  { label: "O klubu", href: "/o-klubu" },
  { label: "Kontakt", href: "/kontakt" },
];

/**
 * Editorial ink header — crna traka s crvenim hairline potpisom na vrhu,
 * grb + Anton wordmark lijevo, navigacija desno s underline hover animacijom.
 */
export default function Header({ tenant }: HeaderProps) {
  const logo =
    tenant.branding?.logo && typeof tenant.branding.logo === "object"
      ? (tenant.branding.logo as PayloadMedia)
      : null;
  const wordmark = tenant.branding?.shortName ?? tenant.displayName;
  const founded = tenant.branding?.founded;
  const webshopUrl = tenant.social?.webshop;
  // Webshop je tuđi (JAKO) i vidi se samo kad je link upisan u CMS-u.
  const navItems: readonly NavItem[] = webshopUrl
    ? [...NAV_ITEMS, { label: "Webshop", href: webshopUrl, external: true }]
    : NAV_ITEMS;

  return (
    <header className="sticky top-0 z-50 h-20 bg-ink-deep text-chalk">
      {/* Crveni potpis na vrhu */}
      <div aria-hidden className="h-0.75 w-full bg-club-red" />

      <div className="mx-auto flex h-[calc(100%-3px)] max-w-400 items-center gap-8 px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          aria-label={tenant.displayName}
          className="group flex shrink-0 items-center gap-3.5"
        >
          <Image
            src={logo?.url ?? "/crest.png"}
            alt={logo?.alt || tenant.displayName}
            width={44}
            height={44}
            className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl uppercase leading-none tracking-wide">
              {wordmark}
            </span>
            <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.34em] text-chalk/50">
              Mravince{founded ? ` · ${founded}` : ""}
            </span>
          </span>
        </Link>

        <nav aria-label="Glavna navigacija" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-6 2xl:gap-9">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.href && item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative pb-1 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-chalk/80 transition-colors hover:text-chalk"
                  >
                    {item.label}
                    <span className="sr-only">(otvara se u novoj kartici)</span>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-club-red transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </a>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="group relative pb-1 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-chalk/80 transition-colors hover:text-chalk"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-club-red transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </Link>
                ) : (
                  <span className="group relative cursor-default pb-1 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-chalk/80 transition-colors hover:text-chalk">
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-club-red transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav items={navItems} />
      </div>
    </header>
  );
}
