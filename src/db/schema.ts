import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  passwordSalt: text('password_salt').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type UserRow = typeof userTable.$inferSelect;

export const shortLinkTable = pgTable('short_link', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => userTable.id)
    .notNull(),
  shortPath: text('short_path').notNull(),
  longUrl: text('long_url').notNull(),
  clickCount: integer('click_count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type ShortLinkRow = typeof shortLinkTable.$inferSelect;
export type ShortLinkInsertRow = typeof shortLinkTable.$inferInsert;
