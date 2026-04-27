import { Resend } from 'resend'
import { NextResponse } from 'next/server'

type ContactPayload = {
  name?: unknown
  email?: unknown
  message?: unknown
  website?: unknown
}

const MAX_NAME = 120
const MAX_EMAIL = 254
const MAX_MESSAGE = 4000

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Contact form is not configured.' },
      { status: 500 },
    )
  }

  let body: ContactPayload
  try {
    body = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 },
    )
  }

  if (
    name.length > MAX_NAME ||
    email.length > MAX_EMAIL ||
    message.length > MAX_MESSAGE
  ) {
    return NextResponse.json({ error: 'Input too long.' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
  }

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: 'javiyaraj4@gmail.com',
    replyTo: email,
    subject: `New message from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <h2 style="margin-bottom:4px">New contact form submission</h2>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0"/>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:6px">${message}</p>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { error: 'Failed to send message.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
