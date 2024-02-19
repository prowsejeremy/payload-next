import { Block } from 'payload/types'

const ImageBlock: Block = {
  slug: 'ImageBlock',
  // imageURL: '',
  imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: 'ImageBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      access: {
        read: () => true
      }
    },
  ],
}

export default ImageBlock
