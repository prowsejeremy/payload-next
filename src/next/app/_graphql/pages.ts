import { IMAGE_FIELDS } from './image'
import { LINK_FIELDS } from './link'

export const PAGES = `
  query Page($draft: Boolean) {
    Pages(limit: 300, draft: $draft)  {
      docs {
        slug
      }
    }
  }
`

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { uri: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        slug
        title
        layout {

          ...on RichTextBlock {
            blockType
            blockName
            content
          }

          ...on ImageBlock {
            blockType
            blockName
            image {
              ${IMAGE_FIELDS}
            }
          }

          ...on CallToActionBlock {
            blockType
            blockName
            content
            link {
              ${LINK_FIELDS}
            }
          }

        }
      }
    }
  }
`
