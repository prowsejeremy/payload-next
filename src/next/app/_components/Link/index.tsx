import React from 'react'
import Link from 'next/link'

import { Page as PageType } from '@/payload-types'

type CMSLinkType = {
  type?: 'custom' | 'reference'
  url?: string
  newTab?: boolean
  reference?: {
    value: string | PageType
    relationTo: 'pages'
  }
  label?: string
  children?: React.ReactNode
  className?: string
}

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  url,
  newTab,
  reference,
  label,
  children,
  className
}) => {

  // const href =
  //   type === 'reference' && typeof reference?.value === 'object' && reference.value.uri
  //     ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}${
  //         reference.value.uri
  //       }`
  //     : url

  const href = (type === 'reference' && typeof reference?.value === 'object' && reference.value.uri) ?
    reference.value.uri
  :
    url

  if (!href) return null

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  if (href || url) {
    return (
      <Link {...newTabProps} href={href || url} className={className}>
        {label && label}
        {children && children}
      </Link>
    )
  }
}
