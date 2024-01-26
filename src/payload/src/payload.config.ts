import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'

// Collections
import Users from './collections/Users'
import Pages from './collections/Pages'

// Globals
import Nav from './globals/Nav'

export default buildConfig({
  globals: [Nav],
  collections: [Users, Pages],
  
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    // webpack: (config) => ({
    //   ...config,
    //   resolve: {
    //     ...config.resolve,
    //     alias: {
    //       ...config.resolve.alias,
    //       "@": path.resolve(__dirname)
    //     }
    //   }
    // }),
  },
  editor: lexicalEditor({}),
  serverURL: process.env.PAYLOAD_PUBLIC_PAYLOAD_URL,
  
  cors: [
    process.env.PAYLOAD_PUBLIC_PAYLOAD_URL || '',
    process.env.PAYLOAD_PUBLIC_NEXT_URL || ''
  ].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_PAYLOAD_URL || '',
    process.env.PAYLOAD_PUBLIC_NEXT_URL || ''
  ].filter(Boolean),
  
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
