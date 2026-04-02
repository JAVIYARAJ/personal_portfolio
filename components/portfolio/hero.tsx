import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import { Download, ArrowDown, Terminal, Cpu, Layers, Globe } from 'lucide-react'

const titles = [
  'Senior Flutter Developer',
  'Software Architect',
  'Cross-Platform Expert',
  'Clean Architecture Specialist',
]

const systemMessages = [
  'Initializing kernel...',
  'Loading visual engine...',
  'Synchronizing database...',
  'Compiling assets...',
  'Establishing secure connection...',
  'Ready to explore.',
]

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [splashProgress, setSplashProgress] = useState(0)
  const [currentSystemMessage, setCurrentSystemMessage] = useState(systemMessages[0])

  const nameLetters = "JAVIYA RAJ".split("")

  // Advanced splash screen animation
  useEffect(() => {
    let progress = 0
    let messageIndex = 0
    
    const interval = setInterval(() => {
      progress += Math.random() * 8
      if (progress > 100) progress = 100
      
      setSplashProgress(progress)
      
      // Rotate through system messages
      const mIdx = Math.floor((progress / 100) * (systemMessages.length - 1))
      if (mIdx !== messageIndex) {
        messageIndex = mIdx
        setCurrentSystemMessage(systemMessages[messageIndex])
      }
      
      if (progress === 100) {
        clearInterval(interval)
        setTimeout(() => setShowSplash(false), 800)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [])

  // Typewriter effect
  useEffect(() => {
    if (showSplash) return

    const currentTitle = titles[titleIndex]
    const speed = isDeleting ? 30 : 80

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentTitle.length) {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setTitleIndex((prev) => (prev + 1) % titles.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, titleIndex, showSplash])

  const scrollToSection = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (showSplash) {
    return (
      <section className="fixed inset-0 flex items-center justify-center bg-background z-50 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[#0A0A0F]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[100px] animate-floatingSoft" />
        </div>

        <div className="relative text-center w-full max-w-md px-6">
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl border-2 border-accent-cyan/30 flex items-center justify-center animate-orbitSlow">
                <Cpu size={40} className="text-accent-cyan" />
              </div>
              <div className="absolute inset-0 rounded-2xl border-2 border-accent-blue/40 animate-orbitMedium" style={{ animationDirection: 'reverse' }} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-accent-cyan/70 uppercase tracking-widest mb-2">
              <span>System Boot</span>
              <span>{Math.round(splashProgress)}%</span>
            </div>
            
            <div className="h-1.5 w-full bg-accent-blue/10 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple transition-all duration-300 ease-out shadow-[0_0_15px_rgba(68,217,232,0.8)]"
                style={{ width: `${splashProgress}%` }}
              />
            </div>

            <div className="flex items-center gap-3 justify-center text-muted text-sm font-mono mt-4">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
              <p>{currentSystemMessage}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden bg-[#0A0A0F]">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[150px] animate-floatingSoft" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-[150px] animate-floatingSoft" style={{ animationDelay: '2s' }} />
        
        {/* Grid System */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(#44D9E8 1px, transparent 1px),
            linear-gradient(90deg, #44D9E8 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="text-left space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="flex items-center gap-4 py-4"
            >
              <h1 className="text-4xl md:text-6xl tracking-tight text-white flex items-baseline gap-x-3">
                <span className="font-black uppercase tracking-tighter">JAVIYA</span>
                <span className="font-light text-accent-cyan italic">RAJ.</span>
                <span className="h-2 w-2 rounded-full bg-accent-blue animate-pulse ml-2" />
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex items-center gap-4 text-xl md:text-2xl text-muted-foreground font-medium pt-8"
            >
              <div className="p-2 rounded-lg bg-accent-cyan/10 text-accent-cyan hidden sm:block">
                <Terminal size={20} />
              </div>
              <div className="flex flex-wrap items-center min-h-[60px] md:min-h-0">
                <span className="whitespace-nowrap opacity-60">I'M A</span>
                <span className="text-white ml-3 px-3 py-1 rounded-md bg-white/5 border-l-2 border-accent-cyan font-bold whitespace-nowrap animate-pulse transition-all">
                  {displayedText}
                </span>
              </div>
            </motion.div>
          </div>

          <p className="text-lg md:text-xl text-muted max-w-lg leading-relaxed font-light">
            Building scalable cross-platform mobile applications using Dart and Flutter. 
            Skilled in Clean Architecture and performance optimization since 2021.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <button
              onClick={scrollToSection}
              className="px-10 py-5 rounded-2xl bg-accent-blue hover:bg-accent-blue/80 text-white font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(2,125,253,0.3)] shadow-accent-blue/20 flex items-center justify-center gap-3 group"
            >
              <span>Explore My Work</span>
              <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </button>
            <a
              href="#"
              className="px-10 py-5 rounded-2xl border border-glass-border bg-white/5 hover:bg-white/10 text-foreground font-bold transition-all hover:scale-[1.02] active:scale-95 backdrop-blur-sm flex items-center justify-center gap-3"
            >
              <Download size={20} className="text-accent-cyan" />
              <span>Resume.pdf</span>
            </a>
          </div>

          <div className="flex items-center gap-10 pt-10 border-t border-glass-border">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-accent-cyan">15+</span>
              <span className="text-xs text-muted uppercase tracking-widest">Prod Apps</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-accent-cyan">3+Y</span>
              <span className="text-xs text-muted uppercase tracking-widest">Experience</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-accent-cyan">95%</span>
              <span className="text-xs text-muted uppercase tracking-widest">Success Rate</span>
            </div>
          </div>
        </div>

        {/* Visual Content (Right Side) */}
        <div className="hidden md:block relative animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="relative w-full aspect-square flex items-center justify-center">
            {/* Morphing Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-cyan/10 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-floatingSoft blur-2xl" />
            
            {/* Main Interactive Element */}
            <div className="relative w-4/5 h-4/5 p-1 rounded-3xl bg-gradient-to-br from-accent-blue/30 via-accent-cyan/30 to-accent-purple/30 backdrop-blur-md shadow-2xl">
              <div className="w-full h-full rounded-[20px] bg-[#0A0A0F] overflow-hidden border border-white/10 flex flex-col items-center justify-center gap-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-accent-cyan/50 animate-pulse flex items-center justify-center">
                    <Globe size={64} className="text-accent-cyan" />
                  </div>
                </div>
                
                <div className="space-y-4 w-full px-12">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-accent-blue" />
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-accent-cyan" />
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-accent-purple" />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  {/* Flutter Box - Multi-Tone */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group/icon transition-all duration-300 hover:bg-white/10 shadow-2xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M14.31 2.35L2.31 14.34L7.44 19.48L21.39 5.54L14.31 2.35Z" fill="#44D9E8"/>
                      <path d="M14.19 12.32L7.03 19.48L12.15 24L21.39 14.85L14.19 12.32Z" fill="#027DFD"/>
                    </svg>
                  </div>
                  {/* Kotlin Box - Signature Colors */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group/icon transition-all duration-300 hover:bg-white/10 shadow-2xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M1.3 24l11.3-11.5L24 24z" fill="#027DFD"/>
                      <path d="M0 0h12L0 12.5z" fill="#7C3AED"/>
                      <path d="M13.4 0L0 14v10l12-12L24 0z" fill="#F97316"/>
                    </svg>
                  </div>
                  {/* Dart Box - Deep Blue */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group/icon transition-all duration-300 hover:bg-white/10 shadow-2xl">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 0L1.5 5.25v13.5L12 24l10.5-5.25v-13.5L12 0zm0 18L4.5 14.25v-4.5L12 13.5l7.5-3.75v4.5L12 18z" fill="#027DFD"/>
                      <path d="M12 13.5l7.5-3.75L12 6L4.5 9.75L12 13.5z" fill="#44D9E8"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Floaties */}
            <div className="absolute top-0 right-0 p-6 rounded-2xl bg-[#111118]/80 border border-accent-cyan/30 backdrop-blur-xl animate-floatingSoft" style={{ animationDelay: '1s' }}>
              <Layers size={32} className="text-accent-cyan" />
            </div>
            <div className="absolute bottom-10 left-[-20px] p-6 rounded-2xl bg-[#111118]/80 border border-accent-blue/30 backdrop-blur-xl animate-floatingSoft" style={{ animationDelay: '2s' }}>
              <Terminal size={32} className="text-accent-blue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
