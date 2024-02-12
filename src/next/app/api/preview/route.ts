import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  req: Request
): Promise<Response> {

  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  const token = searchParams.get('token')

  if (!url) {
    return new Response('No URL provided', { status: 404 })
  }

  const decrypted_token = atob(token)
  const draft_secret = decrypted_token.replace(process.env.PREVIEW_SALT, '') // checks if the salt is present
  const timestamp = draft_secret.replace(process.env.PREVIEW_SECRET, '') // checks if the secret is present
  const now = new Date().getTime()
  const threshold = 300000 // 5 minutes

  // If the secret and salt are present then if it has been set,
  // the timestamp should also be present and accurate.
  if (now - parseInt(timestamp) > threshold) {
    return new Response('Invalid token', { status: 401 })
  }

  draftMode().enable()

  redirect(url)
}