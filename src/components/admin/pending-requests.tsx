'use client'

import { useEffect, useState } from 'react'

import { GoldenBookEntry } from '@/database'
import { GoldenBookEntryCard } from '../golden-book'

const INITIAL_ACTION_LOADING_STATE = {
  entryId: null as number | null,
  type: null as 'approve' | 'reject' | null,
}

export default function PendingRequests() {
  const [entries, setEntries] = useState<GoldenBookEntry[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [actionLoadings, setActionLoadings] = useState<Record<
    string,
    typeof INITIAL_ACTION_LOADING_STATE
  > | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/golden-book?approved=false')
      const json = await res.json()
      const data: GoldenBookEntry[] = Array.isArray(json?.data.data) ? json.data.data : []
      setEntries(data)
    } catch (err) {
      console.error(err)
      setError('Falha ao carregar solicitações')
      setEntries([])
    } finally {
      setLoading(false)
    }
  }

  async function approve(id: number) {
    setActionLoadings(prevValue => ({ ...prevValue, [id]: { entryId: id, type: 'approve' } }))
    setError(null)
    try {
      const res = await fetch(`/api/golden-book/${id}`, { method: 'PATCH' })
      if (!res.ok) throw new Error('Falha ao aprovar')
      setEntries(prev => (prev ? prev.filter(e => e.id !== id) : prev))
    } catch (err: any) {
      console.error(err)
      setError(err?.message ?? 'Erro')
    } finally {
      setActionLoadings(prevValue => ({ ...prevValue, [id]: INITIAL_ACTION_LOADING_STATE }))
    }
  }

  async function rejectEntry(id: number) {
    setActionLoadings(prevValue => ({ ...prevValue, [id]: { entryId: id, type: 'reject' } }))
    setError(null)
    try {
      const res = await fetch(`/api/golden-book/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Falha ao rejeitar')
      setEntries(prev => (prev ? prev.filter(e => e.id !== id) : prev))
    } catch (err: any) {
      console.error(err)
      setError(err?.message ?? 'Erro')
    } finally {
      setActionLoadings(prevValue => ({ ...prevValue, [id]: INITIAL_ACTION_LOADING_STATE }))
    }
  }

  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-3xl my-4">Solicitações pendentes</h1>

      {loading && <div>Carregando...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {!loading && entries && entries.length === 0 && (
        <div className="bg-white p-2 rounded-md text-black mx-auto">
          Não há solicitações pendentes.
        </div>
      )}

      <ul className="flex flex-col gap-4">
        {entries?.map(entry => {
          const actionLoading = actionLoadings?.[entry.id]

          return (
            <li key={entry.id}>
              <GoldenBookEntryCard
                action={
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-2 rounded bg-green-600 text-white cursor-pointer"
                      onDoubleClick={() => approve(entry.id)}
                      disabled={actionLoading && actionLoading.entryId !== null}
                    >
                      {actionLoading?.entryId === entry.id && actionLoading?.type === 'approve'
                        ? 'Aprovando...'
                        : 'Aprovar'}
                    </button>

                    <button
                      className="px-3 py-2 rounded bg-red-600 text-white cursor-pointer"
                      onDoubleClick={() => rejectEntry(entry.id)}
                      disabled={actionLoading && actionLoading.entryId !== null}
                    >
                      {actionLoading?.entryId === entry.id && actionLoading?.type === 'reject'
                        ? 'Rejeitando...'
                        : 'Rejeitar'}
                    </button>
                  </div>
                }
                entry={entry}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
