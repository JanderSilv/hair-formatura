import { ENV } from '@/config'
import nodemailer from 'nodemailer'

const ADMIN_EMAIL = ENV.ADMIN_EMAIL

if (!ADMIN_EMAIL) console.warn('ADMIN_EMAIL is not set. New submission emails will not be sent.')

export async function sendNewSubmissionEmail(payload: {
  name: string
  message: string
  email?: string | null
}) {
  if (!ADMIN_EMAIL) return

  const transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,
    secure: ENV.SMTP_PORT === 465,
    auth: { user: ENV.SMTP_USER, pass: ENV.SMTP_PASS },
  })

  const html = `
    <h1>Nova solicitação de livro de ouro</h1>
    <p><strong>Nome:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email ?? '(não fornecido)'}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${payload.message.replace(/\n/g, '<br>')}</p>
    <p><a href="https://hair-formatura.vercel.app/admin">Ir para o painel de administração</a></p>
  `

  await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: ENV.SMTP_USER,
        to: ADMIN_EMAIL,
        subject: `Novo pedido no livro de ouro de ${payload.name}`,
        html,
      },
      (err, info) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve(info)
        }
      }
    )
  })
}
