import { PAGES } from '../_graphql/pages'
import { GRAPHQL_API_URL } from './shared'

const queryMap = {
  pages: {
    query: PAGES,
    key: 'Pages',
  }
}

export const fetchDocs = async <T>(args: {
  collection: 'pages',
  draft?: boolean,
  variables?: Record<string, unknown>,
}): Promise<T[]> => {
  const { collection, draft, variables } = args || {}
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`)

  const docs: T[] = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.PREVIEW_SECRET && draft ? { Authorization: process.env.PREVIEW_SECRET } : {}),
    },
    cache: 'no-store',
    next: { tags: [collection] },
    body: JSON.stringify({
      // ...( draft ? {token: process.env.PREVIEW_SECRET} : {}),
      query: queryMap[collection].query,
      variables,
    }),
  })
    ?.then(res => res.json())
    ?.then(res => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs')

      return res?.data?.[queryMap[collection].key]?.docs
    })

  return docs
}
