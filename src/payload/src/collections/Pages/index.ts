import { CollectionConfig } from 'payload/types'
import { slateEditor } from '@payloadcms/richtext-slate'
import { slugField } from '../../fields/slug'
import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${doc.slug !== 'home' ? doc.slug : ''}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'richText',
      name: 'content',
      label: 'Content',
      editor: slateEditor({
        admin: {
          elements: ['h2', 'h3', 'h4', 'h5', 'ul', 'ol', 'link'],
          leaves: ['bold', 'italic', 'underline'],
        },
      }),
    },
    slugField()
  ]
}

export default Pages
