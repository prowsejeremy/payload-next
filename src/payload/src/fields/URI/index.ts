import type { Field, FieldHook } from 'payload/types'

import deepMerge from '../../utilities/deepMerge'

export const generateURI = (breadcrumbs: Array<{ url: string }>): string | undefined => {
  if (Array.isArray(breadcrumbs)) {
    const finalBreadcrumb = breadcrumbs.pop()

    console.log('finalBreadcrumb', finalBreadcrumb)
    return finalBreadcrumb.url
  }

  return undefined
}

const populateURI: FieldHook = async ({ data, originalDoc }) =>
  generateURI(data?.breadcrumbs || originalDoc?.breadcrumbs)


type URI = (overrides?: Partial<Field>) => Field
export const uriField: URI = (overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'uri',
      label: 'URI',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [populateURI],
        afterChange: [populateURI]
      },
    },
    overrides,
  )
