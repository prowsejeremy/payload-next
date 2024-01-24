import { GlobalConfig } from 'payload/types'

import link from '../fields/link'

const Nav: GlobalConfig = {
  slug: 'nav',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
}

export default Nav