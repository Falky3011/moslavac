"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { FrontendTenant, PayloadMedia } from "@/lib/payload/types";

type HeroProps = {
  tenant: FrontendTenant;
};

/**
 * Naslovni hero NK Garić Garešnica — editorial, type-led (varijanta B).
 *
 * Svijetla pozadina s vrlo suptilnim dijagonalnim linijama. Lijevo: kicker s
 * hairlineom + golemi, čitljivi naziv "GARIĆ / GAREŠNICA" (display grotesk,
 * klupska plava) + lokacija. Desno: grb uz meki glow i tihi iscrtani "1923".
 * Grb se ne probija tekstom (bio je uzrok ranije buke). Tema-aware kroz tokene.
 */
export default function Hero({ tenant }: HeroProps) {
  const reduce = useReducedMotion();

  const logo =
    tenant.branding?.logo && typeof tenant.branding.logo === "object"
      ? (tenant.branding.logo as PayloadMedia)
      : null;

  const founded = tenant.branding?.founded ?? 1923;
  const [first, ...rest] = tenant.displayName.replace(/^NK\s+/i, "").split(" ");
  const wordLeft = first ?? "Garić";
  const wordRight = rest.join(" ") || "Garešnica";
  const region = tenant.contact?.region ?? "Bjelovarsko-bilogorska županija";

  const anim = (delay: number, from: Record<string, number>) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, ...from },
          animate: { opacity: 1, x: 0, y: 0, scale: 1 },
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-background">
      {/* Jedva vidljiv zračni snimak kompleksa — tekstura iza svega. */}
      <Image
        src="/photos/stadion.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 object-cover opacity-[0.07] filter-[grayscale(0.35)]"
      />
      {/* Suptilne dijagonalne linije — tekstura, ne ukras. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "repeating-linear-gradient(115deg, color-mix(in oklch, var(--club) 4%, transparent) 0 1px, transparent 1px 46px)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-6 lg:px-8">
        {/* Tekst */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <motion.div
            {...anim(0, { y: -12 })}
            className="mb-6 flex items-center justify-center gap-4 md:justify-start"
          >
            <span className="h-0.5 w-13 bg-club" />
            <span className="text-[0.8rem] font-bold uppercase tracking-[0.34em] text-club">
              Osnovan {founded}.
            </span>
          </motion.div>

          <h1 className="font-display font-black uppercase leading-[0.82] tracking-tight text-primary">
            <motion.span
              {...anim(0.12, { x: -32 })}
              className="block text-[13vw] md:text-[8.6vw] lg:text-[8.5rem]"
            >
              {wordLeft}
            </motion.span>
            <motion.span
              {...anim(0.22, { x: -32 })}
              className="block text-[9vw] text-primary/85 md:text-[6.2vw] lg:text-[6rem]"
            >
              {wordRight}
            </motion.span>
          </h1>

          <motion.p
            {...anim(0.34, { y: 12 })}
            className="mt-7 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground"
          >
            {region} · Hrvatska
          </motion.p>
        </div>

        {/* Grb + glow + tihi broj */}
        <div className="relative order-1 flex items-center justify-center md:order-2">
          <div
            aria-hidden
            className="pointer-events-none absolute h-[62vh] max-h-140 w-[62vh] max-w-140 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklch, var(--club) 14%, transparent), transparent 70%)",
            }}
          />
          <motion.span
            {...anim(0.1, { scale: 0.9 })}
            aria-hidden
            className="pointer-events-none absolute right-[-4%] top-[2%] z-0 select-none font-display text-[38vw] font-black leading-none tracking-tighter md:text-[20vw] lg:text-[18rem]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(50deg, var(--foreground) 0 1.5px, transparent 1.5px 12px)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              opacity: 0.1,
            }}
          >
            {founded}
          </motion.span>

          {logo?.url && (
            <motion.div
              {...anim(0.18, { y: 22, scale: 0.97 })}
              className="relative z-10 drop-shadow-[0_26px_46px_rgba(0,80,144,0.22)]"
            >
              <Image
                src={logo.url}
                alt={logo.alt || tenant.displayName}
                width={logo.width ?? 232}
                height={logo.height ?? 290}
                priority
                sizes="(max-width: 768px) 60vw, 34vw"
                className="h-[40vh] max-h-110 w-auto md:h-[54vh]"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
