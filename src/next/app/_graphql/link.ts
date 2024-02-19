export const LINK_FIELDS = `
  type
  newTab
  label
  url
  reference {
    relationTo
    value {
      ...on Page {
        slug
        uri
      }
    }
  }
`
