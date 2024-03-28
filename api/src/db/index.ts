import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const sql = postgres(<string>process.env.DATABASE_URL);

export const db = drizzle(sql);
