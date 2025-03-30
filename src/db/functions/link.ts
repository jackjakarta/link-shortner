import { and, desc, eq, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

import { db } from '..';
import {
  shortLinkClickTable,
  shortLinkTable,
  type ShortLinkClickInsertRow,
  type ShortLinkClickRow,
  type ShortLinkInsertRow,
  type ShortLinkRow,
} from '../schema';

export async function dbGetLinkById({
  linkId,
  userId,
}: {
  linkId: string;
  userId: string;
}): Promise<ShortLinkRow | undefined> {
  const link = (
    await db
      .select()
      .from(shortLinkTable)
      .where(and(eq(shortLinkTable.id, linkId), eq(shortLinkTable.userId, userId)))
  )[0];

  return link;
}

export async function dbGetLinksByUserId({ userId }: { userId: string }): Promise<ShortLinkRow[]> {
  const links = await db
    .select()
    .from(shortLinkTable)
    .where(eq(shortLinkTable.userId, userId))
    .orderBy(desc(shortLinkTable.createdAt));

  return links;
}

export async function dbGetLinkByShortPath({
  shortPath,
}: {
  shortPath: string;
}): Promise<ShortLinkRow | undefined> {
  const link = (
    await db.select().from(shortLinkTable).where(eq(shortLinkTable.shortPath, shortPath))
  )[0];

  return link;
}

export async function dbCreateLink({ userId, shortPath, longUrl }: ShortLinkInsertRow) {
  const shortenedLink = (
    await db
      .insert(shortLinkTable)
      .values({
        userId,
        shortPath,
        longUrl,
      })
      .onConflictDoUpdate({
        target: shortLinkTable.shortPath,
        set: {
          userId,
          shortPath: nanoid(4),
          longUrl,
        },
      })
      .returning()
  )[0];

  return shortenedLink;
}

export async function dbUpdateLinkClickStats({ linkId }: { linkId: string }) {
  const link = (await db.select().from(shortLinkTable).where(eq(shortLinkTable.id, linkId)))[0];

  if (link === undefined) {
    throw Error(`No link with id ${linkId} found`);
  }

  const updatedLinkCount = link.clickCount + 1;

  await db
    .update(shortLinkTable)
    .set({
      clickCount: updatedLinkCount,
      lastClickedAt: new Date(),
    })
    .where(eq(shortLinkTable.id, linkId));
}

export type ClicksPerDay = {
  date: string;
  totalClicks: number;
};

export async function dbGetTotalClicksPerDay({
  userId,
}: {
  userId: string;
}): Promise<ClicksPerDay[]> {
  const result = await db
    .select({
      date: sql<string>`DATE(${shortLinkTable.lastClickedAt})`,
      totalClicks: sql<number>`SUM(${shortLinkTable.clickCount})`,
    })
    .from(shortLinkTable)
    .where(eq(shortLinkTable.userId, userId))
    .groupBy(sql`DATE(${shortLinkTable.lastClickedAt})`)
    .orderBy(sql`DATE(${shortLinkTable.lastClickedAt})`);

  return result;
}

export async function dbGetTotalClickCount({ userId }: { userId: string }): Promise<number> {
  const result = await db
    .select({
      totalClickCount: sql<number>`SUM(${shortLinkTable.clickCount})`,
    })
    .from(shortLinkTable)
    .where(eq(shortLinkTable.userId, userId));

  return result[0]?.totalClickCount ?? 0;
}

export async function dbUpdateLinkQrCodeS3Key({
  linkId,
  qrCodeS3Key,
}: {
  linkId: string;
  qrCodeS3Key: string;
}) {
  const shortLink = (
    await db
      .update(shortLinkTable)
      .set({
        qrCodeS3Key,
      })
      .where(eq(shortLinkTable.id, linkId))
      .returning()
  )[0];

  return shortLink;
}

export async function dbDeleteLink({ linkId, userId }: { linkId: string; userId: string }) {
  await db
    .delete(shortLinkTable)
    .where(and(eq(shortLinkTable.id, linkId), eq(shortLinkTable.userId, userId)));
}

export async function dbCreateLinkClick(data: ShortLinkClickInsertRow) {
  const click = (await db.insert(shortLinkClickTable).values(data).returning())[0];

  return click;
}
