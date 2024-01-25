import { CollectionConfig } from 'payload/types'
import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import adminsAndUser from './access/adminsAndUser'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { checkRole } from './checkRole'
// import { afterLoginHook } from './hooks/afterLogin'

console.log('process.env', process.env.NEXT_URL)

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 28800, // 8 hours
    cookies: {
      sameSite: 'none',
      secure: true,
      domain: process.env.NEXT_URL
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  hooks: {
    // afterLogin: [afterLoginHook]
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin]
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
  ],
}

export default Users
