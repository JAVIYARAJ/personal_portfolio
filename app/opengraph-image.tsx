import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { siteHost } from '@/lib/site'

export const alt = 'Javiya Raj — I build mobile apps and web platforms (Flutter, Native Android, React & Next.js)'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const stats = [
  { value: '4+', label: 'Years' },
  { value: '15+', label: 'Apps shipped' },
  { value: '10K+', label: 'Active users' },
]

// Home-screen tiles: real icons where we have a PNG, tinted letter tiles otherwise.
const tiles: { icon?: string; letter?: string; bg: string }[] = [
  { icon: 'projects/dyshez/icon.png', bg: '#ffffff' },
  { icon: 'projects/split-ease/icon.png', bg: '#ffffff' },
  { icon: 'projects/pocket-score/icon.png', bg: '#ffffff' },
  { icon: 'projects/krushna-forge/icon.png', bg: '#ffffff' },
  { letter: 'G', bg: '#8b6d5c' },
  { letter: 'S', bg: '#ff6a00' },
  { letter: 'F', bg: '#02569B' },
  { letter: 'O', bg: '#5b7fa6' },
]

const gradientText = {
  backgroundImage: 'linear-gradient(135deg, #2f5bff 0%, #6a4bff 100%)',
  backgroundClip: 'text',
  color: 'transparent',
} as const

// Some icon files are JPEGs with a .png name, so detect the real type from the bytes.
async function toDataUri(publicPath: string) {
  const data = await readFile(join(process.cwd(), 'public', publicPath))
  const mime = data[0] === 0xff && data[1] === 0xd8 ? 'image/jpeg' : 'image/png'
  return `data:${mime};base64,${data.toString('base64')}`
}

const loadFont = (weight: 400 | 700) => readFile(join(process.cwd(), 'assets/fonts', `Inter-${weight}.ttf`))

export default async function Image() {
  const [icons, regular, bold] = await Promise.all([
    Promise.all(tiles.map((t) => (t.icon ? toDataUri(t.icon) : Promise.resolve(null)))),
    loadFont(400),
    loadFont(700),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#f5f5f2',
          padding: '0 72px',
          color: '#101114',
          fontFamily: 'Inter',
        }}
      >
        {/* Left: copy */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 640 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              gap: 10,
              background: '#ffffff',
              border: '1px solid #e2e2dc',
              borderRadius: 999,
              padding: '8px 18px',
              fontSize: 20,
            }}
          >
            <div style={{ display: 'flex', width: 10, height: 10, borderRadius: 999, background: '#16a34a' }} />
            Available for freelance
          </div>

          <div style={{ display: 'flex', marginTop: 34, fontSize: 30, color: '#5c616b' }}>Hi, I&apos;m Raj</div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 8,
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
            }}
          >
            <div style={{ display: 'flex' }}>
              I build&nbsp;<span style={gradientText}>mobile apps</span>
            </div>
            <div style={{ display: 'flex' }}>
              and&nbsp;<span style={gradientText}>web platforms</span>
              <span style={{ marginLeft: -2 }}>.</span>
            </div>
          </div>

          <div style={{ display: 'flex', marginTop: 22, fontSize: 24, color: '#5c616b' }}>
            Flutter · Native Android · React & Next.js
          </div>

          <div style={{ display: 'flex', gap: 14, marginTop: 34 }}>
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#ffffff',
                  border: '1px solid #e2e2dc',
                  borderRadius: 20,
                  padding: '14px 24px',
                }}
              >
                <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
                <div style={{ display: 'flex', marginTop: 6, fontSize: 17, color: '#5c616b' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', marginTop: 30, fontSize: 20, color: '#2f5bff', fontWeight: 700 }}>
            {siteHost}
          </div>
        </div>

        {/* Right: phone home screen */}
        <div
          style={{
            display: 'flex',
            width: 300,
            height: 560,
            borderRadius: 52,
            background: '#101114',
            padding: 12,
            boxShadow: '0 40px 80px -30px rgba(16,17,20,0.55)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              borderRadius: 42,
              padding: '16px 20px',
              backgroundImage: 'linear-gradient(160deg, #7aa2ff 0%, #4b5dff 45%, #b78bff 75%, #ffb38a 100%)',
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 15, fontWeight: 700 }}>
              <span>9:41</span>
              <div style={{ display: 'flex', width: 84, height: 24, borderRadius: 999, background: '#000000' }} />
              <span style={{ opacity: 0 }}>9:41</span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 20,
                borderRadius: 22,
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.22)',
              }}
            >
              <div style={{ display: 'flex', fontSize: 17, fontWeight: 700 }}>Raj Javiya</div>
              <div style={{ display: 'flex', fontSize: 13, opacity: 0.9 }}>Mobile & web developer</div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 22 }}>
              {tiles.map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: t.bg,
                    overflow: 'hidden',
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  {icons[i] ? <img src={icons[i]!} width={50} height={50} alt="" /> : t.letter}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: bold, weight: 700, style: 'normal' },
      ],
    }
  )
}
