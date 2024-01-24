import { draftMode } from 'next/headers'

export async function GET(req: Request): Promise<Response> {
  draftMode().disable()

  // return new Response('Draft mode is disabled')
  return Response.redirect(new URL('/', process.env.NEXT_PUBLIC_NEXT_URL))
}
