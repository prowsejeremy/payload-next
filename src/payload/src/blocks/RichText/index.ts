import { Block } from 'payload/types'

// Fields
import BasicRichText from '../../fields/BasicRichText'

const RichText: Block = {
  slug: 'RichText',
  // imageURL: '',
  imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: 'RichTextBlock',
  fields: [
    BasicRichText({
      fieldName: 'content'
    }),
  ],
}

export default RichText