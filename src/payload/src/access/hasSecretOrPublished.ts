import type { Access } from 'payload/config'
import { checkRole } from '../collections/Users/checkRole'

export const hasSecretOrPublished: Access = ({ req }) => {

  // If secret provided
  const secret = req?.body?.secret
  if (secret == process.env.PAYLOAD_PUBLIC_DRAFT_SECRET) {
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
