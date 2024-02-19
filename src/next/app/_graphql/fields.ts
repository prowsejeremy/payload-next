export const SEO_FIELDS = `
  meta {
    title
    description
    image {
      url
    }
  }
`

export const IMAGE_FIELDS = `
  url
  filesize
  alt
  sizes {
    card {
      url
      width
      height
    }
    tablet {
      url
      width
      height
    }
    thumbnail {
      url
      width
      height
    }
  }
`

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
