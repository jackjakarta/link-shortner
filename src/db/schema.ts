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

export const authProviderSchema = z.enum(['email', 'discord', 'github']);
export const authProviderPgEnum = pgEnum('auth_provider', authProviderSchema.options);
export type AuthProvider = z.infer<typeof authProviderSchema>;

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  passwordSalt: text('password_salt').notNull(),
  emailVerified: boolean('email_verified').notNull().default(false),
  authProvider: authProviderPgEnum('provider').notNull().default('email'),
  isSuperAdmin: boolean('is_super_admin').notNull().default(false),
  isNewsletterSub: boolean('is_newsletter_sub').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const userProfileTable = pgTable('user_profile', {
  userId: text('user_id')
    .primaryKey()
    .references(() => userTable.id),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  location: text('location'),
  website: text('website'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type UserProfileRow = typeof userProfileTable.$inferSelect;
export type UserProfileInsertRow = typeof userProfileTable.$inferInsert;

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
  qrCodeS3Key: text('qr_code_s3_key'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type ShortLinkRow = typeof shortLinkTable.$inferSelect;
export type ShortLinkInsertRow = typeof shortLinkTable.$inferInsert;

export const tokenActionSchema = z.enum(['verify-email', 'reset-password']);
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

export const apiKeyStatusSchema = z.enum(['active', 'inactive', 'revoked']);
export const apiKeyStatusPgEnum = pgEnum('api_key_status', apiKeyStatusSchema.options);
export type ApiKeyStatus = z.infer<typeof apiKeyStatusSchema>;

export const apiKeyTable = pgTable('api_key', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  apiKey: text('hashed_api_key').notNull(),
  obscuredApiKey: text('obscured_api_key').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  status: apiKeyStatusPgEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export type ApiKeyRow = typeof apiKeyTable.$inferSelect;
export type InsertApiKeyRow = typeof apiKeyTable.$inferInsert;

export const apiKeyUsageTable = pgTable('api_key_usage', {
  apiKeyId: uuid('api_key_id')
    .references(() => apiKeyTable.id)
    .primaryKey(),
  requestsCount: integer('requests_count').notNull().default(0),
  lastUsedAt: timestamp('last_used_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type ApiKeyUsageRow = typeof apiKeyUsageTable.$inferSelect;
export type InsertApiKeyUsageRow = typeof apiKeyUsageTable.$inferInsert;
