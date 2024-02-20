import React from 'react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import {Page as PageType} from '../../payload-types'

import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import PageTemplate from '../../_templates/page'

const slugBlacklist = [
  '/_next/webpack-hmr',
  '/favicon.ico'
]

export const revalidate = 300;

export async function generateMetadata(
  { params }: { params: { slug: string[] } }
): Promise<Metadata> {

  let pageData: PageType | null = null
  const slug = params && params?.slug ? `/${params.slug.join('/')}` : `/home`

  if (slugBlacklist.includes(slug)) return

  // fetch data
  try {
    pageData = await fetchDoc<PageType>({
      collection: 'pages',
      slug,
      draft: false
    })
  } catch (error) {
    console.log('FETCH error', error)
  }

  if (!pageData?.meta) return

  const { meta } = pageData
  const image = typeof meta?.image == 'object' ? meta?.image?.url : meta?.image
  return {
    title: meta?.title,
    description: meta?.description,
    openGraph: {
      images: [image],
    },
  }
}

export default async function Page({ params }: { params: { slug: string[] } }) {

  let pageData: PageType | null = null
  const slug = params && params?.slug ? `/${params.slug.join('/')}` : `/home`

  if (slugBlacklist.includes(slug)) return

  console.log('slug', slug)

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
    return pages?.map(({ uri }) => uri)
  } catch (error) {
    return []
  }
}
