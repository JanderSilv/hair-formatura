import cn from 'classnames'
import Image from 'next/image'

import { QRCode } from '@/components'

import { images } from '@/assets/images'

export default function Home() {
  return (
    <main className="min-h-screen">
      <section
        className={cn(
          'min-h-screen flex flex-col items-center justify-center',
          "bg-[url('/assets/images/background-mobile.webp')] bg-cover bg-position-[50%]",
          "md:bg-[url('/assets/images/background.webp')] bg-scroll"
        )}
      >
        <svg className="block h-[105px] max-w-[700px] w-full" viewBox="0 0 700 105">
          <defs>
            <path id="arcPath" d="M 50 150 A 200 75 0 0 1 650 150" />
          </defs>
          <text
            className={cn('fill-[#d8148c] font-party-vibes stroke-[2.5] stroke-[#2A2A64] text-5xl')}
          >
            <textPath href="#arcPath" startOffset="50%" textAnchor="middle">
              Escola de Teatro da UFBA
            </textPath>
          </text>
        </svg>

        <p
          className={cn(
            'font-party-vibes italic stroke-black -mt-2.5 text-[#fa7805] text-2xl',
            'sm:text-4xl',
            '[-webkit-text-stroke:2px_#2A2A64]'
          )}
        >
          apresenta...
        </p>

        <h1
          className={[
            'animate-slide-hair-image font-party-vibes inline-block leading-none text-transparent relative',
            "bg-[url('/assets/images/hair-title-bg.webp')] bg-clip-text bg-cover bg-repeat-y bg-position-[center_top]",
            'text-[clamp(7rem,35vw,14rem)]',
            '[-webkit-background-clip:text] [-webkit-text-stroke:2.5px_#2A2A64]',
            'md:[-webkit-text-stroke:5px_#2A2A64]',
          ].join(' ')}
        >
          HAIR
        </h1>
      </section>

      <section
        className={cn(
          'bg-[#fb5c02] min-h-screen py-16 px-8',
          'lg:px-52',
          'flex flex-col items-center gap-8',
          'font-chicle text-[#e3e3ef] text-2xl text-center',
          'lg:text-4xl'
        )}
      >
        <Image src={images.loveIsUniversal} width="116" height="484" alt="love is universal" />

        <h2 className="text-4xl lg:text-[4rem]">
          O sol nasceu para iluminar o palco da nossa formatura!
        </h2>

        <div className="flex gap-1 items-center">
          <div className="flex flex-col md:flex-row">
            <span>☀️</span>
            <span>🌻</span>
            <span>🌈</span>
          </div>

          <Image
            className="w-full h-auto max-w-[227px]"
            src={images[1968]}
            width="227"
            height="153"
            alt="1968"
          />

          <div className="flex flex-col md:flex-row">
            <span>🌙</span>
            <span>✨</span>
            <span>☮️</span>
          </div>
        </div>

        <p>
          HAIR acompanha um grupo de jovens que vive em Nova York durante o final dos anos 60, em
          meio à contracultura hippie, a moral conservadora da sociedade e a violência da Guerra do
          Vietnã.
        </p>
        <p>
          É um retrato vibrante de uma juventude que se recusa a aceitar um mundo sem liberdade.
        </p>

        <Image src={images.hair} width="476" height="524" alt="cartaz do filme hair" />

        <p>Este momento marca a nossa formatura na Escola de Teatro da UFBA.</p>
      </section>

      <section
        className={cn(
          'bg-[#b71a57] min-h-screen py-16 px-4',
          'lg:px-52',
          'flex flex-col items-center gap-8',
          'font-chicle text-2xl text-center text-[#e3e3ef]',
          'lg:text-4xl'
        )}
      >
        <p>
          Ao contribuir e registrar seu nome no nosso Livro de Ouro, você se torna parte dessa
          travessia, ajudando a sustentar o processo, a cena, os encontros e tudo o que pulsa quando
          o teatro acontece.
        </p>

        <p>Contribua com o QRCode abaixo e em seguida registre seu nome e sua mensagem:</p>

        <QRCode />

        <form
          className={cn(
            'bg-white border groovy-container rounded-md max-w-xl w-full',
            'flex flex-col gap-4 p-8',
            'font-chicle text-[#b71a57] text-2xl'
          )}
        >
          <h2 className="text-3xl">Assine nosso livro</h2>

          <div className="flex flex-col items-start">
            <label>Seu nome</label>
            <input className="groovy-input" name="name" type="text" required />
            <span className="text-lg">O mesmo nome do comprovante de pagamento</span>
          </div>

          <div className="flex flex-col items-start">
            <label>
              Sua mensagem de paz <span className="text-xl">(opcional)</span>
            </label>
            <textarea className="groovy-input" name="message" rows={3} maxLength={280} />
            <div className="flex justify-end text-lg">
              <span>Máximo 280 caracteres</span>
            </div>
          </div>

          <button className="btn-transition groovy-button py-4 px-8 rounded-full shadow-lg">
            ✨ Assinar com amor ✨
          </button>
        </form>

        <p>Sua mensagem ecoa conosco no palco, na história e na memória desta turma.</p>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {[
            {
              name: 'João Silva',
              message:
                'Hair foi uma experiência transformadora! A energia do grupo e a mensagem de amor e paz ressoam profundamente em mim. Grato por fazer parte dessa jornada incrível!',
            },
            {
              name: 'Maria Oliveira',
              message:
                'Participar de Hair foi como encontrar uma família. Cada ensaio, cada apresentação, foi um passo na construção de algo maior que nós mesmos. Levo comigo lições de vida e amizades eternas.',
            },
            {
              name: 'Carlos Pereira',
              message:
                'Hair me ensinou o verdadeiro significado de liberdade e expressão. Através da arte, encontrei minha voz e meu lugar no mundo. Obrigado a todos que fizeram parte dessa aventura inesquecível!',
            },
          ].map(({ name, message }) => (
            <li key={name}>
              <div
                className={cn(
                  'bg-white groovy-container h-full p-4 rounded-md',
                  'flex flex-col gap-2',
                  'font-[Segoe_UI] text-lg text-[#b71a57]'
                )}
              >
                <div className="flex items-center gap-2">
                  <span>{['🌻', '🌈', '☮️', '✌️', '💕', '🌸'][Math.floor(Math.random() * 6)]}</span>
                  <span className="font-bold">{name}</span>
                </div>

                <p className="text-sm text-left">{message}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
