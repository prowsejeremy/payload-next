import React from 'react'
import { notFound } from 'next/navigation'

import {PageType} from './types'

import { fetchDoc } from './_api/fetchDoc'
import PageTemplate from './_templates/page'

export const dynamic = 'force-dynamic'
export const revalidate = 300;

export default async function Page() {

  let page: PageType | null = null

  const slug = 'home'

  try {
    page = await fetchDoc<PageType>({
      collection: 'pages',
      slug
    })
  } catch (error) {
    console.log('FETCH error', error)
  }

  if (!page && slug === 'home') {
    page = {title: "Create your first page in the CMS", slug: 'home'}
  }

  if (!page) {
    return notFound()
  }

  return <PageTemplate page={page} />

}