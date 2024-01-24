import { LINK_FIELDS } from './link'

export const NAV_QUERY = `
  query Nav {
    Nav {
      items {
        link {
          ${LINK_FIELDS}
        }
      }
    }
  }
`