import path from 'path'

// Payload imports
import nestedDocs from '@payloadcms/plugin-nested-docs'
import seoPlugin from '@payloadcms/plugin-seo';
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'

// Collections
import Users from './collections/Users'
import Pages from './collections/Pages'
import Media from './collections/Media'

// Globals
import Nav from './globals/Nav'

type DocType = { doc: {title: string}}

export default buildConfig({
  globals: [Nav],
  collections: [Users, Pages, Media],

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
    declare: false
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    nestedDocs({
      collections: ['pages'],
      generateLabel: <DocType>(_, doc) => doc.title,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      generateTitle: <DocType>({ doc }) => `Next/Payload — ${doc.title.value}`
    }),
    cloudStorage({
      collections: {
        // Enable cloud storage for Media collection
        media: {
          // Create the S3 adapter
          adapter: s3Adapter({
            config: {
              endpoint: process.env.S3_ENDPOINT,
              region: process.env.S3_REGION,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
              },
            },
            bucket: process.env.S3_BUCKET,
          }),
        },
      },
    }),
  ],

  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
