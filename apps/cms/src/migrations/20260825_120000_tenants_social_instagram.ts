import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Dodaje `tenants.social_instagram` — polje je ušlo u config bez migracije, pa
 * je produkcijska baza ostala bez kolone.
 *
 * Posljedica je bila šira nego što se čini: SELECT nad `tenants` puca, pa
 * svaki upit koji populira `tenant` relaciju (depth >= 1) vraća 500. Fetcheri
 * na frontendu su otporni (vrate null), zbog čega je detalj vijesti završavao
 * na `notFound()` — "Vijest nije pronađena" — iako zapis postoji.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tenants" ADD COLUMN IF NOT EXISTS "social_instagram" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tenants" DROP COLUMN IF EXISTS "social_instagram";
  `)
}
