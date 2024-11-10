import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
import { InferSelectModel } from 'drizzle-orm';

import { timestamps } from '../helpers/columns.helpers';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const usersTable = mysqlTable('users_table', {
  id: serial().primaryKey(),
  fullname: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  phone_number: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

export const insertUserSchema: z.ZodSchema = createInsertSchema(usersTable);
export const selectUserSchema: z.ZodSchema = createSelectSchema(usersTable);

export type User = InferSelectModel<typeof usersTable>;
// omit id, updatedAt, createdAt
export type InsertUser = Omit<User, 'id' | 'updatedAt' | 'createdAt'>;
