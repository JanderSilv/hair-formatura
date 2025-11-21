'use client'

import cn from 'classnames'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { images } from '@/assets/images'
import { GoldenBookEntry } from '@/database'
import { GoldenBookEntryCard } from '../golden-book/golden-book-entry-card'

export const GoldenBook = () => {
  const [entries, setEntries] = useState<GoldenBookEntry[] | null>(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/golden-book?approved=true')
        const json = await res.json()
        setEntries(Array.isArray(json?.data.data) ? json.data.data : [])
      } catch (err) {
        console.error(err)
        setEntries([])
      }
    }

    load()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)

    if (!name.trim()) {
      setStatus('Por favor informe seu nome.')
      return
    }

    if (!message.trim()) {
      setStatus('Por favor informe sua mensagem.')
      return
    }

    if (email && !/\S+@\S+\.\S+/.test(email.trim())) {
      setStatus('Por favor informe um email válido.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/golden-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          email: email.trim() || undefined,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.error || 'Erro ao submeter')
      }

      setStatus('Assinatura enviada com sucesso! Ela aparecerá aqui após aprovação.')
      setName('')
      setMessage('')
      setEmail('')
    } catch (err: any) {
      console.error(err)
      setStatus(err?.message ?? String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        <button
          className="btn-transition cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(
              '00020126580014br.gov.bcb.pix01365cd8bd5d-fcb4-4abd-b8f7-3ca4f2aec6ba5204000053039865802BR5924Ana Beatriz Dos Santos A6009Sao Paulo610901227-20062230519daqr5410406580897376304523E'
            )
            alert('Chave pix copiada!')
          }}
        >
          <Image className="rounded-md" src={images.qrCode} width="230" height="230" alt="QRCode" />
        </button>

        <span className="text-lg lg:text-xl text-center">
          Escaneei ou clique no QRCode para copiar a chave pix
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className={cn(
          'bg-white border groovy-container rounded-md max-w-xl w-full',
          'flex flex-col gap-4 p-8',
          'text-[#b71a57] text-2xl'
        )}
      >
        <h2 className="text-3xl text-center">Assine nosso livro</h2>

        <div className="flex flex-col items-start">
          <label>Seu nome</label>
          <input
            className="groovy-input"
            name="name"
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <span className="text-sm">O mesmo nome do comprovante de pagamento</span>
        </div>

        <div className="flex flex-col items-start">
          <label>
            Seu email <span className="text-sm text-gray-500">(opcional)</span>
          </label>
          <input
            className="groovy-input"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
        </div>

        <div className="flex flex-col items-start">
          <label>Sua mensagem de paz</label>
          <textarea
            className="groovy-input"
            name="message"
            rows={3}
            maxLength={280}
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />

          <div className="flex justify-end text-sm w-full">
            <span className="text-sm">{message.length}/280</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="btn-transition groovy-button py-4 px-8 rounded-full shadow-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Enviando...' : '✨ Assinar com amor ✨'}
          </button>

          {status && <div className="text-sm text-center text-[#4c0035]">{status}</div>}
        </div>
      </form>

      <p>Sua mensagem ecoa conosco no palco, na história e na memória desta turma.</p>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {(entries && entries.length > 0 ? entries : []).map(entry => (
          <li key={entry.id}>
            <GoldenBookEntryCard entry={entry} />
          </li>
        ))}
      </ul>
    </>
  )
}
