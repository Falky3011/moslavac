import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Automatski izvještaji s utakmica: `tenants.hns_match_reports` uključuje
 * rubriku klubu, `news.source_match_id` sprječava da cron istu utakmicu
 * objavi dvaput.
 *
 * `IF NOT EXISTS` jer je baza dijelom nastala dev pushem, pa kolona može već
 * postojati — isti razlog kao u 20260825_120000_tenants_social_instagram.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tenants" ADD COLUMN IF NOT EXISTS "hns_match_reports" boolean DEFAULT false;
    ALTER TABLE "news" ADD COLUMN IF NOT EXISTS "source_match_id" numeric;
    CREATE INDEX IF NOT EXISTS "news_source_match_id_idx" ON "news" USING btree ("source_match_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "news_source_match_id_idx";
    ALTER TABLE "tenants" DROP COLUMN IF EXISTS "hns_match_reports";
    ALTER TABLE "news" DROP COLUMN IF EXISTS "source_match_id";
  `)
}
