import type { Payload } from 'payload'
import type { Page } from '../payload-types'

import {
  cloneDeep,
  convertSlateToLexical,
  defaultSlateConverters,
} from '@payloadcms/richtext-lexical'

export async function convertAll(payload: Payload, collectionName: string, fieldName: string) {
  const docs: Page[] = await payload.db.collections[collectionName].find({}).exec() // Use MongoDB models directly to query all documents at once
  console.log(`Found ${docs.length} ${collectionName} docs`)

  const converters = cloneDeep([...defaultSlateConverters])

  // Split docs into batches of 20.
  const batchSize = 20
  const batches = []
  for (let i = 0; i < docs.length; i += batchSize) {
    batches.push(docs.slice(i, i + batchSize))
  }

  let processed = 0 // Number of processed docs

  for (const batch of batches) {
    // Process each batch asynchronously
    const promises = batch.map(async (doc: Page) => {
      const richText = doc[fieldName]

      if (richText && Array.isArray(richText) && !('root' in richText)) { // It's Slate data - skip already-converted data
        const converted = convertSlateToLexical({
          converters: converters,
          slateData: richText,
        })

        await payload.update({
          id: doc.id,
          collection: collectionName as any,
          data: {
            [fieldName]: converted,
          },
          overwriteExistingFiles: true
        })
      }
    })

    // Wait for all promises in the batch to complete. Resolving batches of 20 asynchronously is faster than waiting for each doc to update individually
    await Promise.all(promises)

    // Update the count of processed docs
    processed += batch.length
    console.log(`Converted ${processed} of ${docs.length}`)
  }
}