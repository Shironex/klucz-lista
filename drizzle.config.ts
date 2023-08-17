import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema/*",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    connectionString: "mysql://klucz:klucz@localhost:6033/klucz-lista",
  }
} satisfies Config;