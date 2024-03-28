import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  schema: './src/**/*.schema{.ts,.js}',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: <string>process.env.DATABASE_URL,
  },
});
