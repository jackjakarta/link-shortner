'use server';

import { desc, eq } from 'drizzle-orm';

import { db } from '..';
import { shortLinkTable, type ShortLinkInsertRow, type ShortLinkRow } from '../schema';

export async function dbGetLinksByUserId(userId: string): Promise<ShortLinkRow[]> {
  const links = await db
    .select()
    .from(shortLinkTable)
    .where(eq(shortLinkTable.userId, userId))
    .orderBy(desc(shortLinkTable.createdAt));

  return links;
}

export async function dbGetLinkByShortPath(shortPath: string): Promise<ShortLinkRow> {
  const link = (
    await db.select().from(shortLinkTable).where(eq(shortLinkTable.shortPath, shortPath))
  )[0];

  if (link === undefined) {
    throw Error(`No link with short path ${shortPath} found`);
  }

  return link;
}

export async function dbCreateLink({ userId, shortPath, longUrl }: ShortLinkInsertRow) {
  const shortenedLink = await db
    .insert(shortLinkTable)
    .values({
      userId,
      shortPath,
      longUrl,
    })
    .returning();

  return shortenedLink;
}

export async function dbUpdateLinkClickStats(linkId: string) {
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
