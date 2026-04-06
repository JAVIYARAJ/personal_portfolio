import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import {
  Download,
  ArrowDown,
  Terminal,
  Cpu,
  Layers,
  Globe,
  Database,
  Smartphone,
  Zap,
  ShieldCheck,
  Activity,
  CircuitBoard
} from 'lucide-react'

import FadeIn from './fade-in'
import TextReveal from './text-reveal'
import Magnetic from './magnetic'



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

const exhibits = {
  flutter: {
    id: 'flutter',
    title: 'Flutter Core',
    icon: (
      <svg width="80" height="80" viewBox="0 0 38 44" fill="none" className="drop-shadow-[0_0_15px_rgba(68,217,232,0.2)]">
        <path d="M37.0631 20.0376H23.7056L12.0195 31.7265L18.6969 38.4038L37.0631 20.0376Z" fill="#54C5F8" />
        <path d="M8.68014 28.3864L2 21.7063L23.7063 0H37.0638L8.68014 28.3864Z" fill="#54C5F8" />
        <path d="M18.6975 38.4039L23.7062 43.4126H37.0637L25.3749 31.7266L18.6975 38.4039Z" fill="#01579B" />
        <path d="M18.6966 25.0456L12.019 31.7231L18.6966 38.4007L25.3741 31.7231L18.6966 25.0456Z" fill="#29B6F6" />
      </svg>
    ),
    color: '#54C5F8',
    satellites: [
      { label: 'Dart Engine', icon: <Terminal size={18} />, color: '#027DFD', pos: 'top-[40%] right-[-15px]' },
      { label: 'Platform Bridge', icon: <Smartphone size={18} />, color: '#A855F7', pos: 'top-[60%] left-[-15px]' }
    ],
    orbits: [
      { icon: <Zap size={16} />, label: '60 FPS', pos: 'top-6 left-6', color: '#FCD34D' },
      { icon: <Layers size={16} />, label: 'Multi-OS', pos: 'top-6 right-6', color: '#027DFD' },
      { icon: <Activity size={16} />, label: 'Responsive', pos: 'bottom-6 left-6', color: '#10B981' },
      { icon: <ShieldCheck size={16} />, label: 'Native', pos: 'bottom-6 right-6', color: '#44D9E8' }
    ]
  },
  database: {
    id: 'database',
    title: 'Data Engine',
    icon: <Database size={60} className="text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]" />,
    color: '#F97316',
    satellites: [
      { label: 'Supabase', icon: <Zap size={18} />, color: '#3ECF8E', pos: 'top-[40%] right-[-15px]' },
      { label: 'Postgres', icon: <Database size={18} />, color: '#336791', pos: 'top-[60%] left-[-15px]' }
    ],
    orbits: [
      { icon: <ShieldCheck size={16} />, label: 'RLS Auth', pos: 'top-6 left-6', color: '#027DFD' },
      { icon: <Globe size={16} />, label: 'Edge FN', pos: 'top-6 right-6', color: '#10B981' },
      { icon: <Activity size={16} />, label: 'Realtime', pos: 'bottom-6 left-6', color: '#FCD34D' },
      { icon: <Database size={16} />, label: 'Schemas', pos: 'bottom-6 right-6', color: '#A855F7' }
    ]
  },
  ai: {
    id: 'ai',
    title: 'AI Intelligence',
    icon: <Cpu size={60} className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]" />,
    color: '#A855F7',
    satellites: [
      { label: 'Claude 3.5', icon: <Terminal size={18} />, color: '#D97706', pos: 'top-[40%] right-[-15px]' },
      { label: 'Prompt Engine', icon: <Globe size={18} />, color: '#4285F4', pos: 'top-[60%] left-[-15px]' }
    ],
    orbits: [
      { icon: <Terminal size={16} />, label: 'Context', pos: 'top-6 left-6', color: '#F97316' },
      { icon: <Cpu size={16} />, label: 'Inference', pos: 'top-6 right-6', color: '#027DFD' },
      { icon: <Zap size={16} />, label: 'Agents', pos: 'bottom-6 left-6', color: '#FCD34D' },
      { icon: <ShieldCheck size={16} />, label: 'Stability', pos: 'bottom-6 right-6', color: '#10B981' }
    ]
  },
  design: {
    id: 'design',
    title: 'Structural Arch',
    icon: <Layers size={60} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(68,217,232,0.3)]" />,
    color: '#44D9E8',
    satellites: [
      { label: 'Clean Arch', icon: <Layers size={18} />, color: '#027DFD', pos: 'top-[40%] right-[-15px]' },
      { label: 'SOLID Dev', icon: <Terminal size={18} />, color: '#F97316', pos: 'top-[60%] left-[-15px]' }
    ],
    orbits: [
      { icon: <Zap size={16} />, label: 'Modular', pos: 'top-6 left-6', color: '#FCD34D' },
      { icon: <Smartphone size={16} />, label: 'Decoupled', pos: 'top-6 right-6', color: '#A855F7' },
      { icon: <Activity size={16} />, label: 'High Scale', pos: 'bottom-6 left-6', color: '#10B981' },
      { icon: <Database size={16} />, label: 'DI / IoC', pos: 'bottom-6 right-6', color: '#027DFD' }
    ]
  },
  tools: {
    id: 'tools',
    title: 'DevOps & Tooling',
    icon: <Zap size={60} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(252,211,77,0.3)]" />,
    color: '#FCD34D',
    satellites: [
      { label: 'Shorebird OTA', icon: <Zap size={18} />, color: '#F97316', pos: 'top-[40%] right-[-15px]' },
      { label: 'Codemagic', icon: <Smartphone size={18} />, color: '#027DFD', pos: 'top-[60%] left-[-15px]' }
    ],
    orbits: [
      { icon: <Terminal size={16} />, label: 'CI/CD', pos: 'top-6 left-6', color: '#10B981' },
      { icon: <Globe size={16} />, label: 'OTA Fix', pos: 'top-6 right-6', color: '#A855F7' },
      { icon: <Cpu size={16} />, label: 'Automate', pos: 'bottom-6 left-6', color: '#FCD34D' },
      { icon: <ShieldCheck size={16} />, label: 'Test Suite', pos: 'bottom-6 right-6', color: '#027DFD' }
    ]
  }
}

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [splashProgress, setSplashProgress] = useState(0)
  const [currentSystemMessage, setCurrentSystemMessage] = useState(systemMessages[0])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeExhibit, setActiveExhibit] = useState('flutter')

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    const x = (clientX / innerWidth - 0.5) * 40
    const y = (clientY / innerHeight - 0.5) * 40
    setMousePosition({ x, y })
  }

  // Advanced splash screen animation
  useEffect(() => {
    let progress = 0
    let messageIndex = 0

    const interval = setInterval(() => {
      progress += Math.random() * 8
      if (progress > 100) progress = 100

      setSplashProgress(progress)

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

  // Auto-switch tech exhibits
  useEffect(() => {
    if (showSplash) return

    const keys = Object.keys(exhibits)
    const timer = setTimeout(() => {
      const currentIndex = keys.indexOf(activeExhibit)
      const nextIndex = (currentIndex + 1) % keys.length
      setActiveExhibit(keys[nextIndex])
    }, 8000) // Rotate every 8 seconds

    return () => clearTimeout(timer)
  }, [activeExhibit, showSplash, exhibits])

  const scrollToSection = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const currentExhibit = exhibits[activeExhibit as keyof typeof exhibits]

  if (showSplash) {
    return (
      <section className="fixed inset-0 flex items-center justify-center bg-background z-50 overflow-hidden">
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
    <section
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center pt-24 pb-12 sm:pt-32 px-6 relative overflow-hidden bg-[#0A0A0F]"
    >

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[150px] animate-floatingSoft" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-[150px] animate-floatingSoft" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#44D9E8 1px, transparent 1px), linear-gradient(90deg, #44D9E8 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">

          <div className="space-y-4">
            <div className="flex items-center gap-4 py-4 justify-center md:justify-start">
              <TextReveal
                text="JAVIYA RAJ."
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase italic"
              />



            </div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 text-lg md:text-2xl text-muted-foreground font-medium pt-4 md:pt-8 justify-center lg:justify-start"
            >

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent-cyan/10 text-accent-cyan">
                  <Terminal size={18} />
                </div>
                <span className="whitespace-nowrap opacity-60">I'M A</span>
              </div>
              <div className="flex items-center min-h-[40px]">
                <span className="text-white px-3 py-1 rounded-md bg-white/5 border-l-2 border-accent-cyan font-bold whitespace-nowrap animate-pulse transition-all min-h-[40px] flex items-center text-center sm:text-left text-lg sm:text-xl md:text-2xl">
                  {displayedText || '\u00A0'}
                </span>



              </div>
            </motion.div>
          </div>

          <FadeIn direction="up" delay={0.2} blur scale={0.98}>
            <p className="text-base md:text-xl text-muted max-w-lg leading-relaxed font-light text-center md:text-left">
              Developing high-performance, scalable mobile applications using Flutter and Dart, leveraging Clean Architecture to ensure maintainability and efficiency since 2021.
            </p>
          </FadeIn>


          <div className="flex flex-col sm:flex-row gap-5 pt-8 justify-center lg:justify-start">

            <Magnetic>
              <button
                onClick={scrollToSection}
                className="px-10 py-5 rounded-2xl bg-accent-blue hover:bg-accent-blue/80 text-white font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(2,125,253,0.3)] shadow-accent-blue/20 flex items-center justify-center gap-3 group glint-effect"
              >
                <span>Explore My Work</span>
                <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 rounded-2xl border border-glass-border bg-white/5 hover:bg-white/10 text-foreground font-bold transition-all hover:scale-[1.02] active:scale-95 backdrop-blur-sm flex items-center justify-center gap-3 glint-effect"
              >
                <Download size={20} className="text-accent-cyan" />
                <span>Resume.pdf</span>
              </a>
            </Magnetic>
          </div>

        </div>

        {/* Visual Content (Right Side): Sophisticated Minimalist Exhibit */}
        <div className="hidden lg:flex items-center justify-center relative">
          <motion.div
            animate={{
              rotateX: mousePosition.y * -0.2,
              rotateY: mousePosition.x * 0.2,
              transition: { duration: 0.1 }
            }}
            className="relative w-[400px] h-[400px]"
            style={{ perspective: '1000px' }}
          >
            {/* Soft Ambient Glow Overlay */}
            <div className="absolute inset-0 bg-accent-blue/5 rounded-full blur-[100px] animate-pulse" />

            {/* THE MASTER EXHIBIT CARD */}
            <div className="relative w-full h-full p-1 rounded-[3.5rem] bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 backdrop-blur-3xl shadow-[0_40px_80px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center overflow-hidden group">
              {/* Subtle Background Globe Component */}
              <div className="absolute inset-0 opacity-[0.02] scale-125 animate-orbitSlow pointer-events-none">
                <Globe size={350} strokeWidth={1} className="text-white" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExhibit}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotateY: 20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative w-full h-full flex flex-col items-center justify-center"
                >
                  {/* CENTRAL CORE */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 flex flex-col items-center gap-6"
                  >
                    <div className="relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-[0_15px_40px_rgba(2,125,253,0.15)] group-hover:bg-white/10 transition-all duration-700">
                      {currentExhibit.icon}
                      <div className="absolute inset-0 rounded-[2.5rem] border border-white/20 animate-pulse" />
                    </div>
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-black text-white tracking-[0.2em] uppercase">{currentExhibit.title}</h3>
                      <div className="h-0.5 w-10 mt-1.5" style={{ backgroundColor: currentExhibit.color }} />
                    </div>
                  </motion.div>

                  {/* DYNAMIC ECOSYSTEM ORBIT */}
                  <div className="absolute inset-0 pointer-events-none z-30">
                    {currentExhibit.orbits.map((item, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0.4, 0.8, 0.4]
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          delay: i * 1.5,
                          ease: 'easeInOut'
                        }}
                        className={`absolute ${item.pos} p-4 rounded-3xl bg-[#0A0A0F]/90 border border-white/20 backdrop-blur-3xl flex flex-col items-center gap-2 group/orbit transition-all duration-500 hover:scale-105 z-40`}
                      >
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/10" style={{ color: item.color, boxShadow: `0 0 15px ${item.color}20` }}>
                          {item.icon}
                        </div>
                        <span className="text-[6px] font-black tracking-[0.2em] text-white/40 uppercase group-hover/orbit:text-white transition-colors">
                          {item.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* LATERAL SATELLITES */}
                  <div className="absolute inset-0 pointer-events-none z-20">
                    {currentExhibit.satellites.map((sat, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          x: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
                          y: i % 2 === 0 ? [0, -5, 0] : [0, 5, 0]
                        }}
                        transition={{ duration: 8 + i, repeat: Infinity, ease: 'easeInOut' }}
                        className={`absolute ${sat.pos} p-4 rounded-[2rem] bg-[#0D0D15] border border-white/10 backdrop-blur-3xl shadow-2xl flex flex-col items-center gap-3 group/sat`}
                      >
                        <div className="p-2 rounded-xl bg-white/5 group-hover/sat:bg-white/10 transition-colors" style={{ color: sat.color }}>
                          {sat.icon}
                        </div>
                        <span className="text-[6px] font-black text-white/20 tracking-widest uppercase group-hover/sat:text-white/60 transition-colors">{sat.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* EXTERNAL MICRO-INDICATORS (Tabs) */}
            <div className="absolute top-1/2 -right-16 -translate-y-1/2 flex flex-col gap-6 z-50">
              {[
                { id: 'flutter', icon: <Smartphone size={20} />, label: 'Flutter' },
                { id: 'database', icon: <Database size={20} />, label: 'Data' },
                { id: 'ai', icon: <Cpu size={20} />, label: 'AI' },
                { id: 'design', icon: <ShieldCheck size={20} />, label: 'Arch' },
                { id: 'tools', icon: <Zap size={20} />, label: 'Tools' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveExhibit(tab.id)}
                  className={`group relative flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300 ${activeExhibit === tab.id
                    ? 'bg-accent-cyan/10 border-accent-cyan shadow-[0_0_20px_rgba(68,217,232,0.3)] text-accent-cyan'
                    : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                  {tab.icon}
                  <span className="absolute right-full mr-4 px-2 py-1 rounded bg-[#0A0A0F] border border-white/10 text-[8px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
