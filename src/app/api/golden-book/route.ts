import { NextResponse } from 'next/server'
import { z } from 'zod'

import { goldenBookUseCases } from '@/lib/use-cases'

const bodySchema = z.object({
  name: z.string().min(1),
  message: z.string().min(1),
  email: z.email().optional(),
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = bodySchema.parse(json)

    const id = await goldenBookUseCases.createEntry({
      name: body.name,
      message: body.message,
      email: body.email ?? null,
    })

    return NextResponse.json({ success: true, id }, { status: 201 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 400 })
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url)

  const params = { approved: url.searchParams.get('approved') }

  const { approved } = { approved: params.approved === null ? null : params.approved === 'true' }

  try {
    const results = await goldenBookUseCases.listEntries({ approved })

    return NextResponse.json({ data: results })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 })
  }
}
