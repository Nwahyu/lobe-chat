import { PgliteDatabase } from 'drizzle-orm/pglite';

import * as schema from '../server/schemas/lobechat';

export type LobeChatDatabaseSchema = typeof schema;

export type LobeChatDatabase = PgliteDatabase<LobeChatDatabaseSchema>;
