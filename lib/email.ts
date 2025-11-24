import type { OrderRecord } from '@/lib/orders'

type Transporter = any

async function getTransporter(): Promise<Transporter | null> {
  try {
    // Avoid hard dependency if nodemailer is not installed
    const nodemailer = await import('nodemailer')
    const host = process.env.SMTP_HOST
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    if (!host || !user || !pass) return null
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })
  } catch {
    return null
  }
}

function fromAddress(): string {
  return process.env.MAIL_FROM || 'no-reply@importpro.fr'
}

export async function sendOrderConfirmation(order: OrderRecord): Promise<void> {
  if (!order.email) return
  const transporter = await getTransporter()
  if (!transporter) return
  const subject = `Confirmation de commande #${order.id}`
  const text = `Bonjour,\n\nNous confirmons la réception de votre commande #${order.id}.\n\nStatut: ${order.status}\nMontant: ${order.total.toFixed(2)}€\nSuivi: ${order.trackingNumber || ''}\n\nMerci pour votre confiance.`
  const html = `
    <p>Bonjour,</p>
    <p>Nous confirmons la réception de votre commande <strong>#${order.id}</strong>.</p>
    <ul>
      <li><strong>Statut:</strong> ${order.status}</li>
      <li><strong>Montant:</strong> ${order.total.toFixed(2)}€</li>
      <li><strong>Suivi:</strong> ${order.trackingNumber || ''}</li>
    </ul>
    <p>Merci pour votre confiance.</p>
  `
  await transporter.sendMail({ from: fromAddress(), to: order.email, subject, text, html })
}

export async function sendOrderStatusUpdate(order: OrderRecord): Promise<void> {
  if (!order.email) return
  const transporter = await getTransporter()
  if (!transporter) return
  const subject = `Mise à jour de votre commande #${order.id}: ${order.status}`
  const text = `Bonjour,\n\nLe statut de votre commande #${order.id} est désormais: ${order.status}.\nNuméro de suivi: ${order.trackingNumber || ''}`
  const html = `
    <p>Bonjour,</p>
    <p>Le statut de votre commande <strong>#${order.id}</strong> est désormais: <strong>${order.status}</strong>.</p>
    <p><strong>Numéro de suivi:</strong> ${order.trackingNumber || ''}</p>
  `
  await transporter.sendMail({ from: fromAddress(), to: order.email, subject, text, html })
}


