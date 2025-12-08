import cn from 'classnames'
import Image from 'next/image'

import { GoldenBook } from '@/components/home'
import ScrollAnimationsInit from '@/components/ScrollAnimationsInit'

import { images } from '@/assets/images'
import { ENV } from '@/config'

export default async function Home() {
  const entries = await fetchEntries()

  return (
    <main className="min-h-screen overflow-clip">
      <ScrollAnimationsInit />

      <section className="hero-section" data-aos="fade-down">
        <div className="-mt-24" data-aos="zoom-in" data-aos-delay="200">
          <p className="mb-2 ml-6 text-xl text-[#f9f3f8]">
            escola
            <br /> de teatro
            <br /> da UFBA <span className="text-[#f7ebaf]">apresenta:</span>
          </p>

          <Image src={images.hair} width="450" height="127" alt="HAIR" priority />
        </div>
      </section>

      <section className="second-section" data-aos="fade-up">
        <h2 className="font-love-craft italic text-7xl">1968</h2>

        <Image src={images.sun} width="225" height="281" alt="sol" />

        <h2 className="font-love-craft max-w-[710px] text-2xl lg:text-4xl">
          O sol nasceu para iluminar <wbr /> o palco da nossa formatura!
        </h2>

        <p className="mt-30">HAIR</p>

        <p>
          acompanha um grupo de jovens que vive nos anos 60, em meio à contracultura hippie, à moral
          conservadora da sociedade e à violência da indústria da Guerra.
        </p>

        <p className="mt-10">
          é um retrato vibrante de uma juventude que se recusa a aceitar um mundo sem liberdade.
        </p>

        <h2 className="font-bold mt-30 mb-4 text-2xl">Ficha técnica</h2>

        <ul className="flex flex-col list-disc gap-2 text-lg text-left">
          <li>Texto original: Gerome Ragni e James Rado</li>
          <li>Tradução/versão: Clara Novais, Edvard Passos, Alice Ciappa e João Victor Sobral</li>
          <li>Direção: Edvard Passos</li>
          <li>Preparação de elenco: Meran Vargens</li>
          <li>Preparação corporal: Ricardo Fagundes</li>
          <li>Direção Musical: Luciano Salvador Bahia</li>
          <li>Preparação Vocal: Marcelo Jardim</li>
          <li>Coreografia: Marilza Oliveira</li>
          <li>Figurino: Thiago Romero</li>
          <li>Cenário: Sérgio Ekerman</li>
          <li>Iluminação: Otávio Correia</li>
          <li>Produção: Ana Beatriz Araujo</li>
          <li>
            Assistência de direção: Letícia Mascarenhas, Giovanna Lima, Emily Santana e João
            Vinícius
          </li>
          <li>Design gráfico: glo e João Victor Sobral</li>
          <li className="my-3">Elenco:</li>
          <ul className="grid grid-cols-2 md:grid-cols-3 my-3">
            <li>Alice Ciappa</li>
            <li>Ana Beatriz Araujo</li>
            <li>Camila Odô Labá</li>
            <li>Carlos Ferreira Filho</li>
            <li>Cícero Locijá</li>
            <li>Clara Novais</li>
            <li>Gabriela Borges</li>
            <li>João Victor Sobral</li>
            <li>John</li>
            <li>Juliana Sanleão</li>
            <li>Leandro França</li>
            <li>Luana Beatriz</li>
            <li>Maribá Mendins</li>
            <li>Marttins</li>
            <li>Pablo Pereira</li>
            <li>Roama</li>
            <li>Yanca Baroni</li>
          </ul>
          <li>Ator Convidado: Cláudio Cajaíba</li>
        </ul>
      </section>

      <section
        className={cn(
          'bg-[#ec7e1d] min-h-screen py-40 px-4 lg:px-52',
          'flex flex-col items-center gap-8',
          'text-[#4c0035] text-lg lg:text-2xl'
        )}
      >
        <div className="max-w-2xl" data-aos="fade-right">
          <p>este momento marca a nossa formatura na escola de teatro da ufba.</p>

          <p className="my-4">
            ao contribuir e registrar seu nome no nosso livro de ouro, você se torna parte dessa
            travessia, ajudando a sustentar o processo, a cena, os encontros e tudo o que pulsa
            quando o teatro acontece.
          </p>

          <p>contribua com o qrcode abaixo e em seguida registre seu nome e sua mensagem:</p>
        </div>

        <div className="flex flex-col items-center gap-8" data-aos="fade-left" data-aos-delay="120">
          <GoldenBook entries={entries} />
        </div>
      </section>
    </main>
  )
}

async function fetchEntries() {
  try {
    const res = await fetch(
      `${ENV.NEXT_PUBLIC_SITE_URL}/api/golden-book?approved=true&pageSize=500`,
      { next: { revalidate: 60 } }
    )
    const json = await res.json()
    return Array.isArray(json?.data.data) ? json.data.data : []
  } catch (err) {
    console.error(err)
    return []
  }
}
