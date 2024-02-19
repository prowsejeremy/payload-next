import { GlobalConfig } from 'payload/types'

import link from '../fields/Link'

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
        {
          label: 'Sub-nav Items',
          name: 'items',
          type: 'array',
          required: false,
          fields: [
            link({
              appearances: false,
            })
          ]
        }
      ],
    },
  ],
}

export default Nav
