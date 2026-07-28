import type { ReactNode } from 'react'

type LegalPageProps = {
  title: string
  intro: string
  /** Datum zadnje izmjene, npr. „28. srpnja 2026.". */
  updated: string
  children: ReactNode
}

/**
 * Okvir za pravne stranice. Tipografija je definirana ovdje jednom, pa svaka
 * stranica ostaje čisti tekst bez klasa.
 */
export function LegalPage({ title, intro, updated, children }: LegalPageProps) {
  return (
    <article className="border-t border-line">
      <div className="mx-auto w-full max-w-[760px] px-5 py-20 sm:px-8 lg:py-28">
        <p className="label text-pitch">Pravno</p>
        <h1 className="display mt-4 text-[clamp(2.2rem,5vw,3.4rem)]">{title}</h1>
        <p className="mt-5 text-[17px] leading-relaxed text-muted">{intro}</p>
        <p className="mt-6 font-mono text-[11px] text-muted">Zadnja izmjena: {updated}</p>

        <div
          className={[
            'mt-14 text-[15.5px] leading-[1.75] text-ink/85',
            '[&_h2]:display [&_h2]:mt-12 [&_h2]:text-[22px] [&_h2]:text-ink',
            '[&_h3]:display [&_h3]:mt-8 [&_h3]:text-[17px] [&_h3]:text-ink',
            '[&_p]:mt-4',
            '[&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5',
            '[&_li]:list-disc [&_li]:marker:text-line-strong',
            '[&_a]:text-pitch [&_a]:underline [&_a]:underline-offset-4',
            '[&_strong]:font-semibold [&_strong]:text-ink',
            '[&_table]:mt-6 [&_table]:w-full [&_table]:text-left [&_table]:text-[14px]',
            '[&_th]:border-b [&_th]:border-line [&_th]:pb-2 [&_th]:font-medium [&_th]:text-muted',
            '[&_td]:border-b [&_td]:border-line [&_td]:py-3 [&_td]:align-top',
          ].join(' ')}
        >
          {children}
        </div>
      </div>
    </article>
  )
}
