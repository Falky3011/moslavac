"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { FrontendTenant } from "@/lib/payload/types";

type HeroProps = {
  tenant: FrontendTenant;
};

/**
 * Naslovni hero — full-bleed zračni snimak igrališta u klupskoj plavoj
 * (duoton umjesto sirove fotke), golemi condensed naziv kluba uz donji rub
 * (prva riječ puna, druga iscrtana bijelo). Grb se ne ponavlja — već je u
 * headeru. Godina osnutka stoji kao tihi žig u donjem desnom kutu.
 */
export default function Hero({ tenant }: HeroProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const typeY = useTransform(scrollYProgress, [0, 1], [0, 36]);

  const founded = tenant.branding?.founded ?? 1923;
  const [first, ...rest] = tenant.displayName.replace(/^NK\s+/i, "").split(" ");
  const wordLeft = first ?? "Garić";
  const wordRight = rest.join(" ") || "Garešnica";

  const anim = (delay: number, from: Record<string, number>) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, ...from },
          animate: { opacity: 1, x: 0, y: 0 },
          transition: {
            duration: 0.85,
            delay,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[74vh] flex-col justify-end overflow-hidden bg-navy-deep md:min-h-[82vh]"
    >
      {/* Zračni snimak igrališta — full-bleed, u duotonu (grayscale + plavi overlay). */}
      <Image
        src="/photos/stadion.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover grayscale contrast-125"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-club mix-blend-color"
      />
      {/* Scrim — taman dolje-lijevo (gdje stoji tekst), rasvijetljen gore-desno. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top right, oklch(0.14 0.05 262 / 0.92), oklch(0.14 0.05 262 / 0.5) 46%, oklch(0.14 0.05 262 / 0.15) 78%)",
        }}
      />

      {/* Halftone raster iz ramena dresa — gornji desni kut, samo grafika. */}
      <div
        aria-hidden
        className="halftone pointer-events-none absolute -right-16 -top-16 hidden h-105 w-105 rotate-18 opacity-30 md:block"
        style={
          {
            "--halftone-size": "15px",
            "--halftone-color": "rgba(255,255,255,0.7)",
            maskImage:
              "radial-gradient(circle at 35% 60%, black 0%, black 22%, transparent 62%)",
          } as React.CSSProperties
        }
      />

      <motion.div
        style={reduce ? undefined : { y: typeY }}
        className="relative z-10 mx-auto w-full max-w-350 px-4 pb-14 pt-32 sm:px-6 sm:pb-16 md:pb-20 lg:px-10"
      >
        <h1 className="font-display uppercase leading-[0.95] text-white">
          <motion.span
            {...anim(0.1, { x: -36 })}
            className="block text-[clamp(4.6rem,17vw,13.5rem)] tracking-tight"
          >
            {wordLeft}
          </motion.span>
          <motion.span
            {...anim(0.22, { x: -36 })}
            className="text-stroke mt-3 block text-[clamp(2.9rem,10.5vw,8.5rem)] tracking-tight sm:mt-5 md:ml-[9vw] md:mt-6"
            style={{ "--text-stroke-color": "#ffffff" } as React.CSSProperties}
          >
            {wordRight}
          </motion.span>
        </h1>
      </motion.div>

      {/* Godina osnutka — golemi žig u donjem desnom kutu. */}
      <motion.div
        {...anim(0.4, { y: 14 })}
        className="relative z-10 mx-auto mb-6 w-full max-w-350 px-4 text-right sm:px-6 lg:px-10"
      >
        <span className="block font-mono text-[0.68rem] uppercase tracking-[0.32em] text-white/55">
          Osnovan
        </span>
        <span
          className="text-stroke -mt-2 block font-display text-6xl leading-none tracking-tight sm:text-7xl md:text-8xl"
          style={{ "--text-stroke-color": "#ffffff" } as React.CSSProperties}
        >
          {founded}
        </span>
      </motion.div>
    </section>
  );
}
