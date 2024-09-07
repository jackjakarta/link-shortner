import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  passwordSalt: text('password_salt').notNull(),
  emailVerified: boolean('email_verified').notNull().default(false),
  provider: text('provider'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type UserRow = typeof userTable.$inferSelect;
export type UserInsertRow = typeof userTable.$inferInsert;

export const shortLinkTable = pgTable('short_link', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .references(() => userTable.id)
    .notNull(),
  shortPath: text('short_path').notNull().unique(),
  longUrl: text('long_url').notNull(),
  clickCount: integer('click_count').notNull().default(0),
  lastClickedAt: timestamp('last_clicked_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type ShortLinkRow = typeof shortLinkTable.$inferSelect;
export type ShortLinkInsertRow = typeof shortLinkTable.$inferInsert;

export const tokenActionSchema = z.enum(['verify-email']);
export const tokenActionPgEnum = pgEnum('token_action', tokenActionSchema.options);
export type TokenAction = z.infer<typeof tokenActionSchema>;

export const tokenTable = pgTable(
  'token',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    action: tokenActionPgEnum('action').notNull(),
    token: text('token').notNull(),
    email: text('email'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      uniqueEmailAction: unique().on(table.email, table.action),
    };
  },
);

export type TokenRow = typeof tokenTable.$inferSelect;
export type InsertTokenRow = typeof tokenTable.$inferInsert;
