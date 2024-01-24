import type { Nav as NavType } from '../payload-types'
import { NAV_QUERY } from '../_graphql/globals'
import { GRAPHQL_API_URL } from './shared'

export async function fetchNav(): Promise<NavType> {
  if (!GRAPHQL_API_URL) throw new Error('GRAPHQL_API_URL not found')

  const nav = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: NAV_QUERY,
    }),
  })
    ?.then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching nav')
      return res.data?.Nav
    })

  return nav
}

export const fetchGlobals = async (): Promise<{
  nav: NavType
}> => {
  // initiate requests in parallel, then wait for them to resolve
  // this will eagerly start to the fetch requests at the same time
  // see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
  const navData = fetchNav()

  const [nav]: [NavType] = await Promise.all([
    await navData
  ])

  return {
    nav
  }
}
