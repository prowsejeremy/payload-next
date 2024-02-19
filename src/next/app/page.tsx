import React from 'react'
import { notFound } from 'next/navigation'

import {Page as PageType} from './payload-types'

import { fetchDoc } from './_api/fetchDoc'
import PageTemplate from './_templates/page'

export const dynamic = 'force-dynamic'
export const revalidate = 300;

export default async function Page() {

  let pageData: PageType | null = null

  const slug = '/home'

  try {
    pageData = await fetchDoc<PageType>({
      collection: 'pages',
      slug
    })
  } catch (error) {
    console.log('FETCH error', error)
  }

  if (!pageData && slug === '/home') {
    pageData = {title: 'Create your first page in the CMS', id: '1', slug: '/home', updatedAt: '', createdAt: ''}
  }

  if (!pageData) {
    return notFound()
  }

  return <PageTemplate page={pageData} />

}
