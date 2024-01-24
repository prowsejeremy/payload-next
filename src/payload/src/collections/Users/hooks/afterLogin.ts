import { CollectionAfterLoginHook } from 'payload/types';

export const afterLoginHook: CollectionAfterLoginHook = async ({
  req,
  user,
  token,
}) => {

  try {
    await fetch(`${process.env.PAYLOAD_PUBLIC_NEXT_INTERNAL_URL}/api/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cache: 'no-store',
        Authorization: `JWT ${token}`
      }
    })
  } catch (error) {
    console.log('FETCH error', error)
  }

  return user
}