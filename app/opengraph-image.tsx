import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Javiya Raj — Flutter Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const stack = ['Flutter', 'Dart', 'Clean Architecture', 'Supabase', 'BLoC', 'Kotlin']
const stats = [
  { value: '15+', label: 'Apps' },
  { value: '3+', label: 'Years' },
  { value: '99.9%', label: 'Crash-Free' },
]

export default async function Image() {
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYh3Afv8Bvr0E.woff2'
  ).then((res) => res.arrayBuffer()).catch(() => null)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #f6f1e8 0%, #f1e6d6 55%, #ede0cc 100%)',
          padding: '56px 64px',
          fontFamily: fontData ? 'Playfair Display' : 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* subtle radial blobs */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(199,107,79,0.18) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            right: 320,
            width: 340,
            height: 340,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(109,130,98,0.15) 0%, transparent 70%)',
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
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#c76b4f',
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
                  color: '#6d6b63',
                }}
              >
                Senior Flutter Developer
              </span>
            </div>

            {/* name */}
            <div
              style={{
                fontSize: 88,
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: '#1b1e18',
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
                color: '#4a4a42',
                fontFamily: 'Georgia, serif',
                maxWidth: 480,
                display: 'flex',
              }}
            >
              Building high-performance cross-platform apps with Clean Architecture since 2021.
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
                  background: 'rgba(255,250,242,0.85)',
                  border: '1px solid rgba(27,30,24,0.12)',
                  borderRadius: 20,
                  padding: '14px 22px',
                  minWidth: 110,
                }}
              >
                <span style={{ fontSize: 28, fontWeight: 700, color: '#1b1e18', lineHeight: 1 }}>
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: 'Georgia, serif',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#6d6b63',
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
                color: '#9e9e90',
                letterSpacing: '0.06em',
              }}
            >
              javiyaraj.dev
            </span>
          </div>
        </div>

        {/* right column — dark card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 310,
            background: '#1b1e18',
            borderRadius: 32,
            padding: '36px 32px',
            boxShadow: '0 32px 80px rgba(27,30,24,0.22)',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* accent glow */}
          <div
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(199,107,79,0.35) 0%, transparent 70%)',
              display: 'flex',
            }}
          />

          {/* available badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(199,107,79,0.18)',
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
                background: '#c76b4f',
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
                color: '#c76b4f',
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
              color: 'rgba(246,241,232,0.45)',
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
                  background: 'rgba(246,241,232,0.1)',
                  border: '1px solid rgba(246,241,232,0.12)',
                  borderRadius: 100,
                  padding: '6px 14px',
                  color: 'rgba(246,241,232,0.82)',
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
              color: 'rgba(246,241,232,0.4)',
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
