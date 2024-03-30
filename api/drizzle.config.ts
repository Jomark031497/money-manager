import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/domains/**/*.schema.ts',
  out: './drizzle',
  driver: 'pg',
  verbose: true,
  strict: true,
  dbCredentials: {
    connectionString: <string>process.env.DATABASE_URL,
  },
});
