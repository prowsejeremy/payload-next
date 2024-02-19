import { CollectionConfig } from 'payload/types'
import { createBreadcrumbsField } from "@payloadcms/plugin-nested-docs/dist/fields/breadcrumbs";

// Components
import { slugField } from '../../fields/Slug'
import { uriField } from '../../fields/URI'

// Blocks
import CallToAction from '../../blocks/CallToAction'
import BasicText from '../../blocks/RichText'
import ImageBlock from '../../blocks/ImageBlock'

// Auth
import { admins } from '../../access/admins'
import { hasSecretOrPublished } from '../../access/hasSecretOrPublished'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    preview: (doc) => {

      const timestamp = new Date().getTime()
      const token = btoa(`${timestamp}${process.env.PAYLOAD_PUBLIC_PREVIEW_SECRET}${process.env.PAYLOAD_PUBLIC_PREVIEW_SALT}`);

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
      name: 'layout',
      type: 'blocks',
      minRows: 1,
      blocks: [
        BasicText,
        CallToAction,
        ImageBlock
      ]
    },
    slugField(),
    uriField(),
    createBreadcrumbsField(
      "pages",
      {
        admin: {
          position: "sidebar",
          hidden: true
        },
      }
    )
  ]
}

export default Pages
