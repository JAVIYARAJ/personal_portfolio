'use client'

interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-card z-40">
      <div
        className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan transition-all duration-300"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 20px rgba(68, 217, 232, 0.5)',
        }}
      />
    </div>
  )
}
