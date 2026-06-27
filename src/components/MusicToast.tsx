import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAudio } from '../audio/AudioProvider'
import { useI18n } from '../i18n'

const TOAST_DURATION_MS = 2300

function MusicIcon({ muted, playing }: { muted: boolean; playing: boolean }) {
  if (muted || !playing) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    )
  }

  return (
    <div className="flex items-end gap-0.5 h-4">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-0.5 bg-pink-neon rounded-full animate-pulse"
          style={{ height: `${8 + i * 4}px`, animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}

export function MusicToast() {
  const {
    trackTitle,
    musicPlaying,
    musicMuted,
    musicVolume,
    introComplete,
    toggleMusic,
    setMusicVolume,
    playClick,
  } = useAudio()
  const { t } = useI18n()

  const [phase, setPhase] = useState<'toast' | 'icon' | 'panel'>('toast')

  useEffect(() => {
    if (!introComplete) {
      setPhase('toast')
      return
    }

    setPhase('toast')
    const timer = setTimeout(() => setPhase('icon'), TOAST_DURATION_MS)
    return () => clearTimeout(timer)
  }, [introComplete])

  if (!introComplete) return null

  const displayVolume = musicMuted ? 0 : musicVolume

  const handleIconClick = () => {
    playClick()
    setPhase((prev) => (prev === 'panel' ? 'icon' : 'panel'))
  }

  const handleMuteClick = () => {
    playClick()
    toggleMusic()
  }

  return (
    <div className="fixed bottom-6 left-6 z-[9000]">
      <AnimatePresence mode="wait">
        {phase === 'toast' && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 16, x: -12 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-[min(100vw-3rem,280px)]"
          >
            <div className="liquid-glass rounded-2xl px-4 py-3 neon-glow-pink">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full liquid-glass-strong flex items-center justify-center text-pink-neon shrink-0 neon-border">
                  <MusicIcon muted={musicMuted} playing={musicPlaying} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">
                    {t.musicNowPlaying}
                  </p>
                  <p className="text-xs font-bold text-text-main truncate">{trackTitle}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'icon' && (
          <motion.button
            key="icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={handleIconClick}
            aria-label={t.musicVolume}
            className="w-11 h-11 rounded-full liquid-glass-strong flex items-center justify-center text-pink-neon hover:scale-105 transition-transform neon-border music-icon-pulse"
          >
            <MusicIcon muted={musicMuted} playing={musicPlaying} />
          </motion.button>
        )}

        {phase === 'panel' && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-[min(100vw-3rem,280px)]"
          >
            <div className="liquid-glass rounded-2xl px-4 py-3 neon-glow-pink">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleMuteClick}
                  className="w-9 h-9 rounded-full liquid-glass-strong flex items-center justify-center text-pink-neon hover:scale-105 transition-transform shrink-0 neon-border"
                  aria-label={musicMuted ? t.musicUnmute : t.musicMute}
                >
                  <MusicIcon muted={musicMuted} playing={musicPlaying} />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">
                    {t.musicNowPlaying}
                  </p>
                  <p className="text-xs font-bold text-text-main truncate">{trackTitle}</p>
                </div>
                <button
                  onClick={handleIconClick}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-pink-neon transition-colors shrink-0"
                  aria-label={t.navClose}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="shrink-0 text-text-muted">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                </svg>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(displayVolume * 100)}
                  onChange={(e) => setMusicVolume(Number(e.target.value) / 100)}
                  aria-label={t.musicVolume}
                  className="music-volume-slider flex-1"
                  style={{
                    background: `linear-gradient(to right, var(--color-pink-neon) ${displayVolume * 100}%, rgba(255,255,255,0.1) ${displayVolume * 100}%)`,
                  }}
                />
                <span className="text-[9px] font-mono text-text-muted w-7 text-right tabular-nums">
                  {Math.round(displayVolume * 100)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
