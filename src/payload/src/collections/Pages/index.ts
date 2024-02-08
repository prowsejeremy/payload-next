import { CollectionConfig } from 'payload/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Components
import { slugField } from '../../fields/slug'

// Auth
import { admins } from '../../access/admins'
import { hasSecretOrPublished } from '../../access/hasSecretOrPublished'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    preview: (doc) => {

      const token = btoa(`${process.env.PAYLOAD_PUBLIC_PREVIEW_SECRET}${process.env.PAYLOAD_PUBLIC_PREVIEW_SALT}`);

      return `${process.env.PAYLOAD_PUBLIC_NEXT_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_NEXT_URL}/${doc.slug}`,
      )}&token=${token}`
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: hasSecretOrPublished,
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
      editor: lexicalEditor({})
    },
    slugField()
  ]
}

export default Pages
