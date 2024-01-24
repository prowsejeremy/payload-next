// import { redirect } from 'next/navigation'
// import { cookies } from 'next/headers'
// import type { NextRequest } from 'next/server'
// import { NextResponse } from 'next/server'

// export async function GET(request: NextRequest): Promise<Response> {

//   console.log('headers', request.headers)
//   const authHeader = request.headers.get('authorization')
//   const token = authHeader?.replace('JWT ', '')

//   console.log('token', token)

//   if (token) {
//     cookies().set('payload-token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 60 * 60 * 24 * 7, // One week
//       path: '/',
//     })
//   }

//   return NextResponse.json({ msg: 'Token received.' }, { status: 200 })
// }