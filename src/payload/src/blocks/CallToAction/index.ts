import { Block } from 'payload/types'

// Fields
import link from '../../fields/Link'
import BasicRichText from '../../fields/BasicRichText'

const CallToAction: Block = {
  slug: 'CallToAction',
  // imageURL: '',
  imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: 'CallToActionBlock',
  fields: [
    BasicRichText({
      fieldName: 'content'
    }),
    link({
      appearances: false
    }),
  ],
}

export default CallToAction