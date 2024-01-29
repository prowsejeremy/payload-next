import React from 'react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import {Page as PageType} from '../../payload-types'

import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import PageTemplate from '../../_templates/page'

export const dynamic = 'force-dynamic'
export const revalidate = 300;

export default async function Page({ params }: { params: { slug: string[] } }) {

  let pageData: PageType | null = null

  const slug = params.slug.join('/')
  const { isEnabled: isDraftMode } = draftMode()
  
  try {
    pageData = await fetchDoc<PageType>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.log('FETCH error', error)
  }

  if (!pageData) {
    return notFound()
  }

  return <PageTemplate page={pageData} />
}

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<PageType>({
      collection: 'pages',
      draft: false
    })
    return pages?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}