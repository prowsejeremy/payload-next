export const PAGES = `
  query Pages {
    Pages(limit: 300)  {
      docs {
        slug
      }
    }
  }
`

export const PAGE = `
  query Page($slug: String) {
    Pages(where: { slug: { equals: $slug }}, limit: 1) {
      docs {
        slug
        title
        content
      }
    }
  }
`
