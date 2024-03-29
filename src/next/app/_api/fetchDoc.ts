import { PAGE } from '../_graphql/pages'
import { GRAPHQL_API_URL } from './shared'

const queryMap = {
  pages: {
    query: PAGE,
    key: 'Pages',
  }
}

export const fetchDoc = async <T>(args: {
  collection: 'pages'
  slug?: string
  id?: string,
  draft?: boolean
}): Promise<T> => {
  const { collection, slug, draft } = args || {}

  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`)

  const doc: T = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.PREVIEW_SECRET && draft ? { Authorization: process.env.PREVIEW_SECRET } : {}),
    },
    cache: 'no-store',
    next: { tags: [`${collection}_${slug}`] },
    body: JSON.stringify({
      // ...( draft ? {token: process.env.PREVIEW_SECRET} : {}),
      query: queryMap[collection].query,
      variables: {
        slug,
        draft
      },
    }),
  })
    ?.then(res => res.json())
    ?.then(res => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching doc')
      return res?.data?.[queryMap[collection].key]?.docs?.[0]
    })

  return doc
}
