import { readMigrationFiles } from 'drizzle-orm/migrator';
import { join } from 'node:path';

const dbBase = join(__dirname, '../../src/database');
const migrationsFolder = join(dbBase, './server/migrations');

const migrations = readMigrationFiles({ migrationsFolder: migrationsFolder });

await Bun.write(join(dbBase, './client/migrations.json'), JSON.stringify(migrations));

console.log('🏁Migrations compiled!');
