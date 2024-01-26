import { MigrateUpArgs } from '@payloadcms/db-mongodb'
import { convertAll } from '../utilities/convertSlateToLexical'

export async function up ({ payload }: MigrateUpArgs): Promise<void> {
  await convertAll(payload, 'pages', 'content')
};

export async function down ({ payload }: MigrateUpArgs): Promise<void> {
  console.log('down', payload)
};