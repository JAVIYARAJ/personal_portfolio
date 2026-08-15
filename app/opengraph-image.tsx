import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Javiya Raj — Senior Mobile Developer (Android & Flutter)'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const stack = ['Native Android', 'Kotlin', 'Jetpack Compose', 'Flutter', 'Dart', 'Clean Architecture']
const stats = [
  { value: '15+', label: 'Apps' },
  { value: '4+', label: 'Years' },
  { value: '99.9%', label: 'Crash-Free' },
]

export default async function Image() {
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYh3Afv8Bvr0E.woff2'
  ).then((res) => (res.ok ? res.arrayBuffer() : null)).catch(() => null)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#08090c',
          padding: '56px 64px',
          fontFamily: fontData ? 'Playfair Display' : 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* aurora blobs */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -100,
            width: 460,
            height: 460,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,92,255,0.40) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -140,
            right: 200,
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.28) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* left column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            paddingRight: 48,
            justifyContent: 'space-between',
          }}
        >
          {/* top */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: 'linear-gradient(100deg, #7c5cff, #22d3ee)',
                  display: 'flex',
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontFamily: 'Georgia, serif',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#8b8f9a',
                }}
              >
                Senior Mobile Developer
              </span>
            </div>

            {/* name — gradient */}
            <div
              style={{
                fontSize: 88,
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(100deg, #b9a6ff 0%, #7fe3f2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                marginBottom: 28,
                display: 'flex',
              }}
            >
              JAVIYA RAJ.
            </div>

            {/* tagline */}
            <div
              style={{
                fontSize: 22,
                lineHeight: 1.55,
                color: '#c3c6cf',
                fontFamily: 'Georgia, serif',
                maxWidth: 480,
                display: 'flex',
              }}
            >
              Architecting Native Android & Cross-Platform mobile apps with Clean Architecture since 2021.
            </div>
          </div>

          {/* bottom: stats row */}
          <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(255,255,255,0.045)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 20,
                  padding: '14px 22px',
                  minWidth: 110,
                }}
              >
                <span style={{ fontSize: 28, fontWeight: 700, color: '#e7e9ee', lineHeight: 1 }}>
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: 'Georgia, serif',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#8b8f9a',
                    marginTop: 6,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* url */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 24,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontFamily: 'Georgia, serif',
                color: '#6b6f7a',
                letterSpacing: '0.06em',
              }}
            >
              javiyaraj.dev
            </span>
          </div>
        </div>

        {/* right column — accent gradient card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 310,
            background: 'linear-gradient(155deg, #7c5cff 0%, #5b6bff 45%, #22d3ee 130%)',
            borderRadius: 32,
            padding: '36px 32px',
            boxShadow: '0 32px 80px rgba(124,92,255,0.35)',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* highlight glow */}
          <div
            style={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.30) 0%, transparent 70%)',
              display: 'flex',
            }}
          />

          {/* available badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 100,
              padding: '8px 16px',
              alignSelf: 'flex-start',
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#ffffff',
                display: 'flex',
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontFamily: 'Georgia, serif',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              Freelance Open
            </span>
          </div>

          {/* stack label */}
          <div
            style={{
              fontSize: 11,
              fontFamily: 'Georgia, serif',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              marginTop: 32,
              display: 'flex',
            }}
          >
            Current Stack
          </div>

          {/* stack pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginTop: 14,
              flex: 1,
            }}
          >
            {stack.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: 13,
                  fontFamily: 'Georgia, serif',
                  background: 'rgba(255,255,255,0.16)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 100,
                  padding: '6px 14px',
                  color: '#ffffff',
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* bottom: github */}
          <div
            style={{
              fontSize: 13,
              fontFamily: 'Georgia, serif',
              color: 'rgba(255,255,255,0.7)',
              marginTop: 28,
              letterSpacing: '0.04em',
              display: 'flex',
            }}
          >
            github.com/JAVIYARAJ
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Playfair Display', data: fontData, style: 'normal', weight: 700 }]
        : [],
    }
  )
}
