import type { Access } from 'payload/config'
import { checkRole } from '../collections/Users/checkRole'

export const hasSecretOrPublished: Access = ({ req }) => {

  // If secret provided
  const token = req?.body?.token
  if (token == process.env.PREVIEW_SECRET) {
    return true
  }

  // If admin, allow in
  const {user} = req
  if (user && checkRole(['admin'], user)) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
