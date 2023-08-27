import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }

  const url = new URL(process.env.DATABASE_URL);

  const connection = createConnection({
    host: url.hostname,
    user: url.username,
    port: url.port ? parseInt(url.port) : 3306,
    password: url.password,
    database: url.pathname.substr(1),
  });

  const db = drizzle(connection)

  console.log('⏳ Running migrations...')

  const start = Date.now()

  await migrate(db, { migrationsFolder: 'drizzle' })

  const end = Date.now()

  console.log(`✅ Migrations completed in ${end - start}ms`)

  process.exit(0)
}

runMigrate().catch((err) => {
  console.error('❌ Migration failed')
  console.error(err)
  process.exit(1)
})