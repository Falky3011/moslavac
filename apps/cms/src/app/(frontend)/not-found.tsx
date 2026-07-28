import { ButtonLink } from '@/marketing/ui/Button'

export default function NotFound() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto flex w-full max-w-[760px] flex-col items-center px-5 py-32 text-center sm:px-8">
        <p className="label text-pitch">Greška 404</p>
        <h1 className="display mt-4 text-[clamp(2.2rem,6vw,3.6rem)]">Ova stranica ne postoji</h1>
        <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted">
          Poveznica je vjerojatno stara ili pogrešno upisana.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Natrag na naslovnicu</ButtonLink>
          <ButtonLink href="/kontakt" variant="secondary">
            Kontakt
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
