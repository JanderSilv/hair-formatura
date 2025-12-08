import { NextResponse } from 'next/server'

import { goldenBookUseCases } from '@/lib/use-cases'

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    await goldenBookUseCases.approveEntry(Number(id))

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    await goldenBookUseCases.deleteEntry(Number(id))

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 })
  }
}
