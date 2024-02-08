import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { payloadToken } from '../../_api/token'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  req: Request
  // & {
  //   cookies: {
  //     get: (name: string) => {
  //       value: string
  //     }
  //   }
  // },
): Promise<Response> {

  // const token = req.cookies.get(payloadToken)?.value
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  const token = searchParams.get('token')
  // const savedToken = cookies().get('payload-token')

  // console.log('savedToken', savedToken)
  // console.log('cookies().getAll()', cookies().getAll())

  if (!url) {
    return new Response('No URL provided', { status: 404 })
  }

  // if (!token && !savedToken) {
  //   new Response('You are not allowed to preview this page', { status: 403 })
  // }

  // // validate the Payload token
  // const userReq = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_INTERNAL_URL}/api/users/me`, {
  //   headers: {
  //     Authorization: `JWT ${token}`,
  //   }
  // })

  // const userRes = await userReq.json()

  // if (!userReq.ok || !userRes?.user) {
  //   draftMode().disable()
  //   return new Response('You are not allowed to preview this page', { status: 403 })
  // }

  const decrypted_token = atob(token)
  const draft_secret = decrypted_token.replace(process.env.PREVIEW_SALT, '')

  if (draft_secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  draftMode().enable()

  redirect(url)
}