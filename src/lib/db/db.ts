import { drizzle } from "drizzle-orm/mysql2";
import { Logger } from "drizzle-orm";
import chalk from "chalk";
import { env } from "@/env.mjs";
import { createConnection } from "mysql2";

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.log(chalk.yellow("Drizzle Query: ") + chalk.green(query));
    console.log(
      chalk.yellow("Drizzle Query Params: ") +
        chalk.green(JSON.stringify(params))
    );
  }
}
const url = new URL(env.DATABASE_URL);

const connection = createConnection({
  host: url.hostname,
  user: url.username,
  port: Number(url.port),
  password: url.password,
  database: url.pathname.substr(1),
});

const db = drizzle(connection, {
  logger: new MyLogger(),
});

export default db;
export type DBClient = typeof db;
