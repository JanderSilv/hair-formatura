'use client'

import Image from 'next/image'

import { images } from '@/assets/images'

export const QRCode = () => (
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
      <Image src={images.qrCode} width="267" height="269" alt="QRCode" />
    </button>

    <span className="text-2xl">Escaneei ou clique no QRCode para copiar a chave pix</span>
  </div>
)
