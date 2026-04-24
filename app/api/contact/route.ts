import { NextResponse } from 'next/server'

const NOTION_API = 'https://api.notion.com/v1/pages'
const NOTION_VERSION = '2022-06-28'

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
  const token = process.env.NOTION_TOKEN
  const databaseId = process.env.NOTION_CONTACT_DATABASE_ID

  if (!token || !databaseId) {
    return NextResponse.json(
      { error: 'Contact form is not configured.' },
      { status: 500 }
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
      { status: 400 }
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

  const referer = request.headers.get('referer') ?? 'unknown'

  const notionRes = await fetch(NOTION_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email },
        Message: { rich_text: [{ text: { content: message } }] },
        Status: { select: { name: 'New' } },
        Source: { rich_text: [{ text: { content: referer } }] },
      },
    }),
  })

  if (!notionRes.ok) {
    const detail = await notionRes.text()
    console.error('Notion API error:', notionRes.status, detail)
    return NextResponse.json(
      { error: 'Failed to save submission.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
