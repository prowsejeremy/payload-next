import { admins } from '../../access/admins'
import { CollectionConfig } from 'payload/types'

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    // update: admins,
    // create: admins,
    // delete: admins,
  },
  upload: {
    staticURL: process.env.PAYLOAD_PUBLIC_S3_MEDIA_URL,
    // staticURL: '/media',
    // staticDir: 'media',
    disableLocalStorage: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    // adminThumbnail: 'thumbnail',
    adminThumbnail: ({ doc }) => {
      console.log(process.env.PAYLOAD_PUBLIC_S3_MEDIA_URL);
      return `${process.env.PAYLOAD_PUBLIC_S3_MEDIA_URL}/${doc.filename}`
    },
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}

export default Media
