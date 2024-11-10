import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  dialect: 'mysql',
  out: './drizzle',
  schema: './src/db/schema',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
