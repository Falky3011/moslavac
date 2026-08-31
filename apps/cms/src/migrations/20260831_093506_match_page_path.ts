import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/** Putanja do rubrike s utakmicama; iz nje se slaže poveznica "Detalji utakmice". */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tenants"
    ADD COLUMN IF NOT EXISTS "hns_match_page_path" varchar DEFAULT '/raspored-i-rezultati';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tenants" DROP COLUMN IF EXISTS "hns_match_page_path";
  `)
}
