import React from 'react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import {PageType} from '../../types'

import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import PageTemplate from '../../_templates/page'

export const dynamic = 'force-dynamic'
export const revalidate = 300;

export default async function Page({ params }: { params: { slug: string[] } }) {

  let page: PageType | null = null

  const slug = params.slug.join('/')
  const { isEnabled: isDraftMode } = draftMode()
  
  try {
    page = await fetchDoc<PageType>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.log('FETCH error', error)
  }

  if (!page) {
    return notFound()
  }

  return <PageTemplate page={page} />
}

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<PageType>('pages')
    return pages?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}