import { LINK_FIELDS } from './fields'

export const NAV_QUERY = `
  query Nav {
    Nav {
      items {
        link {
          ${LINK_FIELDS}
        }
        items {
          link {
            ${LINK_FIELDS}
          }
        }
      }
    }
  }
`
